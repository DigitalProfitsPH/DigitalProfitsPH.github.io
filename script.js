// Small enhancements only: the page works without this file.
(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  // Mobile menu
  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.toggleAttribute("data-open", open);
  }
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  // Header shadow once the page scrolls
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Fade sections in as they scroll into view
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  // Episode 1 premieres Tue Oct 13, 2026, 6:00 PM Philippine time. Until then the video is private,
  // so its links point to Subscribe instead. After that the HTML's own Episode 1 links apply.
  const premiere = new Date("2026-10-13T18:00:00+08:00");
  if (Date.now() < premiere.getTime()) {
    const subscribe = "https://www.youtube.com/@digitalprofitsph?sub_confirmation=1";
    document.querySelectorAll("[data-ep1-link]").forEach((link) => {
      link.href = subscribe;
      const label = link.querySelector("[data-ep1-label]");
      if (label && link.dataset.ep1Pre) label.textContent = link.dataset.ep1Pre;
    });
    const badge = document.querySelector("[data-ep1-badge]");
    const cta = document.querySelector("[data-ep1-cta]");
    if (badge) badge.textContent = "Oct 13 · 6 PM";
    if (cta) cta.textContent = "Premiere: Oct 13, 6 PM · I-subscribe para ma-notify →";
  }

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
