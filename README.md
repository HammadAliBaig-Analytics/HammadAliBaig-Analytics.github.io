# Hammad Ali Baig — Portfolio Website

A static, dark-themed portfolio site showcasing 6 BI dashboards (Power BI + Tableau), each written up as a short case study: the question, what the dashboard shows, and a recommendation. It also lists three certifications.

## Files
- `index.html` — the page
- `style.css` — all styling (dark theme, tokens at top of file)
- `script.js` — screenshot galleries, full-size image viewer, mobile menu, email-copy message, resume button
- `assets/img/` — dashboard screenshots
- `assets/certs/` — certificate PDFs linked from the Certifications section
- `assets/resume.pdf` — **you add this** (see below)

## Updating the live site

This package is a complete copy of the site, so it also works if you unzip it and open `index.html` on your computer.

1. Open your repo on GitHub and click **Add file → Upload files**.
2. Unzip the package, then drag in everything inside it (`index.html`, `style.css`, `script.js`, `README.md` and the `assets` folder). Existing files with the same name are replaced.
3. Commit to `main`, wait 1–2 minutes, then hard-refresh your site (Ctrl+Shift+R).

If an image is missing on the live site, check that the filenames in `assets/img` are lowercase and match the ones in this package. GitHub Pages treats `HR-03.png` and `hr-03.png` as different files.

## Add your resume (button appears automatically)

1. Export your resume as a PDF and name it exactly `resume.pdf`.
2. Upload it into the `assets` folder in your repo.
3. A "Download resume" button then shows in the hero and the contact section. Until the file exists, the buttons stay hidden, so nothing is ever broken. (Your browser console may show a harmless 404 for `resume.pdf` until you add it.)

## Add education

In `index.html`, find the comment block starting with `EDUCATION`. Fill in your details, delete the comment markers around the `<section id="education">` block, and add an "Education" link to the nav list. Recruiters look for this section.

## Email links

Every email link tries to open the visitor's email app, and also copies your address and shows a short confirmation. This covers people whose computers have no default email app.

## Certifications

The Certifications section lists HackerRank SQL (Intermediate), the Deloitte Data Analytics Job Simulation, and IBM Data Analysis and Insights. To add another, copy one `<li class="cert">` block in `index.html`. A few strong certificates beat many introductory ones.

## Editing a project

Each featured project uses the same pattern: a question, a "What it shows" list (`<ul class="findings">`), and a recommendation. Copy an existing `.project` block to add a new one. Keep findings tied to numbers you can point to on the dashboard, and be ready to explain how you calculated each one.

## Before you share the link
- Check every number in the project write-ups against your live dashboards. Some were read from screenshots.
- Confirm the datasets are public or sample data, since the page says so.
- Fix the dashboard issues in Power BI/Tableau (HR executive charts, marketing CTR %, sales "(Blank)" product, supply chain callout text), because interviewers may notice them.
- Add your resume and education.
- Put your SQL queries on GitHub and link them from the project cards.
