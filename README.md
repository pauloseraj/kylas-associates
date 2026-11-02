# Kylas Associates — Static Website

A responsive, multi-page static website for **Kylas Associates, Advocates & Legal Consultants**. It is built with plain HTML, CSS and JavaScript and can be hosted on GitHub Pages without a build step or framework.

## Project structure

```text
.
├── index.html
├── about.html
├── founder.html
├── team.html
├── practice-areas.html
├── courts-and-forums.html
├── locations.html
├── consultation.html
├── contact.html
├── privacy-policy.html
├── terms-of-use.html
├── 404.html
├── llms.txt
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css
    ├── js/site.js
    └── images/ (original SVG artwork and favicon)
```

## Preview locally

No dependencies are required. Open `index.html` in a browser, or run a small local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Commit and publish with GitHub Pages

1. Create a new GitHub repository (or use the repository already created for the client).
2. Extract the ZIP and copy the **contents** of this project into the repository root. Keep `index.html` at the repository root; do not put the website inside an extra nested folder.
3. Open PowerShell in the repository folder and run:

```powershell
$branch = git branch --show-current
git add .
git commit -m "Add Kylas Associates static website"
git push -u origin $branch
```

This uses the repository's current branch, whether it is named `main` or `master`.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select the same branch and `/ (root)`, then save.
6. GitHub will show the published URL in **Settings → Pages** after deployment completes.

The pages use relative links, so the site works both at a custom domain and under a GitHub project-repository path. A `.nojekyll` file is included to keep GitHub Pages deployment straightforward.

## Before publishing — client confirmation checklist

Some details in the supplied source document were marked as incomplete. Do not invent these. Confirm and update them before the site is treated as final:

- Founding year for Kylas Associates.
- Adv. Sreedevi Kylasanath: designation, enrolment year and practice areas.
- Adv. Kamalakshy Kylasanath: designation, qualifications, enrolment year and practice areas.
- Adv. Jaison Scaria: practice areas.
- Adv. Varghese Xavier: designation, qualifications, enrolment year and practice areas.
- Adv. Joselal George: designation, enrolment number and practice areas.
- Adv. Praveen S.: designation, qualifications, enrolment number and practice areas.
- Confirm all phone numbers, email addresses, office addresses, office hours and the exact wording of the disclaimer with the firm.
- Obtain approved, current professional photographs for the founder and team. The current team portrait blocks are neutral placeholders; they are not photographs and must be replaced with authorised headshots before launch.
- Confirm that the firm wishes to publish the listed profile, professional appointments and representative matter details.

## Important implementation notes

- **Disclaimer:** A first-visit overlay requires the visitor to click “I Agree” before continuing. Acceptance is stored in the visitor's browser using `localStorage`. Clearing browser storage will show it again. “Exit” navigates to a blank page.
- **Enquiry form:** GitHub Pages is static hosting and does not process or store form submissions. The form validates the fields and opens a pre-addressed email draft using the visitor's mail application. The visitor must review and send it. For a hosted form endpoint, connect a service such as Formspree or a server-side endpoint and update `assets/js/site.js` before launch.
- **Maps:** The location page uses Google Maps query embeds based on the addresses supplied by the client. Verify each pin and map embed before publication.
- **SEO:** Basic page titles, descriptions, heading structure, `LegalService` / `Person` JSON-LD, FAQ structured data, `robots.txt`, `sitemap.xml` and `llms.txt` are included. Structured data does not guarantee rankings or rich search results.
- **Canonical URL and sitemap:** `sitemap.xml` contains a clearly marked placeholder base URL. Replace `https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY/` with the final GitHub Pages or custom-domain URL. Update `robots.txt` with the same URL. Add canonical tags only after the final public URL is confirmed.
- **No invented testimonials, case outcomes, awards, ratings or success rates** are included.
- **Legal review:** The website copy and disclaimer are based on the client-provided draft. Have the firm review the final wording and the site's compliance with applicable professional-conduct rules before publishing. This project is a website implementation, not a legal compliance opinion.

## Design system

- Deep navy: `#10263f`
- Warm ivory: `#f7f4ed`
- Muted gold: `#b88d45`
- Headings: Georgia (system serif stack)
- Body: Arial (system sans-serif stack)

The site uses system font stacks and local SVG artwork. It does not require a font CDN, image CDN, framework or build process. Google Maps embeds are used on the office locations page.
