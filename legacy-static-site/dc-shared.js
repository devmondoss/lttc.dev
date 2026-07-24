/* Lattice — utilidades compartidas por las páginas .dc.html: idioma (i18n),
   toggle ES/EN accesible por teclado, y el scan de "reveal" fade-up.
   Se expone como window.DCShared (mismo patrón que exhibits.js/globe.js:
   IIFE + global, sin bundler). Cada página sigue definiendo su propio
   diccionario T con las claves específicas de esa página; DCShared.T trae
   solo las claves de nav/CTA que son idénticas en las 5 páginas. */
(function () {
  'use strict';

  var T = {
    es: {
      'nav.research': 'Research',
      'nav.makers': 'Makers',
      'nav.terminal': 'Terminal',
      'nav.docs': 'Docs',
      'nav.login': 'Log in',
      'cta.openTerminal': 'Abrir la terminal',
    },
    en: {
      'nav.research': 'Research',
      'nav.makers': 'Makers',
      'nav.terminal': 'Terminal',
      'nav.docs': 'Docs',
      'nav.login': 'Log in',
      'cta.openTerminal': 'Open the terminal',
    },
  };

  function initialLang() {
    if (typeof window === 'undefined') return 'es';
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'en' || q === 'es') return q;
    } catch (e) {}
    return (typeof navigator !== 'undefined' && (navigator.language || '').toLowerCase().indexOf('en') === 0) ? 'en' : 'es';
  }

  // Diccionario efectivo de una página: sus claves propias, con las de
  // nav/CTA compartidas como fallback.
  function dictFor(component) {
    var lang = component.state.lang;
    var own = (component.T && component.T[lang]) || (component.T && component.T.es) || {};
    var shared = T[lang] || T.es;
    return Object.assign({}, shared, own);
  }

  function t(component, key) {
    var dict = dictFor(component);
    return dict[key] != null ? dict[key] : key;
  }

  function setLang(component, lang) {
    if ((lang !== 'es' && lang !== 'en') || component.state.lang === lang) return;
    window.__latticeLang = lang;
    component.setState({ lang: lang });
    window.dispatchEvent(new CustomEvent('lattice:lang', { detail: { lang: lang } }));
  }

  // Aplica el idioma activo a todos los data-i18n* del documento. Los
  // atributos que una página no usa (p. ej. data-i18n-html en landing)
  // simplemente no matchean ningún elemento — no hace falta ramificar por página.
  function applyI18n(component) {
    var dict = dictFor(component);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] != null) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-lang-opt]').forEach(function (el) {
      el.style.color = el.getAttribute('data-lang-opt') === component.state.lang ? '#0A0A0B' : '#B9B7B0';
    });
    document.querySelectorAll('[data-i18n-href-base]').forEach(function (el) {
      var base = el.getAttribute('data-i18n-href-base');
      var hashIdx = base.indexOf('#');
      var path = hashIdx >= 0 ? base.slice(0, hashIdx) : base;
      var hash = hashIdx >= 0 ? base.slice(hashIdx) : '';
      el.setAttribute('href', path + (component.state.lang === 'en' ? '?lang=en' : '') + hash);
    });
    document.documentElement.lang = component.state.lang;
  }

  // Publica el idioma inicial, engancha el toggle [data-lang-toggle] (click +
  // teclado) una sola vez, y reintenta por polling hasta que el dc-runtime
  // haya montado el nodo. Guarda el timer en component._langTimer para que
  // componentWillUnmount pueda limpiarlo con DCShared.unwireLangToggle.
  function wireLangToggle(component) {
    window.__latticeLang = component.state.lang;
    window.dispatchEvent(new CustomEvent('lattice:lang', { detail: { lang: component.state.lang } }));

    var toggleLang = function () { setLang(component, component.state.lang === 'es' ? 'en' : 'es'); };

    var init = function () {
      var toggle = document.querySelector('[data-lang-toggle]');
      if (!toggle) return false;
      if (!toggle.getAttribute('data-lang-init')) {
        toggle.setAttribute('data-lang-init', '1');
        toggle.querySelectorAll('[data-lang-opt]').forEach(function (el) {
          el.addEventListener('click', function (e) {
            e.stopPropagation();
            setLang(component, el.getAttribute('data-lang-opt'));
          });
        });
        toggle.addEventListener('click', toggleLang);
        toggle.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLang();
          }
        });
      }
      applyI18n(component);
      return true;
    };
    if (!init()) {
      component._langTimer = setInterval(function () { if (init()) clearInterval(component._langTimer); }, 200);
    }
  }

  function unwireLangToggle(component) {
    clearInterval(component._langTimer);
  }

  // Reveal fade-up: observa [data-reveal] y los anima al entrar en viewport.
  // Respeta prefers-reduced-motion (no hace nada si está activo).
  function setupReveal(component) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    component._revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          component._revealIO.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    var scan = function () {
      document.querySelectorAll('[data-reveal]:not([data-reveal-on])').forEach(function (el) {
        el.setAttribute('data-reveal-on', '1');
        var r = el.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.92) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(22px)';
        }
        el.style.transition = 'opacity 0.7s cubic-bezier(0.2,0.6,0.2,1), transform 0.7s cubic-bezier(0.2,0.6,0.2,1)';
        component._revealIO.observe(el);
      });
    };
    scan();
    component._revealScanTimer = setInterval(scan, 800);
    component._revealScanStop = setTimeout(function () { clearInterval(component._revealScanTimer); }, 6000);
  }

  function teardownReveal(component) {
    if (component._revealIO) component._revealIO.disconnect();
    clearInterval(component._revealScanTimer);
    clearTimeout(component._revealScanStop);
  }

  window.DCShared = {
    T: T,
    initialLang: initialLang,
    t: t,
    setLang: setLang,
    applyI18n: applyI18n,
    wireLangToggle: wireLangToggle,
    unwireLangToggle: unwireLangToggle,
    setupReveal: setupReveal,
    teardownReveal: teardownReveal,
  };
})();
