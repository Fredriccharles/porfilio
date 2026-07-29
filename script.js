(() => {
  'use strict';

  // Only now that this file has actually loaded and run do we opt
  // .reveal elements into the hidden -> animate-in behavior. If this
  // file 404s or fails to load, .reveal content stays visible by
  // default (see style.css), so the page is never blank.
  document.documentElement.classList.add('js');

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'fredcaj-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(stored || (prefersLight ? 'light' : 'dark'));

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }
  function openNav() {
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }
  navToggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth >= 860) closeNav(); });

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById('typed-role');
  const phrases = [
    'Front-End Developer',
    'Creative problem solver',
    'Resourceful by habit',
    'Front-End Developer'
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (typedEl) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typedEl.textContent = phrases[0];
    } else {
      typeLoop();
    }
  }

  /* ---------- Skills grid (rendered from data) ---------- */
  const skills = [
    { name: 'HTML', icon: '◆' }, { name: 'CSS', icon: '◆' },
    { name: 'JavaScript', icon: '◆' }, { name: 'React', icon: '◆' },
    { name: 'Git', icon: '◆' }, { name: 'Responsive Design', icon: '◆' },
    { name: 'APIs', icon: '◆' }, { name: 'Supabase', icon: '◆' }
  ];
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(s =>
      `<li class="skill-chip"><span class="skill-icon" aria-hidden="true">${s.icon}</span>${s.name}</li>`
    ).join('');
  }

  /* ---------- Project filtering ---------- */
  const filterBar = document.getElementById('filter-bar');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.hidden = !show;
    });
  });

  /* ---------- Scroll-triggered reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Sticky header shadow + scroll progress ---------- */
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollUI() {
    header.style.boxShadow = window.scrollY > 8 ? '0 6px 18px -10px rgba(0,0,0,0.4)' : 'none';
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  /* ---------- Hero window pointer tilt ---------- */
  const heroVisual = document.querySelector('.hero-visual');
  const heroWindow = heroVisual ? heroVisual.querySelector('.window-frame') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroVisual && heroWindow && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroWindow.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-2px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroWindow.style.transform = 'rotateY(0) rotateX(0)';
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your name (2+ characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    message: (v) => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  function validateField(field) {
    const row = field.closest('.form-row');
    const errorEl = row.querySelector('.field-error');
    const message = validators[field.name](field.value);
    errorEl.textContent = message;
    row.classList.toggle('has-error', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  ['name', 'email', 'message'].forEach(name => {
    const field = form.elements[name];
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-row').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'message'].map(n => form.elements[n]);
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      statusEl.textContent = 'Please fix the highlighted fields and try again.';
      statusEl.classList.add('is-error');
      fields.find(f => f.closest('.form-row').classList.contains('has-error'))?.focus();
      return;
    }

    statusEl.classList.remove('is-error');
    statusEl.textContent = 'Thanks! Your message has been noted — Fred will reply soon.';
    form.reset();
  });

/* ---------- GitHub Repositories ---------- */

const repoList = document.getElementById("repo-list");
const GITHUB_USER = "Fredriccharles";

async function loadRepositories() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=4`
        );

        if (!response.ok) {
            throw new Error("GitHub request failed");
        }

        const repos = await response.json();

        if (repos.length === 0) {
            repoList.innerHTML =
                '<li class="repo-empty">No public repositories found.</li>';
            return;
        }

        repoList.innerHTML = repos
            .map(
                (repo) => `
                <li class="repo-card">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        <h4>${repo.name}</h4>
                    </a>

                    <p>${repo.description || "No description provided."}</p>

                    <div class="repo-meta">
                        <span>💻 ${repo.language || "Unknown"}</span>
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </li>
            `
            )
            .join("");
    } catch (error) {
        console.error(error);
        repoList.innerHTML =
            '<li class="repo-empty">Unable to load repositories.</li>';
    }
}

loadRepositories();


  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
