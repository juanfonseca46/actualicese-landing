/* ============================================================
   main.js — interacciones de la landing
   ============================================================ */
(function () {
  "use strict";

  /* --- Menú móvil --- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    /* Cierra el menú al hacer clic en un enlace */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Autoscroll suave de la topbar (Planes / Beneficios / Herramientas) --- */
  const OFFSET = 24; // coincide con scroll-margin-top de las secciones

  function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start = null;
    const ease = function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; };

    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      window.scrollTo(0, startY + diff * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
      smoothScrollTo(y, 600);
      history.pushState(null, "", id);
    });
  });

  /* --- Utilidad: gap horizontal de un contenedor flex --- */
  function trackGap(track) {
    const cs = getComputedStyle(track);
    return parseFloat(cs.columnGap || cs.gap || "0") || 0;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Autoplay + swipe táctil, reutilizable por cualquier carrusel --- */
  function addAutoAndSwipe(root, api, interval) {
    let timer = null;

    function start() {
      if (reduceMotion || api.count() <= 1) return;
      stop();
      timer = setInterval(function () { api.next(); }, interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    /* Pausa al pasar el mouse (escritorio) */
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    /* Pausa cuando la pestaña no está visible */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    /* Swipe táctil (celular) */
    let x0 = null, y0 = null, tracking = false;
    root.addEventListener("touchstart", function (e) {
      const t = e.touches[0];
      x0 = t.clientX; y0 = t.clientY; tracking = true;
      stop();
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (!tracking || x0 === null) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) api.next(); else api.prev();
      }
      x0 = null;
      restart();
    }, { passive: true });

    start();
    return { start: start, stop: stop, restart: restart };
  }

  /* --- Carrusel de HERRAMIENTAS: centra la card activa (con laterales asomando) --- */
  (function () {
    const root = document.querySelector(".tools-carousel");
    const track = document.querySelector(".tools-track");
    if (!root || !track) return;
    const cards = Array.prototype.slice.call(track.children);
    const prev = document.querySelector("#tools-prev");
    const next = document.querySelector("#tools-next");
    const center = Math.floor(cards.length / 2);
    let index = center; // arranca con la card del medio activa
    let ctrl;

    function render() {
      const gap = trackGap(track);
      const cardW = cards[0].getBoundingClientRect().width;
      const offset = (center - index) * (cardW + gap);
      track.style.transform = "translateX(" + offset + "px)";
      cards.forEach(function (c, i) { c.classList.toggle("is-active", i === index); });
    }
    function go(d) { index = (index + d + cards.length) % cards.length; render(); } // loop
    if (prev) prev.addEventListener("click", function () { go(-1); if (ctrl) ctrl.restart(); });
    if (next) next.addEventListener("click", function () { go(1); if (ctrl) ctrl.restart(); });
    window.addEventListener("resize", render);
    render();

    ctrl = addAutoAndSwipe(root, {
      next: function () { go(1); },
      prev: function () { go(-1); },
      count: function () { return cards.length; }
    }, 5000);
  })();

  /* --- Carrusel de TESTIMONIOS: navega por páginas (3 → 2 → 1 según ancho) --- */
  (function () {
    const track = document.querySelector(".testimonial-grid");
    const viewport = document.querySelector(".testi-carousel");
    if (!track || !viewport) return;
    const cards = Array.prototype.slice.call(track.children);
    const prev = document.querySelector("#testi-prev");
    const next = document.querySelector("#testi-next");
    let index = 0; // página actual
    let ctrl;

    function perView() {
      const gap = trackGap(track);
      const cardW = cards[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(viewport.clientWidth / (cardW + gap)));
    }
    function pages() { return Math.max(1, Math.ceil(cards.length / perView())); }

    function render() {
      const gap = trackGap(track);
      const step = viewport.clientWidth + gap; // una página completa
      index = Math.min(index, pages() - 1);
      track.style.transform = "translateX(" + (-index * step) + "px)";
    }
    function go(d) { index = (index + d + pages()) % pages(); render(); } // loop
    if (prev) prev.addEventListener("click", function () { go(-1); if (ctrl) ctrl.restart(); });
    if (next) next.addEventListener("click", function () { go(1); if (ctrl) ctrl.restart(); });
    window.addEventListener("resize", render);
    render();

    ctrl = addAutoAndSwipe(viewport, {
      next: function () { go(1); },
      prev: function () { go(-1); },
      count: function () { return pages(); }
    }, 6000);
  })();
})();
