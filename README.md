# cv.briankfung.com

A curriculum vitae with one source of truth. The CV content lives as typed data
in [`src/data/cv/`](src/data/cv/); everything else is generated from it:

- **[`public/pdf/brian-fung-cv.pdf`](public/pdf/brian-fung-cv.pdf)** — LaTeX-typeset
  CV, compiled with xelatex
- **[cv.briankfung.com](https://cv.briankfung.com)** — the same content as
  semantic, indexable HTML

Because both outputs read the same data through the same resolver, the PDF and
the website cannot drift apart.

The site is a Next.js app (React, TypeScript, Tailwind). The data is validated
with zod and the pipeline is tested with vitest. End to end:

```
src/data/cv/*.ts          typed CV content
  └─ zod schema + privacy lint     src/lib/cv/schema.ts, lint.ts
       └─ variant resolver         src/lib/cv/resolve.ts
            ├─ HTML                src/components/cv/
            └─ .tex                src/lib/latex/ → xelatex → public/pdf/
```

## Using this for your own CV

This repository doubles as a reference implementation: fork it, replace the
content, keep the machinery.

1. Replace the data in [`src/data/cv/`](src/data/cv/), starting with
   `profile.ts`.
2. Change `ALLOWED_EMAIL` in [`src/lib/cv/lint.ts`](src/lib/cv/lint.ts) to the
   one address you intend to publish. The privacy lint fails the build on any
   other email, so this is the first thing that breaks on a fresh fork.
3. Update `SITE_URL`, `PERSONAL_SITE`, the handle and ORCID, and
   `EXTRA_SAME_AS` (profiles to list in the structured data) in
   [`src/lib/seo/site.ts`](src/lib/seo/site.ts). If your personal site
   already publishes a schema.org Person, set `PERSON_ID` to its `@id` so
   search engines treat the CV and the site as one person, and optionally set
   `PERSON_DESCRIPTION` (a short one-liner) and `PERSON_DISAMBIGUATION`
   (to separate you from a namesake). The defaults keep the CV standalone.
4. Rename the PDF through the `filename` field in
   [`src/data/variants/master.ts`](src/data/variants/master.ts).
5. Swap out the Google Search Console verification — the token in
   [`src/app/layout.tsx`](src/app/layout.tsx) and the `public/google*.html`
   file belong to this site's domain. Use your own or delete both.
6. Run `pnpm validate`, then `pnpm build:pdf`.

## Editing the CV

1. Edit the relevant file in [`src/data/cv/`](src/data/cv/) — one file per
   section (`experience.ts`, `publications.ts`, and so on).
2. Run `pnpm build:pdf` to regenerate the `.tex` files and recompile the PDFs.
3. Commit the data change together with `latex/generated/` and `public/pdf/`.

### Optional sections

Some sections are optional: leave their data out and they disappear from every
variant. To use one, add a data file in [`src/data/cv/`](src/data/cv/), register
it in `src/data/cv/index.ts`, and list the section in your variant config.

| Section       | Data shape        | Renders as                                         |
| ------------- | ----------------- | -------------------------------------------------- |
| `memberships` | `MembershipEntry` | Organization, optional role, optional dates        |
| `media`       | `MediaEntry`      | Numbered citations of podcasts, press, guest posts |

Build artifacts are committed on purpose: the deployed site serves the PDF as a
static file, so the host never needs a TeX toolchain, and CI can check the
generated `.tex` for freshness. CI fails if `latex/generated/` is out of date,
so a data change that was never regenerated cannot merge unnoticed. The
compiled PDF itself is not diffed — xelatex output is not byte-reproducible —
so regenerate with `pnpm build:pdf` rather than `pnpm generate:tex` alone.

## Variants

A variant is a filter over the same data, declared in
[`src/data/variants/`](src/data/variants/):

| Variant  | Output              | Contents                       |
| -------- | ------------------- | ------------------------------ |
| `master` | `brian-fung-cv.pdf` | Full academic CV, all sections |

Only the `master` variant exists today, but the machinery is general: every
registered variant gets its own PDF, download link, and sitemap entry
automatically.

A variant config chooses which sections appear and in what order, which entries
to include (by id or by tag), how many entries and bullets to keep, and can
override the summary. Individual bullets can opt in or out of a variant with
`only` and `not`.

To add a variant, add its id to `VARIANT_IDS` in
[`src/lib/cv/types.ts`](src/lib/cv/types.ts), write a config beside the existing
ones, and register it in [`src/data/variants/index.ts`](src/data/variants/index.ts).

## Commands

Requires Node 24 and pnpm (the version is pinned in the `packageManager` field
of `package.json`). Run `pnpm install` first.

| Command             | Does                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| `pnpm dev`          | Run the site locally                                                       |
| `pnpm build`        | Validate the data, then build the site                                     |
| `pnpm build:pdf`    | Regenerate `.tex` and compile the PDF                                      |
| `pnpm generate:tex` | Regenerate `.tex` only                                                     |
| `pnpm validate`     | Schema, cross-entry, and privacy checks on the data                        |
| `pnpm test`         | Unit tests for the escaper, resolver, citations, privacy lint, and JSON-LD |
| `pnpm typecheck`    | `tsc --noEmit`                                                             |
| `pnpm lint`         | ESLint                                                                     |

## Building the PDFs locally

TeX is needed only to regenerate the PDFs; `pnpm dev` and `pnpm build` run
without it. On macOS, BasicTeX is enough once the four packages it omits are
installed:

```sh
brew install --cask basictex          # if TeX is not installed already
tlmgr init-usertree
tlmgr --usermode install enumitem titlesec lastpage needspace
```

The build invokes `/Library/TeX/texbin/xelatex` by absolute path (declared in
`scripts/paths.ts`), because GUI-launched shells often lack it on `PATH`. Set
`XELATEX_BIN` to override.

Without a local TeX at all, CI's `pdf` job compiles every generated `.tex` on
Linux with a full TeX Live ([xu-cheng/latex-action](https://github.com/xu-cheng/latex-action))
and uploads the results as a `cv-pdfs` artifact.

Each file in `latex/generated/` is self-contained — the preamble is inlined — so
any one of them can be handed to a collaborator or dropped into Overleaf and
compiled without the rest of this repository.

## Deployment

The site deploys to Vercel as a stock Next.js app: no environment variables,
no build settings beyond the defaults, and no TeX on the host, since the PDF
ships as a committed static asset. Any host that runs `pnpm build` works the
same way.

## Ordering

Sections that follow the reverse-chronological convention are sorted by the
resolver, not by hand, so the data files cannot drift out of order. Roles rank
by end date, so an ongoing position outranks a finished one that started later;
credentials rank by the date earned, since an expiry further out does not make
a certification newer. Ties keep data-file order, and a project component stays
directly beneath its parent. Skills are excluded and read in the order the file
lists them.

## Privacy

This repository is public. `pnpm validate` rejects data containing phone
numbers, street addresses, PO boxes, SSN-format identifiers, or any email other
than the published one (`ALLOWED_EMAIL` in
[`src/lib/cv/lint.ts`](src/lib/cv/lint.ts)). Adding contact details fails the
build rather than leaking them.

License and credential numbers are also kept out by convention: the issuing
state or body is enough for a reader to verify through a public lookup. Add them
to a credential's `items` if you want them published.

## Layout

```
src/app/             Next.js App Router: pages, sitemap, robots, OG image
src/data/cv/         CV content, one file per section
src/data/variants/   Which content each output includes
src/lib/cv/          Types, zod schema, privacy lint, variant resolver
src/lib/latex/       LaTeX escaping and rendering
src/lib/seo/         JSON-LD and site constants
src/components/cv/   Web rendering of the resolved CV
latex/preamble.tex   Document styling, inlined into every generated .tex
scripts/             validate, generate-tex, build-pdf
```

## License

The code is MIT-licensed — see [LICENSE](LICENSE). The CV content is not:
everything under `src/data/cv/`, the generated `.tex`, and the PDFs are my
personal record. Fork the machinery freely and replace the content with your
own.
