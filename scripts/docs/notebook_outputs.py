# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Save the outputs of one sources.yaml entry's static notebooks, for their pages.

    uv run scripts/docs/notebook_outputs.py worked-examples/soft-soil-egm --checkout PATH [NOTEBOOK ...]

A static notebook needs data or packages a reader lacks, so nothing runs on its page.
This runs each notebook once, where its data is, with every control at its default
value, and saves what each cell shows, so the page can show it under the cell's code.

PATH is a checkout of the entry's repository at the entry's `rev`, with the data the
notebooks read. For each notebook, the docs' own copy of it is put beside the original
there, and marimo Studio prepares a vanilla view of it with the Prepared (zero-python)
runtime. A cell whose output calls Python, such as an `mo.ui.table`, can't be prepared:
it is left out and listed under `dropped`.

Writes:

- public/notebook-outputs/_marimo-studio/: Studio's browser runtime, once, and one
  view per notebook. Not committed: these are large and change with every run.
- src/content/docs/<to>/notebook-outputs.json: per notebook its view, the run's
  revision, and the host of each cell with an output, by the SHA-256 of its code.
  Committed: `just pages` reads it to place each host under its cell.

Run `just pages` afterwards.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "src" / "content" / "docs"
OUTPUTS = ROOT / "public" / "notebook-outputs" / "_marimo-studio"
MANIFEST = "notebook-outputs.json"
MARIMO = "0.25.2"
STUDIO = [
    "uv", "run", "--isolated", "--no-project",
    "--with", "marimo-studio[deno]==0.4.1", "--with", f"marimo=={MARIMO}",
    "marimo-studio",
]
HOST = re.compile(r'<marimo-cell name="([^"]+)" data-marimo-studio-site="([^"]+)"')
REVISION = re.compile(r'"revision":"([0-9a-f]+)"')
UNPREPARED = re.compile(r"projection '([^']+)'")


def studio(*args: str | Path, cwd: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [*STUDIO, *map(str, args)],
        cwd=cwd,
        capture_output=True,
        encoding="utf-8",
        env={
            **os.environ,
            "PYTHONIOENCODING": "utf-8",
            # A warning prints the warning module's path on this machine, and a
            # reader can't act on it.
            "PYTHONWARNINGS": "ignore",
            # PROJ downloads the RDNAPTRANS grids instead of falling back to a
            # transformation that is off by about a metre.
            "PROJ_NETWORK": "ON",
        },
    )


def check_no_local_paths(view: Path) -> None:
    """Stop if a saved output shows a path on this machine, such as a traceback's."""
    home = str(Path.home())
    needles = {home, json.dumps(home)[1:-1], home.replace("\\", "/")}
    for file in view.rglob("*"):
        if file.is_file() and file.suffix in {".json", ".html", ""}:
            text = file.read_text(encoding="utf-8", errors="ignore")
            if any(needle in text for needle in needles):
                sys.exit(f"{file} shows a path under {home}; change the notebook so its output doesn't.")


def entry_for(to: str) -> dict:
    entries = yaml.safe_load((ROOT / "sources.yaml").read_text(encoding="utf-8")) or []
    entry = next((e for e in entries if e["to"].strip("/") == to.strip("/")), None)
    if entry is None or entry.get("mode") != "static":
        sys.exit(f"No static entry with `to: {to}` in sources.yaml.")
    return entry


def check_revision(checkout: Path, rev: str) -> None:
    def commit(ref: str) -> str:
        result = subprocess.run(
            ["git", "rev-parse", f"{ref}^{{commit}}"], cwd=checkout, capture_output=True, text=True
        )
        if result.returncode:
            sys.exit(f"{checkout} has no revision {ref}: fetch it first.")
        return result.stdout.strip()

    if commit("HEAD") != commit(rev):
        sys.exit(f"{checkout} is not at {rev}, the revision sources.yaml pins.")


def with_git_extras(script: str) -> str:
    """Write a git-sourced dependency with extras as a direct reference.

    Studio 0.4.1 applies `[tool.uv.sources]` to `"bimpolars"` but not to
    `"bimpolars[speckle]"`, which it then looks up on PyPI. Only the script
    header changes, so cell code hashes stay the same.
    """
    sources = dict(re.findall(r'^#\s*([\w.-]+)\s*=\s*\{\s*git\s*=\s*"([^"]+)"', script, re.MULTILINE))
    for name, url in sources.items():
        script = re.sub(
            rf'^(#\s*)"({re.escape(name)}\[[^\]]+\])"', rf'\1"\2 @ git+{url}"', script, flags=re.MULTILINE
        )
    return script


SCOPED = "/* Scoped to <marimo-cell> by scripts/docs/notebook_outputs.py */\n"
THEME_CLASS = re.compile(r"\.(?:dark|light)(?:-theme)?(?![\w\\-])")


