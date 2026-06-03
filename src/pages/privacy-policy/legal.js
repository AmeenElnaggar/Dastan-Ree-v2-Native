import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");

  // Fade-up reveal on scroll
  const fadeObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => fadeObs.observe(el));

  // Smooth scroll for TOC links
  const tocLinks = Array.from(document.querySelectorAll(".legal-toc__link"));
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });

  // Scrollspy — highlight the section currently in view
  const blocks = Array.from(document.querySelectorAll(".legal-block"));
  if (blocks.length) {
    const linkById = new Map(
      tocLinks.map((l) => [l.getAttribute("href").slice(1), l])
    );

    const setActive = (id) => {
      tocLinks.forEach((l) => l.classList.remove("is-active"));
      linkById.get(id)?.classList.add("is-active");
    };

    const spyObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    blocks.forEach((b) => spyObs.observe(b));
    setActive(blocks[0].id);
  }
});
