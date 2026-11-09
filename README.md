# QH's Making Space

Personal portfolio of Ngo Quoc Huy, hosted as a static website on GitHub Pages.

This presentation refresh starts from `main` at
`6850983fe4b5f6276ad044b6c9fcef2645a98880`. It preserves the original biography,
six projects, work history, education, skills, contact information, résumé,
photographs, page URLs, and Google Analytics configuration.

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

The content check compares the pages against the original `main` commit: text
within each page landmark, link destinations, photo order, Analytics, and the
original image and résumé files. It also checks local resources and anchors.
The homepage's Continue link now targets the content below the new masthead.
An existing project rendering is reused as a decorative homepage image.

The check intentionally uses a fixed source commit. If portfolio content is
updated in future, select an appropriate reference commit explicitly with
`python3 scripts/check-content.py <commit>`.

## Publishing

GitHub Pages serves `main` from the repository root. Merging a reviewed design
change into `main` publishes it at
<https://quochuy2911.github.io/huyportfolio/>.
