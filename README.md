# QH's Making Space

Personal portfolio of Ngo Quoc Huy, hosted as a static website on GitHub Pages.

The portfolio uses a shared responsive theme with a separate Home page and
project archive. The original six project entries, full descriptions, photo
galleries, dates, and project page URLs are preserved. The introduction and
former About Me content are combined on Home, with refreshed work and education
copy prepared for review. See [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for sources
and details to confirm.

## Pages

- `index.html`: Home, introduction, background, skills, and contact links.
- `projects.html`: the existing six-project listing, moved without edits.
- `work_exp.html`: current role and earlier research/teaching experience.
- `education.html`: education, coursework, and school awards.
- `aboutme.html`: redirects old About Me links to `index.html#about`.
- The original six numbered project pages retain their URLs.

## Preview locally

No package installation or build is required. From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Design files

- `assets/css/portfolio.css`: colors, typography, responsive layout, and galleries.
- `assets/js/portfolio.js`: optional keyboard-accessible image viewer.
- The existing HTML files contain the original portfolio content directly.

Navigation and photographs remain available with JavaScript disabled. The
existing template source, styles, scripts, license, and credits are retained.

## Check content preservation

```sh
python3 scripts/check-content.py
node --check assets/js/portfolio.js
git diff --check
```

The check protects the project archive against the prior design snapshot at
`ddfe3f7afed9ba35351eaab6dd04d9c527eb49da`. It compares the listing markup,
project files outside shared navigation, and existing styles and JavaScript.
It also checks the Home/About redirect, consistent navigation, Analytics,
local resources and anchors. The original image and résumé files are compared
byte for byte against `main` at `6850983fe4b5f6276ad044b6c9fcef2645a98880`.

The linked résumé remains an earlier version and is labeled accordingly.
Updating that PDF is separate from the draft page copy.

## Publishing

GitHub Pages serves `main` from the repository root. Merging a reviewed design
change into `main` publishes it at
<https://quochuy2911.github.io/huyportfolio/>.
