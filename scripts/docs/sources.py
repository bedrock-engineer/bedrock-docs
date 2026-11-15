# /// script
# requires-python = ">=3.12"
# dependencies = ["pyyaml"]
# ///
"""Copy the files sources.yaml lists from other repositories into the docs.

    uv run scripts/docs/sources.py

Each repository is fetched once per revision, shallow and sparse, into .cache/sources/.
A file is written only when its content changed, so a rerun touches nothing.
"""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "src" / "content" / "docs"
CACHE = ROOT / ".cache" / "sources"
FRONT_MATTER = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def git(*args: str, cwd: Path) -> None:
    subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, text=True)


def checkout(repo: str, rev: str, folder: str) -> Path:
    """A sparse checkout of `folder` from `repo` at `rev`, reused while it exists."""
    target = CACHE / repo.replace("/", "__") / rev / folder
    done = target.parent / f".{target.name}.done"
    if done.exists():
        return target
    work = CACHE / repo.replace("/", "__") / rev
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir(parents=True)
    git("init", "--quiet", cwd=work)
    # Check out the bytes as committed: a global core.autocrlf=true (Git for
    # Windows' default) would give CRLF files that differ from the copies CI makes.
    git("config", "core.autocrlf", "false", cwd=work)
    git("remote", "add", "origin", f"https://github.com/{repo}.git", cwd=work)
    git("sparse-checkout", "set", "--no-cone", f"/{folder}/", cwd=work)
    git("fetch", "--quiet", "--depth", "1", "--filter=blob:none", "origin", rev, cwd=work)
    git("checkout", "--quiet", "FETCH_HEAD", cwd=work)
    done.touch()
    return target


def with_edit_url(text: str, url: str) -> str:
    """Point a copied page's "Edit page" link at its upstream file."""
    line = f"editUrl: {url}"
    match = FRONT_MATTER.match(text)
    if not match:
        return f"---\n{line}\n---\n\n{text}"
    meta = re.sub(r"^editUrl:.*\n?", "", match.group(1) + "\n", flags=re.M)
    return f"---\n{meta}{line}\n---\n{text[match.end():]}"


RUNTIME_IMPORT = re.compile(r"^import MarimoRuntime from [^\n]*\n\n?(<MarimoRuntime\s*/>\n\n?)?", re.M)


def adapt_page(text: str, links: dict[str, str]) -> str:
    """Make a page copied from another site work here.

    - Root-relative links written for that site get this site's prefix (`links`).
    - The MarimoRuntime import goes: this site adds the runtime to every page with
      marimo cells (src/components/MarkdownContent.astro), and the import's relative
      path only resolved in the page's old location.
    """
    for old, new in links.items():
        text = text.replace(f"]({old}", f"]({new}").replace(f'href="{old}', f'href="{new}')
    return RUNTIME_IMPORT.sub("", text)


def write(path: Path, data: bytes) -> bool:
    if path.exists() and path.read_bytes() == data:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return True


def file_pairs(entry: dict, source: Path) -> list[tuple[str, str]]:
    """(upstream name, name here) for every file the entry copies."""
    if not entry.get("files"):
        return [(n, n) for n in sorted(p.relative_to(source).as_posix() for p in source.rglob("*") if p.is_file())]
    pairs = []
    for item in entry["files"]:
        pairs.extend(item.items() if isinstance(item, dict) else [(item, item)])
    return pairs


def copy_entry(entry: dict) -> None:
    repo, rev, folder = entry["repo"], str(entry["rev"]), entry["from"].strip("/")
    source = checkout(repo, rev, folder)
    target = DOCS / entry["to"]
    branch = entry.get("branch", "main")
    pairs = file_pairs(entry, source)
    for upstream, name in pairs:
        data = (source / upstream).read_bytes()
        if name.endswith((".md", ".mdx")):
            url = f"https://github.com/{repo}/edit/{branch}/{folder}/{upstream}"
            text = adapt_page(data.decode("utf-8"), entry.get("links") or {})
            data = with_edit_url(text, url).encode("utf-8")
        if write(target / name, data):
            print(f"{repo}@{rev[:12]} {folder}/{upstream} -> {entry['to']}/{name}")
    if entry.get("files"):
        return
    # A whole-folder source owns its folder, except the files it says to `keep`:
    # drop what upstream no longer has.
    names = {name for _, name in pairs} | set(entry.get("keep") or [])
    for stale in sorted(p for p in target.rglob("*") if p.is_file()):
        if stale.relative_to(target).as_posix() not in names:
            stale.unlink()
            print(f"removed {stale.relative_to(DOCS).as_posix()}")


def main() -> None:
    entries = yaml.safe_load((ROOT / "sources.yaml").read_text(encoding="utf-8")) or []
    for entry in entries:
        if entry.get("repo"):
            copy_entry(entry)


if __name__ == "__main__":
    sys.exit(main())
