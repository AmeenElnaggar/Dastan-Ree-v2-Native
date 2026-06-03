import { blogs } from "../../data/blogs.data.js";
import { renderBlogCard } from "../../shared/components/blog-card/BlogCard.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { getParam } from "../../utils/router.js";

const FALLBACK_READ_TIMES = [5, 4, 6, 3, 5, 4];

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const id = getParam("id");
  const blog = blogs.find((b) => String(b.id) === String(id)) || blogs[0];

  if (!blog) {
    document.querySelector(".bd-body").innerHTML =
      '<p class="bd-empty">Article not found.</p>';
    return;
  }

  renderHero(blog);
  renderExcerpt(blog);
  const headings = renderArticle(blog);
  renderTOC(headings);
  renderTags(blog);
  renderShareButtons(blog);
  renderAuthor(blog);
  renderRelated(blog);

  initReadingProgress();
  initTOCActiveTracking(headings);
  initNewsletter();
});

/* ── Hero ────────────────────────────────────────────────────────── */
function renderHero(blog) {
  document.title = `${blog.title} — Dastan Real Estate`;

  const bg = document.querySelector("#bd-hero-bg");
  if (bg && blog.image) bg.style.backgroundImage = `url('${blog.image}')`;

  document.querySelector("#bd-breadcrumb-current").textContent = blog.title;
  document.querySelector("#bd-category").textContent = blog.category || "";
  document.querySelector("#bd-title").textContent = blog.title;
  document.querySelector("#bd-date").textContent = blog.date;
  document.querySelector("#bd-read-time").textContent =
    `${getReadTime(blog)} min read`;

  const author = blog.author || {};
  const avatarEl = document.querySelector("#bd-author-avatar");
  if (author.avatar) {
    avatarEl.src = author.avatar;
    avatarEl.alt = author.name || "Author";
  } else {
    avatarEl.style.display = "none";
  }
  document.querySelector("#bd-author-name").textContent = author.name || "Dastan Editorial";
}

function getReadTime(blog) {
  if (typeof blog.readTime === "number") return blog.readTime;
  return FALLBACK_READ_TIMES[(blog.id - 1) % FALLBACK_READ_TIMES.length];
}

/* ── Excerpt ─────────────────────────────────────────────────────── */
function renderExcerpt(blog) {
  const el = document.querySelector("#bd-excerpt");
  const text = blog.excerpt || blog.description || "";
  if (!text) {
    el.hidden = true;
    return;
  }
  el.textContent = text;
}

/* ── Article body (returns the heading list for the TOC) ─────────── */
function renderArticle(blog) {
  const root = document.querySelector("#bd-article");
  const content = Array.isArray(blog.content) ? blog.content : [];

  if (!content.length) {
    root.innerHTML = `<p class="bd-article__paragraph">${blog.description || ""}</p>`;
    return [];
  }

  const headings = [];
  const parts = content.map((block, i) => {
    if (block.type === "heading") {
      const slug = slugify(block.text) + "-" + i;
      headings.push({ id: slug, text: block.text });
      return `<h2 class="bd-article__heading" id="${slug}">${escapeHtml(block.text)}</h2>`;
    }
    if (block.type === "quote") {
      return `<blockquote class="bd-article__quote">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.17 7.5C5.42 8.21 4 10.13 4 12.5V18h6v-7H6.5c0-1.66 1.34-3 3-3l-.33-.5h-2zm10 0c-1.75.71-3.17 2.63-3.17 5V18h6v-7h-3.5c0-1.66 1.34-3 3-3l-.33-.5h-2z"/>
        </svg>
        <p>${escapeHtml(block.text)}</p>
      </blockquote>`;
    }
    if (block.type === "image") {
      return `<figure class="bd-article__figure">
        <img src="${block.src}" alt="${escapeHtml(block.caption || "")}" loading="lazy"/>
        ${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}
      </figure>`;
    }
    return `<p class="bd-article__paragraph">${escapeHtml(block.text || "")}</p>`;
  });

  root.innerHTML = parts.join("");
  return headings;
}

