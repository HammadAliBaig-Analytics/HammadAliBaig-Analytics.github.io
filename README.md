# Hammad Ali Baig — Portfolio Website

A static, dark-themed portfolio site showcasing 6 BI dashboards (Power BI + Tableau).

## Files
- `index.html` — the page
- `style.css` — all styling (dark theme, tokens at top of file)
- `script.js` — small script for the Sales/HR screenshot galleries
- `assets/img/` — your Sales & HR dashboard screenshots

## How to put this on GitHub Pages

1. Go to your GitHub account and create a **new repository**.
   - Name it exactly `HammadAliBaig-Analytics.github.io` if you want it at the root URL `https://HammadAliBaig-Analytics.github.io`
   - Or name it anything else (e.g. `portfolio`) if you're fine with the URL being `https://HammadAliBaig-Analytics.github.io/portfolio`

2. Upload all the files in this folder (`index.html`, `style.css`, `script.js`, and the `assets` folder) to the root of that repository.
   - Easiest way: on the repo page, click **Add file → Upload files**, drag everything in, and commit.

3. Go to the repo's **Settings → Pages**.
   - Under "Build and deployment", set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` (or `master`) and folder to `/ (root)`.
   - Click **Save**.

4. Wait 1–2 minutes, refresh the Pages settings tab, and your live URL will appear at the top. That's your site.

## Things you can still customize
- Swap the placeholder Financial/Marketing/Churn Tableau embeds for screenshots too, if you'd rather not rely on live embeds (just follow the same gallery pattern used for Sales/HR).
- Update the hero headline/tagline in `index.html` if you want different wording.
- Once you finish learning Python, change its skill tag in `index.html` from `learning` to a normal skill pill.
