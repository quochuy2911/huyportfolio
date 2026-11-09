import { portfolio, projects, skills, timeline } from './content.mjs';

const icon = (path, className = '') => `<svg class="`+className+`" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="`+path+`"/></svg>`;
const arrow = icon('M4 12h15m-6-6 6 6-6 6', 'arrow');
const external = icon('M7 17 17 7M7 7h10v10', 'arrow');
const down = icon('M12 4v15m-6-6 6 6 6-6', 'arrow');

export const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export const projectPath = ({ slug }) => `projects/${slug}/`;
const mediaPath = (prefix, name) => `${prefix}assets/media/${name}`;
const media = (prefix, [name, alt, width, height], { eager = false, className = '' } = {}) => `<img src="${mediaPath(prefix, name)}" alt="${escape(alt)}" width="${width}" height="${height}" class="${className}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const paragraph = (text) => `<p>${escape(text)}</p>`;
const tags = (items) => `<ul class="tags" aria-label="Tools and methods">${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;

function nav(prefix, home) {
  const root = home ? '' : prefix;
  return `<header class="site-header"><div class="shell masthead">
    <a class="identity" href="${home ? '#' : prefix}" aria-label="Ngo Quoc Huy, home">
      <img src="${mediaPath(prefix, 'favicon.svg')}" width="34" height="34" alt="">
      <span>Quoc Huy<span class="identity-note"> / Portfolio</span></span>
    </a>
    <nav aria-label="Main navigation">
      <a href="${root}#work">Work</a><a href="${root}#about">About</a><a href="${root}#contact">Contact</a>
    </nav>
  </div></header>`;
}

function socials() {
  return Object.entries(portfolio.links).map(([label, url]) => `<a href="${escape(url)}">${escape(label)} ${external}</a>`).join('');
}

function footer() {
  return `<footer class="site-footer" id="contact"><div class="shell footer-inner">
    <div><p class="eyebrow"><span class="accent">04 /</span> CONTACT</p>
    <h2>Say hello.</h2><p>Find me on GitHub or LinkedIn.</p></div>
    <div class="socials">${socials()}</div>
  </div><div class="shell footer-base"><span>Ngo Quoc Huy</span><span>${escape(portfolio.location)}</span><a href="#top">Back to top ↑</a></div></footer>`;
}

function analytics(prefix) {
  return `<script defer src="${prefix}assets/analytics.js" data-measurement-id="${portfolio.analytics}"></script>`;
}

export function page({ title, description, path, prefix, main, home = false, image = 'social-card.jpg' }) {
  const canonical = new URL(path, portfolio.url).href;
  const imageUrl = new URL(`assets/media/${image}`, portfolio.url).href;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}">
  <meta name="theme-color" content="#f7f4ec">
  <title>${escape(title)}</title>
  <link rel="canonical" href="${escape(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${escape(canonical)}">
  <meta property="og:image" content="${escape(imageUrl)}">
  <meta property="og:image:alt" content="Ngo Quoc Huy’s engineering portfolio with a four-point bending schematic">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${mediaPath(prefix, 'favicon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/site.css">
  ${analytics(prefix)}
</head>
<body id="top">
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav(prefix, home)}
  <main id="main" tabindex="-1">${main}</main>
  ${footer()}
</body>
</html>
`;
}

function feature(project, index) {
  return `<article class="feature ${index === 0 ? 'feature-lead' : ''}">
    <div class="feature-image image-link">
      ${media('', project.image)}
    </div>
    <div class="feature-text">
      <p class="project-meta"><span class="accent">0${index + 1}</span> <span>${escape(project.category)}</span> <span class="meta-year">${escape(project.year)}</span></p>
      <h3><a href="${projectPath(project)}">${escape(project.title)}</a></h3>
      ${paragraph(project.summary)}
      ${tags(project.tools)}
      <span class="text-link" aria-hidden="true">Read project ${arrow}</span>
    </div>
  </article>`;
}

function archiveRow(project) {
  return `<li><a href="${projectPath(project)}" class="archive-row">
    ${media('', [project.image[0], '', ...project.image.slice(2)], { className: 'archive-image' })}
    <span class="archive-title">${escape(project.title)} <small>${escape(project.category)}</small></span>
    <span class="archive-year">${escape(project.year)}</span>${arrow}
  </a></li>`;
}

export function home() {
  return `<div class="shell">
    <section class="hero" aria-labelledby="intro-title">
      <div class="hero-copy">
        <p class="eyebrow hero-label"><span class="index-mark"></span> PERSONAL ENGINEERING PORTFOLIO</p>
        <h1 id="intro-title">Ngo Quoc Huy<span>.</span></h1>
        <p class="hero-role">Mechanical design &amp; experimental engineering</p>
        <p class="hero-description">I’m a mechanical designer in Vietnam. I build things, test them, and write software to make sense of what I measure.</p>
        <div class="hero-actions"><a class="button" href="#work">Explore my work ${down}</a><a class="text-link" href="#about">About me ${arrow}</a></div>
      </div>
      <figure class="hero-drawing">
        ${media('', ['beam-diagram.svg', 'Schematic of a simply supported beam with two downward loads and seven strain measurement stations', 560, 352], { eager: true })}
        <figcaption><span>FROM THE TEST BENCH</span><span>HCMC, VIETNAM</span></figcaption>
      </figure>
    </section>

    <section class="section" id="work" aria-labelledby="work-title">
      <div class="section-head"><div><p class="eyebrow"><span class="accent">01 /</span> PROJECTS</p><h2 id="work-title">Selected work</h2></div>
      <p>Projects across mechanical design, lab testing, and engineering software.</p></div>
      <div class="feature-grid">${projects.filter((project) => project.featured).map(feature).join('\n')}</div>
    </section>

    <section class="section archive" id="archive" aria-labelledby="archive-title">
      <div class="section-head"><div><p class="eyebrow"><span class="accent">02 /</span> EARLIER WORK</p><h2 id="archive-title">Build archive</h2></div>
      <p>Earlier builds from school and university, from pneumatics to electronics.</p></div>
      <ul class="archive-list">${projects.filter((project) => !project.featured).map(archiveRow).join('\n')}</ul>
    </section>

    <section class="section about" id="about" aria-labelledby="about-title">
      <div class="section-head"><div><p class="eyebrow"><span class="accent">03 /</span> BACKGROUND</p><h2 id="about-title">A bit about me</h2></div></div>
      <div class="about-grid">
        <figure class="portrait">${media('', ['portrait.webp', 'Ngo Quoc Huy', 492, 492])}<figcaption>Ngo Quoc Huy · Ho Chi Minh City</figcaption></figure>
        <div class="about-copy">
          <p>I started building engineering projects in high school. One of my first was a motorized telescope mount. I came back to that design in university with better tools and a clearer idea of what I wanted to improve.</p>
          <p>Today I’m a Mechanical Designer at Bosch Automotive R&amp;D Center Vietnam. I’m interested in how mechanical design, sensing, and computation can work together to make automotive and aerospace systems more reliable.</p>
        </div>
      </div>
      <div class="background-grid">
        <section class="background-column" id="experience" aria-labelledby="experience-title">
          <h3 id="experience-title">Experience &amp; education</h3>
          <ul class="timeline">${timeline.map(([date, title, organization, description]) => `<li><span class="timeline-date">${escape(date)}</span><div><h4>${escape(title)}</h4><p class="organization">${escape(organization)}</p>${paragraph(description)}</div></li>`).join('')}</ul>
        </section>
        <section class="background-column" aria-labelledby="skills-title">
          <h3 id="skills-title">Tools &amp; methods</h3>
          <dl class="skills">${skills.map(([label, description]) => `<div><dt>${escape(label)}</dt><dd>${escape(description)}</dd></div>`).join('')}</dl>
        </section>
      </div>
    </section>
  </div>`;
}

export function detail(project) {
  const prefix = '../../';
  return `<div class="shell detail">
    <header class="detail-head">
      <a class="back-link text-link" href="${prefix}#${project.featured ? 'work' : 'archive'}"><span aria-hidden="true">←</span> ${project.featured ? 'Selected work' : 'Build archive'}</a>
      <p class="eyebrow"><span class="accent">${escape(project.category)}</span> / ${escape(project.year)}</p>
      <h1>${escape(project.title)}</h1>
      <p class="detail-summary">${escape(project.summary)}</p>
      ${project.links ? `<div class="detail-links">${project.links.map(([label, url]) => `<a class="button" href="${escape(url)}">${escape(label)} ${external}</a>`).join('')}</div>` : ''}
    </header>
    <figure class="detail-cover ${project.image[0].endsWith('.svg') ? 'detail-cover-diagram' : ''}">
      ${media(prefix, project.image, { eager: true })}
      <figcaption>${escape(project.imageCaption)}</figcaption>
    </figure>
    ${project.facts ? `<dl class="project-facts">${project.facts.map(([value, label]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>` : ''}
    <div class="case-grid">
      <aside class="case-aside"><h2>My role</h2>${paragraph(project.role)}<h2>Tools &amp; methods</h2>${tags(project.tools)}</aside>
      <div class="case-copy">${project.sections.map(([title, copy]) => `<section><h2>${escape(title)}</h2>${paragraph(copy)}</section>`).join('')}</div>
    </div>
    ${project.gallery ? `<section class="gallery" aria-labelledby="gallery-title"><h2 id="gallery-title">From the build</h2><div class="gallery-grid">${project.gallery.map(([file, alt, caption, width, height]) => `<figure><a class="image-link" href="${mediaPath(prefix, file)}" aria-label="Open image: ${escape(caption)}">${media(prefix, [file, alt, width, height])}</a><figcaption>${escape(caption)}</figcaption></figure>`).join('')}</div></section>` : ''}
  </div>`;
}

export function redirect(destination) {
  const safe = escape(destination);
  const canonical = escape(new URL(destination, portfolio.url).href);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url=${safe}"><meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}"><title>Portfolio page moved</title></head>
<body><main><p>This page has moved. <a href="${safe}">Continue to the portfolio</a>.</p></main></body></html>
`;
}
