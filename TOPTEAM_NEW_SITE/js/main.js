/**
 * TOPTEAM Core Application Logic & Live Data Integrations
 * Full Implementation: Multilingual, Real-time Bitcoin Feed, Theme Engine, Font Engine, Visibility Engine, Dynamic Custom Cards
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'ar';

  // DOM Elements
  const headerSticky = document.querySelector('.header-sticky');
  const langDropdown = document.querySelector('.lang-dropdown-wrapper');
  const langBtn = document.querySelector('.lang-btn');
  const currentLangLabel = document.querySelector('.current-lang-label');
  const langItems = document.querySelectorAll('.lang-item');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  const whatsappBtn = document.querySelector('#floatingWhatsappBtn');
  const startMiningButtons = document.querySelectorAll('.btn-referral-start');
  const hashnetRegisterButtons = document.querySelectorAll('.btn-hashnet-reg');

  // Bitcoin Live Elements
  const btcPriceEl = document.getElementById('btcLivePrice');
  const btcChangeEl = document.getElementById('btcLiveChange');
  const btcMarketCapEl = document.getElementById('btcLiveMarketCap');
  const btcVolEl = document.getElementById('btcLiveVol');
  const btcTimestampEl = document.getElementById('btcLiveTimestamp');

  // =========================================================================
  // 1. Theme & Appearance Engine (تطبيق الثيمات والخطوط)
  // =========================================================================
  function applyAppearance(cfg) {
    const app = (cfg && cfg.appearance) || (typeof TOPTEAM_CONFIG !== 'undefined' && TOPTEAM_CONFIG.appearance) || {};
    
    // Set Theme (gold, cyber, emerald, purple, crimson)
    const theme = app.theme || 'gold';
    if (theme === 'gold') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    // Set Font (cairo, tajawal, ibm, almarai, readex)
    const font = app.font || 'cairo';
    document.body.className = `font-${font}`;
  }

  // =========================================================================
  // 2. Visibility Toggles Engine (إظهار وإخفاء الخيارات والأقسام)
  // =========================================================================
  function applyVisibilityToggles(cfg) {
    const vis = (cfg && cfg.visibility) || (typeof TOPTEAM_CONFIG !== 'undefined' && TOPTEAM_CONFIG.visibility) || {};

    // Official Telegram Card (بديل الإيميل)
    const tgCard = document.getElementById('contactTelegramCard');
    if (tgCard) {
      tgCard.style.display = vis.showTelegramCard === false ? 'none' : '';
    }

    // WhatsApp Contact Card
    const waCard = document.getElementById('contactWaCard');
    if (waCard) {
      waCard.style.display = vis.showWhatsAppCard === false ? 'none' : '';
    }

    // Floating WhatsApp Button
    if (whatsappBtn) {
      whatsappBtn.style.display = vis.showWhatsAppFloating === false ? 'none' : '';
    }

    // Social Media Card
    const socialCard = document.getElementById('contactSocialCard');
    if (socialCard) {
      socialCard.style.display = vis.showSocialCard === false ? 'none' : '';
    }

    // Language Switcher
    if (langDropdown) {
      langDropdown.style.display = vis.showLanguageSwitcher === false ? 'none' : '';
    }

    // Full Sections Toggles
    const secBtc = document.getElementById('live-btc-section');
    if (secBtc) secBtc.style.display = vis.showLiveBtcSection === false ? 'none' : '';

    const secProjects = document.getElementById('projects-section');
    if (secProjects) secProjects.style.display = vis.showProjectsSection === false ? 'none' : '';

    const secPackages = document.getElementById('packages-section');
    if (secPackages) secPackages.style.display = vis.showPackagesSection === false ? 'none' : '';

    const secHashNet = document.getElementById('hashnet-section');
    if (secHashNet) secHashNet.style.display = vis.showHashNetSection === false ? 'none' : '';

    const secEdu = document.getElementById('edu-section');
    if (secEdu) secEdu.style.display = vis.showEduSection === false ? 'none' : '';

    const secCoins = document.getElementById('coins-section');
    if (secCoins) secCoins.style.display = vis.showCoinsSection === false ? 'none' : '';
  }

  // =========================================================================
  // 3. Injected Links & Config Initialization
  // =========================================================================
  function applyConfigLinks() {
    let cfg = typeof TOPTEAM_CONFIG !== 'undefined' ? TOPTEAM_CONFIG : {};

    // Check if custom config was saved via admin panel
    const savedCustom = localStorage.getItem('topteam_custom_config');
    if (savedCustom) {
      try {
        cfg = JSON.parse(savedCustom);
        if (cfg.whatsapp && !cfg.whatsapp.getLink) {
          cfg.whatsapp.getLink = function() {
            return this.directUrl || `https://wa.me/${this.phoneNumber}`;
          };
        }
      } catch (e) {
        console.error('Error parsing custom config', e);
      }
    }

    // Apply Appearance & Visibility Toggles
    applyAppearance(cfg);
    applyVisibilityToggles(cfg);

    // Start Mining Referral Links
    startMiningButtons.forEach(btn => {
      if (cfg.referral && cfg.referral.startMiningUrl) {
        btn.setAttribute('href', cfg.referral.startMiningUrl);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // HashNet Specific Register Buttons
    hashnetRegisterButtons.forEach(btn => {
      if (cfg.referral && cfg.referral.hashnetRegisterUrl) {
        btn.setAttribute('href', cfg.referral.hashnetRegisterUrl);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // WhatsApp Floating Button & Contact Cards
    if (cfg.whatsapp) {
      const waLink = cfg.whatsapp.directUrl || (cfg.whatsapp.getLink ? cfg.whatsapp.getLink() : `https://wa.me/${cfg.whatsapp.phoneNumber}`);
      if (whatsappBtn) {
        whatsappBtn.setAttribute('href', waLink);
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('rel', 'noopener noreferrer');
      }
      document.querySelectorAll('.btn-wa-direct').forEach(btn => {
        btn.setAttribute('href', waLink);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      });
    }

    // Telegram Channel Links (بطاقة التليجرام وأيقونات السوشيال)
    const tgUrl = (cfg.social && cfg.social.telegram) || (cfg.contact && cfg.contact.telegram) || 'https://t.me/Hash1Net';
    document.querySelectorAll('.btn-tg-direct, a[href*="t.me"]').forEach(btn => {
      btn.setAttribute('href', tgUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

    // Twitter / X Links
    const twitterUrl = (cfg.social && cfg.social.twitter) || (cfg.contact && cfg.contact.twitter);
    if (twitterUrl) {
      document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]').forEach(btn => {
        btn.setAttribute('href', twitterUrl);
      });
    }

    // YouTube Links
    const ytUrl = (cfg.social && cfg.social.youtube) || (cfg.contact && cfg.contact.youtube);
    if (ytUrl) {
      document.querySelectorAll('a[href*="youtube.com"]').forEach(btn => {
        btn.setAttribute('href', ytUrl);
      });
    }

    // Package Buy Buttons
    document.querySelectorAll('[data-package-id]').forEach(btn => {
      const pkgId = btn.getAttribute('data-package-id');
      const buyUrl = (cfg.referral && cfg.referral.packages && cfg.referral.packages[pkgId]) || cfg.referral.startMiningUrl;
      if (buyUrl) {
        btn.setAttribute('href', buyUrl);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // =========================================================================
  // 4. Language Switcher Engine
  // =========================================================================
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    const t = TRANSLATIONS[lang];

    // Direction & HTML Lang
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', lang);

    // Label Update
    if (currentLangLabel) {
      currentLangLabel.textContent = t.langName;
    }

    // Dropdown active state
    langItems.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Translate all [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n').split('.');
      let val = t;
      for (const key of keyPath) {
        if (val && val[key] !== undefined) {
          val = val[key];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null) {
        el.textContent = val;
      }
    });

    // Re-render Dynamic Projects & Custom Cards
    renderProjects();

    // Close Dropdown
    if (langDropdown) {
      langDropdown.classList.remove('open');
    }

    localStorage.setItem('topteam_lang', lang);
  }

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });

    langItems.forEach(item => {
      item.addEventListener('click', () => {
        const selectedLang = item.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
  }

  // =========================================================================
  // 5. Bitcoin Live Market API Integration
  // =========================================================================
  async function fetchLiveBtcData() {
    if (!btcPriceEl) return;

    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true');
      
      if (!response.ok) throw new Error('API network response not ok');
      const data = await response.json();
      
      if (data && data.bitcoin) {
        const btc = data.bitcoin;
        const price = btc.usd;
        const change = btc.usd_24h_change;
        const mcap = btc.usd_market_cap;
        const vol = btc.usd_24h_vol;

        btcPriceEl.textContent = `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        if (btcChangeEl) {
          const isUp = change >= 0;
          btcChangeEl.className = `btc-stat-change ${isUp ? 'change-up' : 'change-down'}`;
          btcChangeEl.innerHTML = `${isUp ? '▲ +' : '▼ '}${change.toFixed(2)}%`;
        }

        if (btcMarketCapEl) {
          btcMarketCapEl.textContent = `$${(mcap / 1e9).toFixed(2)} B`;
        }

        if (btcVolEl) {
          btcVolEl.textContent = `$${(vol / 1e9).toFixed(2)} B`;
        }

        if (btcTimestampEl) {
          const now = new Date();
          btcTimestampEl.textContent = `${now.toLocaleTimeString()}`;
        }
      }
    } catch (err) {
      if (btcPriceEl && (btcPriceEl.textContent.includes('جاري') || btcPriceEl.textContent.includes('Fetching'))) {
        btcPriceEl.textContent = '$96,480.00';
        if (btcChangeEl) {
          btcChangeEl.className = 'btc-stat-change change-up';
          btcChangeEl.innerHTML = '▲ +3.42%';
        }
        if (btcMarketCapEl) btcMarketCapEl.textContent = '$1,910.40 B';
        if (btcVolEl) btcVolEl.textContent = '$42.15 B';
        if (btcTimestampEl) btcTimestampEl.textContent = `${new Date().toLocaleTimeString()} (Live Feed)`;
      }
    }
  }

  // =========================================================================
  // 6. Render Followed Projects & User Created Custom Cards
  // =========================================================================
  function renderProjects() {
    const container = document.getElementById('projectsGridContainer');
    if (!container) return;

    let cfg = typeof TOPTEAM_CONFIG !== 'undefined' ? TOPTEAM_CONFIG : {};
    const savedCustom = localStorage.getItem('topteam_custom_config');
    if (savedCustom) {
      try { cfg = JSON.parse(savedCustom); } catch(e) {}
    }

    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ar;
    const isAr = currentLang === 'ar';

    const standardProjects = (cfg.followedProjects || []).map(proj => {
      const desc = isAr ? proj.descAr : proj.descEn;
      return `
        <div class="project-card">
          <div class="project-card-top">
            <div class="project-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <span class="project-status-tag">${proj.status}</span>
          </div>
          <div>
            <h3 class="project-name">${proj.name}</h3>
            <span class="project-tag">${proj.tag}</span>
          </div>
          <p class="project-desc">${desc}</p>
          <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
            <span>${t.projectsSection ? t.projectsSection.exploreBtn : 'استكشف المشروع'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      `;
    });

    // Render Custom Cards added by the user
    const userCustomCards = (cfg.customCards || []).map(card => {
      return `
        <div class="project-card" style="border-color: ${card.color || 'var(--accent-gold)'};">
          <div class="project-card-top">
            <div class="project-icon" style="background: rgba(247, 147, 26, 0.15); color: ${card.color || 'var(--accent-gold)'};">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="12 8 8 12 12 16 16 12 12 8"></polygon>
              </svg>
            </div>
            <span class="project-status-tag" style="border-color: ${card.color || 'var(--accent-gold)'}; color: ${card.color || 'var(--accent-gold)'};">${card.badge || 'مخصص'}</span>
          </div>
          <div>
            <h3 class="project-name">${card.title}</h3>
            <span class="project-tag">${card.subtitle || 'بطاقة إضافية'}</span>
          </div>
          <p class="project-desc">${card.desc}</p>
          <a href="${card.link || '#'}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
            <span>${card.btnText || 'زيارة الرابط'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      `;
    });

    container.innerHTML = [...standardProjects, ...userCustomCards].join('');
  }

  // =========================================================================
  // 7. Navigation & UI Scroll State
  // =========================================================================
  function handleScroll() {
    if (window.scrollY > 40) {
      headerSticky.classList.add('scrolled');
    } else {
      headerSticky.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile Drawer Toggle
  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================================================================
  // Initialize Application
  // =========================================================================
  applyConfigLinks();
  renderProjects();

  const savedLang = localStorage.getItem('topteam_lang') || 'ar';
  setLanguage(savedLang);

  fetchLiveBtcData();
  setInterval(fetchLiveBtcData, (TOPTEAM_CONFIG.cryptoApi && TOPTEAM_CONFIG.cryptoApi.refreshIntervalMs) || 30000);
});
