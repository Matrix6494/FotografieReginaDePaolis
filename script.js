/**
 * Regina de Paolis — Fotografie-Website
 * Intersection Observer, Navbar-Scroll, Hamburger-Menü, Smooth Scroll
 */

(function () {
  'use strict';

  const NAVBAR_SCROLL_THRESHOLD = 50;

  // ---------- Navbar: bei Scroll dunkel machen ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function updateNavbarScroll() {
      if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbarScroll, { passive: true });
    updateNavbarScroll(); // Initial prüfen
  }

  // ---------- Hamburger-Menü (Mobile) ----------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (hamburger && navMenu) {
    function toggleMenu() {
      hamburger.classList.toggle('is-open');
      navMenu.classList.toggle('is-open');
      document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // ---------- Smooth Scroll für Anker-Links (mit Offset für fixe Navbar) ----------
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navbarHeight = 72; // entspricht --navbar-height in CSS

  anchorLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === '#') return;

    link.addEventListener('click', function (e) {
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---------- Intersection Observer: Fade-in beim Scrollen ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!fadeElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // etwas früher auslösen
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
})();
