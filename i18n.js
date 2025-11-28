// i18n System
(function() {
  'use strict';

  // Default language
  const DEFAULT_LANG = 'es';
  const STORAGE_KEY = 'portfolio-language';

  // Get saved language or detect from browser
  function getInitialLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'es' || saved === 'en')) {
      return saved;
    }
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    return DEFAULT_LANG;
  }

  // Current language
  let currentLang = getInitialLanguage();

  // Update HTML lang attribute
  function updateHtmlLang(lang) {
    document.documentElement.lang = lang;
  }

  // Update meta tags
  function updateMetaTags(lang) {
    const t = translations[lang].meta;
    document.title = t.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = t.description;
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.content = t.keywords;
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = t.title;
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = t.description;
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.content = t.title;
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.content = t.description;
    }
  }

  // Update footer date based on language
  function updateFooterDate(lang) {
    const footerDateEl = document.getElementById('footer-date');
    if (!footerDateEl) return;

    const fecha = new Date();
    const anio = fecha.getFullYear();

    if (lang === 'en') {
      const meses = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const mes = meses[fecha.getMonth()];
      footerDateEl.textContent = `${mes} ${anio}`;
    } else {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      let mes = meses[fecha.getMonth()];
      mes = mes.charAt(0).toUpperCase() + mes.slice(1);
      footerDateEl.textContent = `${mes} ${anio}`;
    }
  }

  // Translate all elements with data-i18n attribute
  function translatePage(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = getTranslation(lang, key);
      
      if (translation && translation !== key) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.hasAttribute('aria-label') || element.getAttribute('data-i18n-attr') === 'aria-label') {
          element.setAttribute('aria-label', translation);
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update HTML lang attribute
    updateHtmlLang(lang);
    
    // Update meta tags
    updateMetaTags(lang);
    
    // Update footer date
    updateFooterDate(lang);
  }

  // Change language
  function changeLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') {
      console.warn('Invalid language:', lang);
      return;
    }
    
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    translatePage(lang);
    
    // Update language selector if it exists
    updateLanguageSelector(lang);
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // Update language selector UI
  function updateLanguageSelector(lang) {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;

    const buttons = selector.querySelectorAll('button');
    buttons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Initialize language selector
  function initLanguageSelector() {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;

    const buttons = selector.querySelectorAll('button[data-lang]');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
      });
    });

    // Set initial state
    updateLanguageSelector(currentLang);
  }

  // Public API
  window.i18n = {
    getLanguage: () => currentLang,
    changeLanguage: changeLanguage,
    translate: (key) => getTranslation(currentLang, key)
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      translatePage(currentLang);
      initLanguageSelector();
    });
  } else {
    translatePage(currentLang);
    initLanguageSelector();
  }
})();

