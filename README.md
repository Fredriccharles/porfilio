# Fredric Charles C Cajayon — Portfolio

A personal portfolio site for a front-end developer, built with plain HTML, CSS, and JavaScript — no frameworks, no build step. The design leans into a "developer terminal" theme: window-chrome cards, monospace accents, and git/CLI-flavored copy.

**Live sections:** Hero · About · Skills · Selected Work · Path (timeline) · Contact

## Features

- **Dark/light theme toggle** — persisted in `localStorage`, respects `prefers-color-scheme` on first visit
- **Responsive mobile nav** — hamburger menu that closes on link click or viewport resize
- **Typing effect** — animated role text in the hero, skipped for users with `prefers-reduced-motion`
- **Skills grid** — rendered dynamically from a JS data array
- **Project filtering** — tab-style filter bar (All / React / APIs / Supabase / Vanilla JS) that shows/hides project cards by tag
- **Scroll-triggered reveal animations** — via `IntersectionObserver`, with a no-JS/no-IO fallback so content is never hidden
- **Sticky header + scroll progress bar** — shadow and progress width update on scroll
- **Hero pointer tilt** — subtle 3D tilt on the hero window for fine-pointer, non-reduced-motion devices
- **Live GitHub repos** — fetches the 4 most recently updated repos from the GitHub API, with a graceful fallback message if the request fails
- **Accessible contact form** — client-side validation (name, email, message) with inline error messages, `aria-live` status updates, and focus management on failed submission
- **Progressive enhancement** — a `.js` class is only added to `<html>` once `script.js` successfully runs, so content marked `.reveal` stays visible by default if the script fails to load

## Tech Stack

- HTML5
- CSS3 (custom properties for theming, no preprocessor)
- Vanilla JavaScript (ES6+, IIFE, no dependencies)
- [GitHub REST API](https://docs.github.com/en/rest) for the repo feed
- Google Fonts: JetBrains Mono & Inter

## File Structure

```
.
├── index.html      # Page markup and content
├── style.css       # Theming, layout, and animations
└── script.js       # Theme toggle, nav, filtering, form validation, GitHub fetch
```

## Getting Started

No build tools or dependencies required.

1. Clone or download this repository
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience (some browsers restrict certain features over `file://`):

   ```bash
   # Python
   python3 -m http.server 8000

   # Node
   npx serve .
   ```

3. Visit `http://localhost:8000`

## Configuration

- **GitHub username** — update `GITHUB_USER` in `script.js` to change whose repos are pulled into the "Latest from GitHub" feed:

  ```js
  const GITHUB_USER = 'fredcaj';
  ```

- **Contact form** — currently client-side only (validates and shows a success message, no backend submission). Wire up `form.addEventListener('submit', ...)` in `script.js` to an email service (e.g. Formspree, EmailJS) or your own endpoint to make it functional.
- **Avatar image** — replace `IMG_4926.jpg` referenced in `index.html` with your own image, keeping the same filename or updating the `src` attribute.

## Accessibility Notes

- Skip-to-content link included
- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Form fields have associated labels, `aria-describedby` error text, and `role="alert"` on validation messages
- Theme and menu buttons expose `aria-pressed` / `aria-expanded` state
- Reduced-motion and pointer-type media queries respected for animations

## Known TODOs

A couple of dates in the timeline section are placeholders pending confirmation:

- Exact start year for the BSIT program (`index.html`, timeline section)
- Exact year for freelance refresh work (`index.html`, timeline section)

## License

No license specified. Add one (e.g. MIT) if you intend for others to reuse this code.