def scope_to_outputs(assets: Path) -> None:
    """Keep Studio's styles inside the output hosts.

    Studio's CSS sets marimo's own palette on `:root`, on `:is(.marimo,:root) *`
    (every element of the page) and on `.dark` and `.light`, classes its runtime
    puts on `<body>`. Left alone, the docs' header and sidebar take marimo's grays.
    On a docs page the outputs are the `<marimo-cell>` hosts, so `:root` becomes
    `marimo-cell`, and a theme class matches any element but `<body>`, such as
    the theme wrapper inside a control's shadow root, or the hosts under `<body>`.
    """
    for stylesheet in assets.rglob("*.css"):
        text = stylesheet.read_text(encoding="utf-8")
        if text.startswith(SCOPED):
            continue
        text = text.replace(":root", "marimo-cell")
        text = THEME_CLASS.sub(lambda m: f":is({m[0]}:not(body),{m[0]} marimo-cell)", text)
        stylesheet.write_text(SCOPED + text, encoding="utf-8", newline="")


def drop_host(view_page: Path, name: str) -> None:
    text = view_page.read_text(encoding="utf-8")
    text = re.sub(rf'[ \t]*<marimo-cell name="{re.escape(name)}"></marimo-cell>\r?\n', "", text)
    view_page.write_text(text, encoding="utf-8")


def prepare(notebook: Path, folder: Path, view: str) -> dict:
    """Prepare one notebook's view; merge it into OUTPUTS; return its manifest entry."""
    work = folder / f"docs_outputs_{notebook.name}"
    studio_dir = folder / "studio" / work.stem
    if studio_dir.exists():
        sys.exit(f"{studio_dir} already exists; remove it first.")
    # The docs' own copy, so cell code hashes match the code on its page.
    work.write_text(with_git_extras(notebook.read_text(encoding="utf-8")), encoding="utf-8", newline="")
    try:
        inspected = studio("notebook", "inspect", "--target", work, "--json", cwd=folder)
        if inspected.returncode:
            sys.exit(inspected.stderr)
        cells = json.loads(inspected.stdout)["cells"]
        created = studio(
            "view", "create", view, "--target", work, "--starter", "marimo-studio/vanilla:default",
            cwd=folder,
        )
        if created.returncode:
            sys.exit(created.stderr or created.stdout)
        view_page = studio_dir / view / "index.html"
        dropped: list[str] = []
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / view
            while True:
                print(f"  preparing {notebook.name}" + (f" without {', '.join(dropped)}" if dropped else ""))
                exported = studio(
                    "view", "export", view, "--target", work, "--runtime", "zero-python",
                    "--output", out, "--force", "--prepare-timeout", "900",
                    cwd=folder,
                )
                if exported.returncode == 0:
                    break
                log = exported.stdout + exported.stderr
                unprepared = UNPREPARED.search(log)
                if not unprepared or unprepared.group(1) in dropped:
                    sys.exit(log)
                dropped.append(unprepared.group(1))
                drop_host(view_page, unprepared.group(1))
            check_no_local_paths(out / "_marimo-studio" / "views" / view)
            page = (out / "index.html").read_text(encoding="utf-8")
            sites = dict(HOST.findall(page))
            revision = REVISION.search(page).group(1)
            shutil.copytree(out / "_marimo-studio" / "assets", OUTPUTS / "assets", dirs_exist_ok=True)
            scope_to_outputs(OUTPUTS / "assets")
            shutil.rmtree(OUTPUTS / "views" / view, ignore_errors=True)
            shutil.copytree(out / "_marimo-studio" / "views" / view, OUTPUTS / "views" / view)
    finally:
        work.unlink(missing_ok=True)
        shutil.rmtree(studio_dir, ignore_errors=True)
        if (folder / "studio").is_dir() and not any((folder / "studio").iterdir()):
            (folder / "studio").rmdir()

    hosts = {}
    for cell in cells:
        name = cell["name"] or f"cell-{cell['index'] + 1}"
        if name in sites:
            hosts[cell["code_sha256"]] = {"name": name, "site": sites[name]}
    return {
        "view": view,
        "revision": revision,
        "marimo": MARIMO,
        "hosts": dict(sorted(hosts.items())),
        "dropped": sorted(dropped),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("to", help="the entry's `to` folder in sources.yaml")
    parser.add_argument("--checkout", type=Path, required=True, help="the repository at `rev`, with its data")
    parser.add_argument("notebook", nargs="*", help="only these notebooks of the entry (default: all)")
    args = parser.parse_args()

    entry = entry_for(args.to)
    checkout = args.checkout.resolve()
    check_revision(checkout, entry["rev"])
    folder = checkout / entry["from"].strip("/")
    target = DOCS / entry["to"]
    names = [next(iter(item.values())) if isinstance(item, dict) else item for item in entry["files"]]

    manifest_path = target / MANIFEST
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    for name in args.notebook or names:
        view = re.sub(r"[^a-z0-9]+", "-", f"{Path(entry['to']).name}-{Path(name).stem}".lower()).strip("-")
        manifest[name] = prepare(target / name, folder, view)
        print(f"{entry['to']}/{name}: {len(manifest[name]['hosts'])} outputs, dropped {manifest[name]['dropped']}")
        # After each notebook, so an interrupted run keeps the ones it finished.
        manifest_path.write_text(
            json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8", newline="\n"
        )


if __name__ == "__main__":
    main()
