/**
 * Navbar activo + breadcrumb unificado para páginas fuera de productos/productos_us.
 * En productos, el breadcrumb lo gestiona productos.js / productos_us.js.
 */
(function () {
  'use strict';

  const isUs = /\/pages_us\//.test(window.location.pathname) || document.documentElement.lang === 'en';

  const LABELS = isUs
    ? {
        inicio: 'Home',
        categorias: 'Categories',
        marcas: 'Brands',
        productos: 'Products',
        paises: 'Countries',
        subcategorias: 'Subcategory',
        carrito: 'Cart',
        login: 'Sign In',
        usuario: 'My Account',
        compras: 'Product Detail',
        busqueda: 'Search',
        filtrado: 'Filtered Products',
        brands: 'Brands',
        opciones: 'Options',
      }
    : {
        inicio: 'Inicio',
        categorias: 'Categorías',
        marcas: 'Marcas',
        productos: 'Productos',
        paises: 'Países',
        subcategorias: 'Subcategoría',
        carrito: 'Carrito',
        login: 'Iniciar sesión',
        usuario: 'Mi cuenta',
        compras: 'Detalle de producto',
        busqueda: 'Búsqueda',
        filtrado: 'Productos filtrados',
        brands: 'Marcas',
        opciones: 'Opciones',
      };

  const ROUTES = isUs
    ? {
        home: '/pages_us/Home_us.html',
        productos: '/pages_us/productos_us.html',
      }
    : {
        home: '/pages/index.html',
        productos: '/pages/productos.html',
      };

  const PAGE_MAP = {
    index: { nav: 'inicio', crumbs: ['inicio'] },
    home_us: { nav: 'inicio', crumbs: ['inicio'] },
    productos: { nav: null, crumbs: null },
    productos_us: { nav: null, crumbs: null },
    subcategorias: { nav: 'categorias', crumbs: ['inicio', 'categorias', 'dynamic:subcategoria'] },
    subcategorias_us: { nav: 'categorias', crumbs: ['inicio', 'categorias', 'dynamic:subcategoria'] },
    brands: { nav: 'marcas', crumbs: ['inicio', 'marcas'] },
    brands_us: { nav: 'marcas', crumbs: ['inicio', 'marcas'] },
    filtrado: { nav: 'productos', crumbs: ['inicio', 'productos', 'filtrado'] },
    filtrado_us: { nav: 'productos', crumbs: ['inicio', 'productos', 'filtrado'] },
    busquedas: { nav: 'productos', crumbs: ['inicio', 'productos', 'busqueda'] },
    busqueda_us: { nav: 'productos', crumbs: ['inicio', 'productos', 'busqueda'] },
    carrito: { nav: null, crumbs: ['inicio', 'carrito'] },
    carrito_us: { nav: null, crumbs: ['inicio', 'carrito'] },
    login: { nav: null, crumbs: ['inicio', 'login'] },
    login_us: { nav: null, crumbs: ['inicio', 'login'] },
    usuario: { nav: null, crumbs: ['inicio', 'usuario'] },
    usuario_us: { nav: null, crumbs: ['inicio', 'usuario'] },
    compras: { nav: 'productos', crumbs: ['inicio', 'productos', 'compras'] },
    compras_us: { nav: 'productos', crumbs: ['inicio', 'productos', 'compras'] },
    opciones: { nav: 'productos', crumbs: ['inicio', 'productos', 'opciones'] },
    opciones_us: { nav: 'productos', crumbs: ['inicio', 'productos', 'opciones'] },
  };

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function resolvePageKey() {
    const path = window.location.pathname || '';
    if (/^\/product\/[^/]+\/?$/i.test(path)) return 'compras_us';
    if (/^\/producto\/[^/]+\/?$/i.test(path)) return 'compras';
    const file = (path.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
    return file || 'index';
  }

  /** Páginas cuyo breadcrumb lo construye su propio script (no sobrescribir). */
  const CUSTOM_BREADCRUMB_KEYS = new Set([
    'productos',
    'productos_us',
    'compras',
    'compras_us',
    'opciones',
    'opciones_us',
  ]);

  function managesOwnBreadcrumb(pageKey) {
    return CUSTOM_BREADCRUMB_KEYS.has(pageKey);
  }

  function isProductosPage(pageKey) {
    return pageKey === 'productos' || pageKey === 'productos_us';
  }

  function hrefForCrumb(key) {
    if (key === 'inicio') return ROUTES.home;
    if (key === 'categorias') return ROUTES.productos + '?section=categorias';
    if (key === 'marcas') return ROUTES.productos + '?section=marcas';
    if (key === 'productos') return ROUTES.productos + '?section=inicio';
    if (key === 'paises') return ROUTES.productos + '?section=paises';
    return null;
  }

  function buildCrumbs(config) {
    if (!config || !config.crumbs) return null;
    const crumbs = [];
    for (const key of config.crumbs) {
      if (key.startsWith('dynamic:')) {
        const param = key.split(':')[1];
        const val = new URLSearchParams(window.location.search).get(param);
        if (val) crumbs.push({ label: decodeURIComponent(val), href: null });
        continue;
      }
      crumbs.push({ label: LABELS[key] || key, href: hrefForCrumb(key) });
    }
    return crumbs;
  }

  function renderBreadcrumb(crumbs) {
    const list = document.getElementById('sectionBreadcrumbList');
    if (!list || !crumbs || !crumbs.length) return;
    list.innerHTML = crumbs
      .map((c, i) => {
        const isLast = i === crumbs.length - 1;
        if (!c.href || isLast) {
          return `<li${isLast ? ' aria-current="page"' : ''}><span class="${isLast ? 'bc-current' : ''}">${escapeHtml(c.label)}</span></li>`;
        }
        return `<li><a href="${escapeHtml(c.href)}">${escapeHtml(c.label)}</a></li>`;
      })
      .join('');
  }

  function setActiveNav(section) {
    document.querySelectorAll('[data-nav-section]').forEach((el) => {
      el.classList.toggle('active', !!section && el.dataset.navSection === section);
    });
  }

  function applyPageLayout() {
    const pageKey = resolvePageKey();
    if (isProductosPage(pageKey)) return;

    const config = PAGE_MAP[pageKey] || { nav: null, crumbs: ['inicio'] };
    setActiveNav(config.nav);

    if (!managesOwnBreadcrumb(pageKey)) {
      renderBreadcrumb(buildCrumbs(config));
    }
  }

  function unifySearchButtons() {
    const label = isUs ? 'Search' : 'Buscar';
    const icon =
      '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>';
    document.querySelectorAll('.search-bar button').forEach((btn) => {
      if (btn.querySelector('svg')) return;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', label);
      btn.textContent = '';
      btn.insertAdjacentHTML('beforeend', icon);
    });
  }

  function initMenuToggle() {
    ensureMobileMenuToggle();

    const menuToggle = document.getElementById('menuToggle');
    const headerRights = Array.from(document.querySelectorAll('.header-right'));
    const headerRight = headerRights[0] || null;
    const primaryMenu = document.getElementById('primaryMenu');
    if (!menuToggle) return;
    if (menuToggle.dataset.menuInit) return;
    menuToggle.dataset.menuInit = '1';

    if (document.querySelector('.site-header')) {
      document.body.classList.add('site-has-drawer-nav');
    }

    const isDrawerNav = document.body.classList.contains('site-has-drawer-nav');

    const setMenuOpen = (open) => {
      document.body.classList.toggle('header-menu-open', !!open);
      document.body.classList.toggle('menu-open', !!open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');

      headerRights.forEach((el) => {
        el.classList.toggle('active', !!open);
        el.classList.toggle('is-open', !!open);
      });

      if (isDrawerNav) {
        if (primaryMenu) primaryMenu.classList.toggle('open', !!open);
      } else if (primaryMenu) {
        primaryMenu.classList.remove('open');
      }
    };

    // Siempre inicia cerrado (evita menú desplegado al cargar)
    setMenuOpen(false);

    menuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = !document.body.classList.contains('header-menu-open');
      setMenuOpen(isOpen);
    });

    document.addEventListener('click', (event) => {
      if (!document.body.classList.contains('header-menu-open')) return;
      if (menuToggle.contains(event.target)) return;
      if (headerRights.some((el) => el.contains(event.target))) return;
      if (primaryMenu && primaryMenu.contains(event.target)) return;
      setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && document.body.classList.contains('header-menu-open')) {
        setMenuOpen(false);
      }
    }, { passive: true });
  }

  function ensureMobileMenuToggle() {
    if (document.getElementById('menuToggle')) return;
    const headerContainer = document.querySelector('.header-container');
    if (!headerContainer) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'menuToggle';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', isUs ? 'Open menu' : 'Abrir menú');
    toggle.textContent = '☰';

    const logoLink =
      headerContainer.querySelector('a.logo-link, a.logo') ||
      headerContainer.querySelector(':scope > a') ||
      headerContainer.querySelector('.logo')?.closest('a');

    if (logoLink && headerContainer.contains(logoLink)) {
      logoLink.insertAdjacentElement('afterend', toggle);
      return;
    }

    const searchBar = headerContainer.querySelector('.search-bar');
    if (searchBar) {
      searchBar.insertAdjacentElement('beforebegin', toggle);
      return;
    }

    headerContainer.appendChild(toggle);
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.dataset.fixedScrollInit) return;
    navbar.dataset.fixedScrollInit = '1';

    const updateNavbarFixed = () => {
      const offsetTop = navbar.classList.contains('fixed') ? 0 : navbar.offsetTop;
      if (window.scrollY > offsetTop + 100) {
        navbar.classList.add('fixed');
      } else {
        navbar.classList.remove('fixed');
      }
    };

    window.addEventListener('scroll', updateNavbarFixed, { passive: true });
    window.addEventListener('load', updateNavbarFixed);
    window.addEventListener('resize', updateNavbarFixed, { passive: true });
    updateNavbarFixed();
  }

  function ensureLanguageModal() {
    if (document.getElementById('languageModal')) return;

    const labels = isUs
      ? {
          title: '🌍 Select your language',
          subtitle: 'Which language would you like to view the site in?',
          es: '🇪🇸 Spanish',
          en: '🇺🇸 English',
        }
      : {
          title: '🌍 Selecciona tu idioma',
          subtitle: '¿En qué idioma deseas ver la página?',
          es: '🇪🇸 Español',
          en: '🇺🇸 English',
        };

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="languageModal" class="lang-modal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle">
        <div class="lang-modal-content">
          <button type="button" class="lang-close" id="closeLangModal" aria-label="${isUs ? 'Close' : 'Cerrar'}">&times;</button>
          <h2 id="langModalTitle">${labels.title}</h2>
          <p>${labels.subtitle}</p>
          <div class="lang-buttons">
            <button type="button" class="lang-btn" data-lang="es">${labels.es}</button>
            <button type="button" class="lang-btn" data-lang="en">${labels.en}</button>
          </div>
        </div>
      </div>`
    );
  }

  function selectLanguage(lang) {
    localStorage.setItem('lang', lang);
    if (lang === 'es') {
      window.location.href = '/pages/index.html';
      return;
    }
    window.location.href = 'https://ingprosuppliers.com';
  }

  function initLanguageModal() {
    ensureLanguageModal();
    const langModal = document.getElementById('languageModal');
    const openLangModal = document.getElementById('openLangModal');
    const closeLangModal = document.getElementById('closeLangModal');
    if (!langModal || !openLangModal) return;

    if (openLangModal.dataset.langInit) return;
    openLangModal.dataset.langInit = '1';

    const showModal = () => {
      langModal.hidden = false;
      langModal.style.display = 'flex';
    };
    const hideModal = () => {
      langModal.style.display = 'none';
      langModal.hidden = true;
    };

    openLangModal.addEventListener('click', showModal);

    if (closeLangModal && !closeLangModal.dataset.langInit) {
      closeLangModal.dataset.langInit = '1';
      closeLangModal.addEventListener('click', hideModal);
    }

    if (!langModal.dataset.langInit) {
      langModal.dataset.langInit = '1';
      langModal.addEventListener('click', (ev) => {
        if (ev.target === langModal) hideModal();
      });
    }

    langModal.querySelectorAll('[data-lang]').forEach((btn) => {
      if (btn.dataset.langBound) return;
      btn.dataset.langBound = '1';
      btn.addEventListener('click', () => selectLanguage(btn.dataset.lang));
    });

    langModal.querySelectorAll('.lang-btn[onclick]').forEach((btn) => {
      btn.removeAttribute('onclick');
    });
  }

  window.selectLanguage = selectLanguage;

  const ICON_HOME =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 3.5 10.4c-.3.3-.4.6-.4 1V20c0 .6.4 1 1 1h5.7v-6.2h4.4V21H19.9c.6 0 1-.4 1-1v-8.6c0-.4-.1-.7-.4-1L12 3.2z"/></svg>';
  const ICON_GRID =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>';
  const ICON_CART =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3.2 4h1.7l.4 2H20a1 1 0 0 1 1 1.2l-1.5 7A2 2 0 0 1 17.6 16H8.4l-.3 1.4H19v2H7.2L5 6H3.2V4z"/></svg>';
  const ICON_USER =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12a4.2 4.2 0 1 0 0-8.4A4.2 4.2 0 0 0 12 12zm0 2c-4.1 0-8 2.1-8 5.2V21h16v-1.8c0-3.1-3.9-5.2-8-5.2z"/></svg>';
  const ICON_MORE =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 10.5A1.5 1.5 0 1 0 6 13.5 1.5 1.5 0 0 0 6 10.5zm6 0A1.5 1.5 0 1 0 12 13.5 1.5 1.5 0 0 0 12 10.5zm6 0A1.5 1.5 0 1 0 18 13.5 1.5 1.5 0 0 0 18 10.5z"/></svg>';

  function getCartQty() {
    try {
      const items = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      if (!Array.isArray(items)) return 0;
      return items.reduce((n, p) => n + (Number(p.quantity) || 1), 0);
    } catch {
      return 0;
    }
  }

  function resolveAppTab() {
    const key = resolvePageKey();
    const path = window.location.pathname || '';
    if (
      key === 'index' ||
      key === 'home_us' ||
      path === '/' ||
      path === '/es' ||
      path === '/es/'
    ) {
      return 'inicio';
    }
    if (key.indexOf('carrito') === 0) return 'carrito';
    if (key.indexOf('login') === 0 || key.indexOf('usuario') === 0) return 'cuenta';
    return 'productos';
  }

  function isAccountLoggedIn() {
    try {
      return !!(
        localStorage.getItem('token') ||
        localStorage.getItem('user') ||
        sessionStorage.getItem('userId')
      );
    } catch {
      return false;
    }
  }

  function syncAppTabActive() {
    const tab = resolveAppTab();
    document.querySelectorAll('.app-tab[data-tab]').forEach((el) => {
      const on = el.dataset.tab === tab;
      el.classList.toggle('is-active', on);
      if (on) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  function syncAppCartBadge() {
    const badge = document.getElementById('appTabCartBadge');
    if (!badge) return;
    const qty = getCartQty();
    badge.textContent = qty > 99 ? '99+' : String(qty);
    badge.hidden = qty < 1;
  }

  function setAppSheetOpen(open) {
    const sheet = document.getElementById('appMoreSheet');
    const backdrop = document.getElementById('appSheetBackdrop');
    const moreBtn = document.querySelector('.app-tab[data-tab="mas"]');
    document.body.classList.toggle('app-sheet-open', !!open);
    if (sheet) sheet.hidden = !open;
    if (backdrop) backdrop.hidden = !open;
    if (moreBtn) {
      moreBtn.classList.toggle('is-open', !!open);
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  }

  function initAppTabBar() {
    if (document.getElementById('appTabBar')) {
      document.body.classList.add('has-app-tabbar');
      syncAppTabActive();
      syncAppCartBadge();
      return;
    }

    const homeHref = isUs ? '/pages_us/Home_us.html' : '/pages/index.html';
    const productsHref = isUs
      ? '/pages_us/productos_us.html?section=inicio'
      : '/pages/productos.html?section=inicio';
    const cartHref = isUs ? '/pages_us/carrito_us.html' : '/pages/carrito.html';
    const accountHref = isUs
      ? isAccountLoggedIn()
        ? '/pages_us/usuario_us.html'
        : '/pages_us/login_us.html'
      : isAccountLoggedIn()
        ? '/pages/usuario.html'
        : '/pages/login.html';

    const t = isUs
      ? {
          nav: 'App menu',
          home: 'Home',
          products: 'Products',
          cart: 'Cart',
          account: 'Account',
          more: 'More',
          contact: 'WhatsApp',
          language: 'Language',
          phone: 'Call',
          email: 'Email',
        }
      : {
          nav: 'Menú de la app',
          home: 'Inicio',
          products: 'Productos',
          cart: 'Carrito',
          account: 'Cuenta',
          more: 'Más',
          contact: 'WhatsApp',
          language: 'Idioma',
          phone: 'Llamar',
          email: 'Correo',
        };

    document.body.classList.add('has-app-tabbar');
    document.body.insertAdjacentHTML(
      'beforeend',
      `<nav class="app-tabbar" id="appTabBar" aria-label="${t.nav}">
        <a class="app-tab" data-tab="inicio" href="${homeHref}">
          <span class="app-tab-icon">${ICON_HOME}</span>
          <span class="app-tab-label">${t.home}</span>
        </a>
        <a class="app-tab" data-tab="productos" href="${productsHref}">
          <span class="app-tab-icon">${ICON_GRID}</span>
          <span class="app-tab-label">${t.products}</span>
        </a>
        <a class="app-tab" data-tab="carrito" href="${cartHref}">
          <span class="app-tab-icon">${ICON_CART}<span class="app-tab-badge" id="appTabCartBadge" hidden>0</span></span>
          <span class="app-tab-label">${t.cart}</span>
        </a>
        <a class="app-tab" data-tab="cuenta" href="${accountHref}">
          <span class="app-tab-icon">${ICON_USER}</span>
          <span class="app-tab-label">${t.account}</span>
        </a>
        <button type="button" class="app-tab" data-tab="mas" aria-expanded="false" aria-controls="appMoreSheet">
          <span class="app-tab-icon">${ICON_MORE}</span>
          <span class="app-tab-label">${t.more}</span>
        </button>
      </nav>
      <div class="app-sheet-backdrop" id="appSheetBackdrop" hidden></div>
      <div class="app-sheet" id="appMoreSheet" hidden role="dialog" aria-label="${t.more}">
        <div class="app-sheet-handle"></div>
        <a class="app-sheet-item" href="https://wa.me/14842634627" target="_blank" rel="noopener noreferrer">${t.contact}</a>
        <button type="button" class="app-sheet-item" id="appSheetLang">${t.language}</button>
        <a class="app-sheet-item" href="tel:+14842634627">${t.phone}: +1 (484) 263-4627</a>
        <a class="app-sheet-item" href="mailto:sales@ingprosuppliers.com">${t.email}</a>
      </div>`
    );

    const moreBtn = document.querySelector('.app-tab[data-tab="mas"]');
    const backdrop = document.getElementById('appSheetBackdrop');
    const langBtn = document.getElementById('appSheetLang');

    moreBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      setAppSheetOpen(!document.body.classList.contains('app-sheet-open'));
    });
    backdrop?.addEventListener('click', () => setAppSheetOpen(false));
    langBtn?.addEventListener('click', () => {
      setAppSheetOpen(false);
      const openLang = document.getElementById('openLangModal');
      if (openLang) openLang.click();
    });

    syncAppTabActive();
    syncAppCartBadge();
    window.addEventListener('pageshow', syncAppCartBadge);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) syncAppCartBadge();
    });
  }

  const ZSIQ_SELECTORS = [
    '.zsiq_floatmain',
    '.zsiq_flt_rel',
    '.zsiq_theme1',
    '.zsiq-float',
    '.zsiq_float',
    '.zsalesiq',
    '#zsiq_float',
    'div[id^="zsiq_float"]',
    'div[id^="zsiqwidget"]',
    '.siq_float',
  ].join(',');

  function isMobileAppLayout() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function liftZohoChat() {
    const mobile = isMobileAppLayout();
    const right = '14px';

    try {
      const offset = window.$zoho && $zoho.salesiq && $zoho.salesiq.floatbutton && $zoho.salesiq.floatbutton.offset;
      if (offset && typeof offset.set === 'function') {
        offset.set({ bottom: mobile ? '80px' : '20px', right });
      }
    } catch (_) {
      /* SalesIQ aún no está listo */
    }

    document.querySelectorAll(ZSIQ_SELECTORS).forEach((el) => {
      if (mobile) {
        el.style.setProperty('bottom', 'calc(80px + env(safe-area-inset-bottom, 0px))', 'important');
        el.style.setProperty('right', right, 'important');
        el.style.setProperty('z-index', '12025', 'important');
      } else {
        el.style.removeProperty('bottom');
        el.style.removeProperty('right');
        el.style.removeProperty('z-index');
      }
    });
  }

  function initZohoChatPosition() {
    window.$zoho = window.$zoho || {};
    $zoho.salesiq = $zoho.salesiq || { ready: function () {} };
    const previousReady = $zoho.salesiq.ready;
    $zoho.salesiq.ready = function () {
      if (typeof previousReady === 'function') {
        try {
          previousReady.apply(this, arguments);
        } catch (_) {}
      }
      liftZohoChat();
    };

    liftZohoChat();
    window.addEventListener('resize', liftZohoChat, { passive: true });
    window.addEventListener('load', liftZohoChat);

    let liftTimer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(liftTimer);
      liftTimer = window.setTimeout(liftZohoChat, 80);
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(() => observer.disconnect(), 15000);
    }
    [600, 1500, 4000].forEach((ms) => window.setTimeout(liftZohoChat, ms));
  }

  function init() {
    unifySearchButtons();
    initMenuToggle();
    initAppTabBar();
    initZohoChatPosition();
    initNavbarScroll();
    initLanguageModal();
    applyPageLayout();
    window.addEventListener('load', applyPageLayout);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.siteLayout = {
    setActiveNav,
    applyPageLayout,
    renderBreadcrumb,
    resolvePageKey,
    LABELS,
    ROUTES,
  };
})();
