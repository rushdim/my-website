// ==========================================================================
// Rushdi Mustafa Yousif Adam — Portfolio
// Shared behaviour: mobile nav, active link, bilingual EN/AR toggle
// ==========================================================================

(function () {
  "use strict";

  // ---- Mobile nav toggle -------------------------------------------------
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // ---- Highlight current page in nav -------------------------------------
  var currentFile = (window.location.pathname.split("/").pop() || "index.html");
  if (currentFile === "") currentFile = "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === currentFile) {
      link.classList.add("active");
    }
  });

  // ---- Language toggle (EN default, AR optional) -------------------------
  var STORAGE_KEY = "rushdi-site-lang";

  function safeGetLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "en";
    } catch (e) {
      return "en";
    }
  }

  function safeSetLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore, storage unavailable */ }
  }

  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var text = lang === "ar" ? (el.getAttribute("data-ar") || el.getAttribute("data-en")) : el.getAttribute("data-en");
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll("[data-en-html]").forEach(function (el) {
      var html2 = lang === "ar" ? (el.getAttribute("data-ar-html") || el.getAttribute("data-en-html")) : el.getAttribute("data-en-html");
      if (html2 !== null) el.innerHTML = html2;
    });

    var toggleLabel = document.querySelector(".lang-toggle .lang-label");
    if (toggleLabel) toggleLabel.textContent = lang === "ar" ? "EN" : "عربي";

    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
    });
  }

  var initialLang = safeGetLang();
  applyLang(initialLang);

  document.querySelectorAll(".lang-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("lang") || "en";
      var next = current === "ar" ? "en" : "ar";
      safeSetLang(next);
      applyLang(next);
      if (navLinks) navLinks.classList.remove("open");
    });
  });
})();