/* ── Table of Contents ───────────────────────────────────────────── */
function renderTOC(headings) {
  const block = document.querySelector("#bd-toc-block");
  const list = document.querySelector("#bd-toc-list");
  if (!headings.length) return;

  list.innerHTML = headings
    .map(
      (h) =>
        `<li class="bd-toc__item">
          <a href="#${h.id}" class="bd-toc__link" data-target="${h.id}">${escapeHtml(h.text)}</a>
        </li>`,
    )
    .join("");

  block.hidden = false;

  list.addEventListener("click", (e) => {
    const link = e.target.closest(".bd-toc__link");
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

/* ── Tags ────────────────────────────────────────────────────────── */
function renderTags(blog) {
  const tags = blog.tags || [];
  if (!tags.length) return;
  const wrap = document.querySelector("#bd-tags");
  document.querySelector("#bd-tags-list").innerHTML = tags
    .map((t) => `<span class="bd-tag">${escapeHtml(t)}</span>`)
    .join("");
  wrap.hidden = false;
}

/* ── Share Buttons ───────────────────────────────────────────────── */
function renderShareButtons(blog) {
  const url = window.location.href;
  const title = blog.title;

  const targets = [
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook-f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: "fa-brands fa-x-twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      href: `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`,
    },
  ];

  const buttonsHtml = targets
    .map(
      (t) =>
        `<a href="${t.href}" class="bd-share-btn" target="_blank" rel="noopener" aria-label="Share on ${t.name}">
          <i class="${t.icon}" aria-hidden="true"></i>
        </a>`,
    )
    .join("");

  const copyBtn = `<button class="bd-share-btn bd-share-btn--copy" id="bd-copy-link" type="button" aria-label="Copy link">
    <i class="fa-solid fa-link" aria-hidden="true"></i>
  </button>`;

  document.querySelector("#bd-share-inline").innerHTML = buttonsHtml + copyBtn;
  document.querySelector("#bd-share-sidebar").innerHTML = buttonsHtml + copyBtn;

  document.querySelectorAll("#bd-copy-link").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        btn.classList.add("is-copied");
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i>`;
        setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.innerHTML = original;
        }, 1600);
      } catch (_) {}
    });
  });
}

/* ── Author Card ─────────────────────────────────────────────────── */
function renderAuthor(blog) {
  const author = blog.author;
  if (!author || !author.name) return;
  const card = document.querySelector("#bd-author-card");
  const avatar = author.avatar
    ? `<img src="${author.avatar}" alt="${escapeHtml(author.name)}" class="bd-author-card__avatar" loading="lazy"/>`
    : `<div class="bd-author-card__avatar bd-author-card__avatar--placeholder">
        <i class="fa-solid fa-user" aria-hidden="true"></i>
      </div>`;

  card.innerHTML = `
    ${avatar}
    <div class="bd-author-card__body">
      <span class="bd-author-card__label">About the author</span>
      <h3 class="bd-author-card__name">${escapeHtml(author.name)}</h3>
      ${author.role ? `<p class="bd-author-card__role">${escapeHtml(author.role)}</p>` : ""}
      ${author.bio ? `<p class="bd-author-card__bio">${escapeHtml(author.bio)}</p>` : ""}
    </div>
  `;
}

/* ── Related Articles ────────────────────────────────────────────── */
function renderRelated(current) {
  const others = blogs.filter((b) => b.id !== current.id);
  const sameCategory = others.filter((b) => b.category === current.category);
  const otherCategory = others.filter((b) => b.category !== current.category);
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  if (!related.length) return;
  const section = document.querySelector("#bd-related-section");
  const grid = document.querySelector("#bd-related-grid");
  grid.innerHTML = related.map((b) => renderBlogCard(b)).join("");
  section.hidden = false;
}

/* ── Reading progress bar ────────────────────────────────────────── */
function initReadingProgress() {
  const bar = document.querySelector("#bd-progress");
  const article = document.querySelector(".bd-main");
  if (!bar || !article) return;

  const update = () => {
    const rect = article.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const end = start + article.offsetHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct =
      end > start
        ? Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
        : 0;
    bar.style.width = `${pct * 100}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ── TOC active section tracking ─────────────────────────────────── */
function initTOCActiveTracking(headings) {
  if (!headings.length) return;
  const links = Array.from(document.querySelectorAll(".bd-toc__link"));
  const targets = headings
    .map((h) => document.getElementById(h.id))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((l) =>
      l.classList.toggle("is-active", l.dataset.target === id),
    );
  };

  const onScroll = () => {
    let activeId = targets[0]?.id;
    const offset = 140;
    for (const t of targets) {
      if (t.getBoundingClientRect().top <= offset) activeId = t.id;
      else break;
    }
    if (activeId) setActive(activeId);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Newsletter form ─────────────────────────────────────────────── */
function initNewsletter() {
  const form = document.querySelector("#bd-newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#bd-newsletter-email").value.trim();
    if (!email) return;
    form.innerHTML = `<p class="bd-newsletter__success">
      <i class="fa-solid fa-check" aria-hidden="true"></i>
      Thanks — you'll hear from us soon.
    </p>`;
  });
}

/* ── Helpers ─────────────────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}
