# About This Project

This is a personal portfolio website for **Fredric Charles C Cajayon**, an aspiring front-end developer. It's built to double as both a showcase of his work and a demonstration of his front-end skills in itself — the site is the portfolio piece.

## What This Site Is

A single-page portfolio with six sections: Hero, About, Skills, Selected Work, Path (career/education timeline), and Contact. The visual theme is a "developer terminal" look — window-chrome cards styled like code editor tabs, monospace type, and copy written in git/CLI language (`$ whoami`, `git log --graph`, `git commit -m "ship it"`).

## What Was Used to Build It

| Layer | What's used | Why |
|---|---|---|
| Structure | HTML5 | Semantic markup, no templating engine |
| Styling | CSS3 (custom properties) | Theming (dark/light) and layout, no Sass/Tailwind |
| Behavior | Vanilla JavaScript (ES6+) | All interactivity, no frameworks or libraries |
| Fonts | Google Fonts — JetBrains Mono & Inter | Monospace for code-flavored UI, Inter for body text |
| Data | GitHub REST API | Pulls live repo data into the "Latest from GitHub" feed |

No build tools, no package manager, no frameworks (React is listed as a *skill*, not something the site itself is built with) — it's intentionally plain HTML/CSS/JS to keep the codebase easy to read and to prove the fundamentals are solid without leaning on tooling.

## How the Site Works (Feature by Feature)

- **Theme toggle** — switches dark/light mode, remembers your choice next visit, and defaults to your system preference the first time
- **Typing effect** — the role text under the name cycles through phrases automatically (skipped if you have reduced-motion turned on)
- **Skills grid** — the list of skills is stored as data in the JavaScript and rendered onto the page, rather than typed directly into the HTML
- **Project filters** — clicking a tab (React / APIs / Supabase / Vanilla JS) shows only the matching project cards
- **Scroll reveal** — sections fade/slide into view as you scroll down the page
- **Live GitHub feed** — fetches Fred's most recently updated repos directly from GitHub each time the page loads
- **Contact form** — checks that your name, email, and message are valid before showing a "sent" confirmation, with error messages if something's missing

## Where the Content Came From

- **About/Path sections** — written from Fred's own account of his education (BSIT, Our Lady of Fatima University) and hands-on projects, including a Supabase-backed widget dashboard and freelance client work
- **Skills list** — reflects tools and technologies he's used across those projects
- **Project cards** — summarize actual builds (a Supabase-powered dashboard, a layout/CSS pattern playground, among others)
- **GitHub feed** — not hand-written; it's pulled live from `github.com/fredcaj` so it always reflects his most recent activity

## A Note on How It Was Made

Parts of this site — particularly debugging tricky issues like API integration and Supabase's real-time sync — were worked through with the help of AI-assisted research, which is also mentioned directly in the site's own About section as part of how Fred works. The intent was to get to a working solution faster, then understand and test it well enough to actually own it, not to skip understanding the code.
