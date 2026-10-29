# Law Firm Website

A fast, static, mobile-friendly website for an Indian law practice. No build step, no dependencies: plain HTML, CSS and JavaScript, ready for GitHub Pages.

## Structure

```
index.html        All page content (edit text here)
css/style.css     Colours, fonts, layout (colours are variables at the top)
js/main.js        Menu, disclaimer popup, contact form
assets/           Favicon (add logo and photos here)
.nojekyll         Tells GitHub Pages to serve files as-is
```

## 1. Fill in the client's details

Search `index.html` for square brackets `[ ... ]` and replace each one:

- `[Firm Name]`, `[Advocate Name]`, `[Associate Name]`
- Address, phone (`tel:` link), email (`mailto:` link), office hours
- Stats (years, matters, courts) – or delete the `about-card` block if not wanted
- Social links (`href="#"`) – remove any that are not used
- Practice area cards and FAQ answers – adjust to the client's real practice
- Team bios; to use a photo, replace the initials with `<img src="assets/name.jpg" alt="Adv. Name">` inside `<div class="avatar">`

Change the brand colours in `css/style.css` under `:root` (`--navy`, `--gold`).

## 2. Make the contact form work

GitHub Pages cannot run server code, so the form uses [Formspree](https://formspree.io) (free tier available):

1. Create a Formspree account and a new form using the client's email.
2. Copy the form ID (the part after `/f/`).
3. In `index.html`, replace `YOUR_FORM_ID` in the form `action`.

Alternatives: Web3Forms or Getform work the same way.

## 3. Publish on GitHub Pages

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**

The site will be live at `https://<user>.github.io/<repo>/` within a few minutes.

## 4. Connect the custom domain

1. In **Settings → Pages → Custom domain**, enter the domain (for example `www.clientfirm.in`) and save. GitHub creates a `CNAME` file in the repo; pull it, or add a file named `CNAME` containing only the domain.
2. At the domain registrar's DNS panel add:

   | Type  | Host | Value |
   |-------|------|-------|
   | CNAME | www  | `<user>.github.io` |
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |

   (Check GitHub's current IPs in their docs: "Managing a custom domain for your GitHub Pages site".)
3. Wait for DNS to propagate (minutes to 24 hours), then tick **Enforce HTTPS** in Pages settings.

## Notes for an Indian law practice

- The Bar Council of India rules restrict advertising and solicitation by advocates. The site includes a disclaimer popup and footer text for this. Have the client (or their Bar Council guidance) confirm the wording and that the content complies before going live.
- Avoid client testimonials, case-win claims and fee promises.
- Fonts (Libre Caslon and Public Sans) load from Google Fonts. For stricter privacy, download them and host them in `assets/fonts/`.
- The first visit shows a Bar Council notice; the hero animation (rosette and seal) plays after the visitor clicks "I Agree".
- Photos: put images in `assets/` and add `<img src="assets/name.jpg" alt="...">` inside the `.arch` block of that person.
- Animations switch off automatically for visitors who set "reduce motion" on their device.
