# Commands for the docs. Needs pnpm and uv; `just` with no recipe lists them.

default:
    @just --list

# install the site's packages
install:
    pnpm install

# the site at http://localhost:4321/bedrock-docs/, reloading as you edit
dev:
    pnpm dev

# copy the files sources.yaml lists from other repositories
sources:
    uv run scripts/docs/sources.py

# turn the marimo notebooks into pages
pages:
    uv run scripts/docs/notebook_pages.py

# build the site and check every link
build:
    pnpm build

# Tailwind rule: utilities only, no invented class names, no arbitrary values
lint:
    pnpm lint
    pnpm stylelint

# what CI runs: copied files and generated pages are current, and the site builds
check: sources pages
    @git status --porcelain -- src/content/docs | (! grep .) || (echo "Out of date: commit what just sources and just pages changed." && exit 1)
    pnpm build
