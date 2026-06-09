/**
 * Zendt Payments — shared site interactions
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const SHEET_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbwdbLBVV1lukC1Kf7d8WS3SaVD0Q9OqsEG70lHSysOVyqP5yYh1p_jDALsJbT2UiB_1pg/exec';

  const FX_PAIRS = [
    { code: 'USD', label: 'USD/INR' },
    { code: 'GBP', label: 'GBP/INR' },
    { code: 'AED', label: 'AED/INR' },
    { code: 'EUR', label: 'EUR/INR' },
    { code: 'AUD', label: 'AUD/INR' },
    { code: 'CAD', label: 'CAD/INR' },
    { code: 'QAR', label: 'QAR/INR' },
    { code: 'SGD', label: 'SGD/INR' },
    { code: 'SAR', label: 'SAR/INR' },
    { code: 'CHF', label: 'CHF/INR' },
  ];

  /* ---------- Nav scroll ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Theme toggle ---------- */
  const themeBtn = document.getElementById('themeToggle');
  if (localStorage.getItem('zendt-theme') === 'light') {
    root.setAttribute('data-theme', 'light');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('zendt-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('zendt-theme', 'light');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  document.body.classList.add('js-ready');

  const revealVisible = () => {
    const vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  };
  revealVisible();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
    });
  }, 1500);

  /* ---------- Count-up ---------- */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count || el.dataset.num || '0');
    const suffix = el.dataset.suffix || '';
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      const display =
        target >= 100
          ? Math.round(val)
          : target % 1 === 0
            ? Math.round(val)
            : val.toFixed(1);
      el.textContent = display + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(e.target);
          countIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-count], [data-num]').forEach((el) => countIO.observe(el));

  /* ---------- Pricing bars ---------- */
  const barIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const fill = parseFloat(e.target.dataset.fill);
          e.target.style.width = fill + '%';
          barIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.bar-fill').forEach((el) => barIO.observe(el));

  /* ---------- Mobile nav (navToggle + nav__mobile, or legacy hamburger) ---------- */
  const MOBILE_NAV_BP = 820;
  const navEl = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  const bindMobileNav = ({ isOpen, open, close }) => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) close();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_NAV_BP && isOpen()) close();
    });
  };

  if (navEl && navToggle) {
    let panel = navEl.querySelector('.nav__mobile');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'nav__mobile';
      panel.id = 'navMobile';
      document.querySelectorAll('.nav__links a').forEach((a) => {
        panel.appendChild(a.cloneNode(true));
      });
      const cta = document.createElement('a');
      cta.className = 'btn btn--primary';
      cta.href =
        document.querySelector('.nav__right .btn--primary')?.getAttribute('href') ||
        'index.html#waitlist';
      cta.innerHTML =
        'Get Early Access <span class="btn__arrow" aria-hidden="true">→</span>';
      panel.appendChild(cta);
      navEl.appendChild(panel);
    }

    let menuScrollY = 0;

    const closeNav = () => {
      navEl.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menu');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (panel._returnTo) {
        panel._returnTo.appendChild(panel);
        panel._returnTo = null;
      }
      window.scrollTo(0, menuScrollY);
    };

    const openNav = () => {
      menuScrollY = window.scrollY;
      if (window.innerWidth <= MOBILE_NAV_BP && panel.parentElement !== document.body) {
        panel._returnTo = panel.parentElement;
        document.body.appendChild(panel);
      }
      navEl.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${menuScrollY}px`;
    };

    navToggle.addEventListener('click', () => {
      if (navEl.classList.contains('is-open')) closeNav();
      else openNav();
    });

    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));

    bindMobileNav({
      isOpen: () => navEl.classList.contains('is-open'),
      open: openNav,
      close: closeNav,
    });
  } else if (hamburger && navLinks) {
    let menuScrollY = 0;

    const closeNav = () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (navLinks._returnTo) {
        navLinks._returnTo.appendChild(navLinks);
        navLinks._returnTo = null;
      }
      window.scrollTo(0, menuScrollY);
    };

    const openNav = () => {
      menuScrollY = window.scrollY;
      if (window.innerWidth <= 720 && navLinks.parentElement !== document.body) {
        navLinks._returnTo = navLinks.parentElement;
        document.body.appendChild(navLinks);
      }
      navLinks.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${menuScrollY}px`;
    };

    hamburger.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) closeNav();
      else openNav();
    });

    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));

    bindMobileNav({
      isOpen: () => navLinks.classList.contains('is-open'),
      open: openNav,
      close: closeNav,
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__question').forEach((btn) => {
    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq__question').forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        const ans = document.getElementById(b.getAttribute('aria-controls'));
        if (ans) ans.classList.remove('is-open');
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const ans = document.getElementById(btn.getAttribute('aria-controls'));
        if (ans) ans.classList.add('is-open');
      }
    };
    btn.addEventListener('click', toggle);
  });

  /* ---------- Waitlist form ---------- */
  const form = document.getElementById('wlForm');
  if (form) {
    const emailInput = document.getElementById('wlEmail');
    const successEl = document.getElementById('wlSuccess');
    const errorEl = document.getElementById('wlError');
    const submitBtn = form.querySelector('button[type="submit"]');
    const defaultBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const showSuccess = () => {
      form.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';
      if (successEl) successEl.style.display = 'flex';
    };

    if (localStorage.getItem('zendt-waitlist') === '1') {
      showSuccess();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : '';
      const valid = /^\S+@\S+\.\S+$/.test(email);

      if (!valid) {
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.style.display = 'block';
        }
        if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
        return;
      }

      if (errorEl) errorEl.style.display = 'none';
      if (emailInput) emailInput.removeAttribute('aria-invalid');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting…';
      }

      try {
        const iframe = document.createElement('iframe');
        iframe.name = 'wl-target';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = SHEET_ENDPOINT;
        hiddenForm.target = 'wl-target';
        hiddenForm.style.display = 'none';

        [['email', email], ['source', 'waitlist']].forEach(([name, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          hiddenForm.appendChild(input);
        });

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        setTimeout(() => {
          document.body.removeChild(hiddenForm);
          document.body.removeChild(iframe);
        }, 5000);
      } catch (_) {
        /* still show success — sheet may have received it */
      }

      localStorage.setItem('zendt-waitlist', '1');
      showSuccess();
    });
  }

  /* ---------- Fee calculator (pricing page) ---------- */
  const calcAmount = document.getElementById('calcAmount');
  const calcType = document.getElementById('calcType');
  if (calcAmount && calcType) {
    const calcFee = document.getElementById('calcFee');
    const calcGst = document.getElementById('calcGst');
    const calcTotal = document.getElementById('calcTotal');
    const calcKeep = document.getElementById('calcKeep');

    const updateCalc = () => {
      const amount = Math.max(0, parseFloat(calcAmount.value) || 0);
      const isIntl = calcType.value === 'international';
      const rate = isIntl ? 0.04 : 0.006;
      const fee = amount * rate;
      const gst = fee * 0.18;
      const total = fee + gst;
      const keep = amount - total;

      const fmt = (n) =>
        '₹' +
        n.toLocaleString('en-IN', {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        });

      if (calcFee) calcFee.textContent = fmt(fee);
      if (calcGst) calcGst.textContent = fmt(gst);
      if (calcTotal) calcTotal.textContent = fmt(total);
      if (calcKeep) calcKeep.textContent = fmt(keep);
    };

    calcAmount.addEventListener('input', updateCalc);
    calcType.addEventListener('change', updateCalc);
    updateCalc();
  }

  /* ---------- Live FX ticker ---------- */
  const tickerTrack = document.getElementById('fxTicker');
  if (tickerTrack) {
    const formatRate = (n) => n.toFixed(2);

    const buildItems = (rates) => {
      const items = FX_PAIRS.map(({ code, label }) => {
        const rate = rates[code];
        if (!rate) return '';
        return `<span class="ticker__item" data-pair="${label}"><b>${label}</b> ${formatRate(rate)} <span class="dot"></span></span>`;
      }).filter(Boolean);
      return items.length ? items.join('') + items.join('') : null;
    };

    const fetchRates = async () => {
      try {
        const results = await Promise.all(
          FX_PAIRS.map(async ({ code }) => {
            const res = await fetch(
              `https://api.frankfurter.app/latest?from=${code}&to=INR`
            );
            if (!res.ok) return null;
            const data = await res.json();
            return { code, rate: data.rates?.INR };
          })
        );
        const rates = {};
        results.forEach((r) => {
          if (r?.rate) rates[r.code] = r.rate;
        });
        const html = buildItems(rates);
        if (html) tickerTrack.innerHTML = html;
      } catch (_) {
        /* keep static fallback rates in HTML */
      }
    };

    fetchRates();
    setInterval(fetchRates, 5 * 60 * 1000);
  }

  /* ---------- Receive calculator (index + pricing) ---------- */
  (() => {
    const seg = document.getElementById('calcSeg');
    const curSel = document.getElementById('calcCur');
    const inrTag = document.getElementById('calcInr');
    const amtInput = document.getElementById('calcAmt');
    const methodField = document.getElementById('calcMethodField');
    const methodSel = document.getElementById('calcMethod');
    const amtLabel = document.getElementById('calcAmtLabel');
    const out = document.getElementById('calcOut');
    const rateLine = document.getElementById('calcRate');
    const grossLabel = document.getElementById('calcGrossLabel');
    const grossEl = document.getElementById('calcGross');
    const feeLabel = document.getElementById('calcFeeLabel');
    const feeEl = document.getElementById('calcFee');
    const gstEl = document.getElementById('calcGst');
    if (!seg || !amtInput) return;

    let mode = 'dom';
    const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
    const parseAmt = (v) => parseFloat(String(v).replace(/,/g, '')) || 0;

    const methodRate = (amountInr) => {
      const v = methodSel.value;
      if (v === 'debit') return amountInr < 2000 ? 0.015 : 0.019;
      return parseFloat(v);
    };

    const methodPct = (amountInr) => {
      const v = methodSel.value;
      if (v === 'debit') return amountInr < 2000 ? '1.5%' : '1.9%';
      return (parseFloat(v) * 100).toFixed(1).replace(/\.0$/, '') + '%';
    };

    const recalc = () => {
      const amt = parseAmt(amtInput.value);
      let gross;
      let rate;
      if (mode === 'intl') {
        rate = parseFloat(curSel.value);
        gross = amt * rate;
      } else {
        rate = 1;
        gross = amt;
      }
      const feeR = mode === 'intl' ? 0.04 : methodRate(amt);
      const fee = gross * feeR;
      const gst = fee * 0.18;
      const net = gross - fee - gst;

      if (out) out.textContent = inr(net);
      if (grossEl) grossEl.textContent = inr(gross);
      if (feeEl) feeEl.textContent = '−' + inr(fee);
      if (gstEl) gstEl.textContent = '−' + inr(gst);

      if (mode === 'intl') {
        const opt = curSel.options[curSel.selectedIndex];
        if (rateLine) {
          rateLine.textContent =
            'at ₹' + rate.toFixed(2) + ' / ' + opt.textContent + ' · indicative mid-market';
        }
        if (grossLabel) grossLabel.textContent = 'Gross (in INR)';
        if (feeLabel) feeLabel.textContent = 'Platform fee (4%)';
      } else {
        if (rateLine) rateLine.textContent = 'Settles T+1 to your INR account';
        if (grossLabel) grossLabel.textContent = 'Amount charged';
        if (feeLabel) feeLabel.textContent = 'Platform fee (' + methodPct(amt) + ')';
      }
    };

    const setMode = (m) => {
      mode = m;
      const isIntl = mode === 'intl';
      seg.querySelectorAll('button').forEach((b) => {
        b.classList.toggle('is-active', b.dataset.mode === m);
      });
      if (curSel) curSel.style.display = isIntl ? '' : 'none';
      if (inrTag) inrTag.style.display = isIntl ? 'none' : '';
      if (methodField) methodField.style.display = isIntl ? 'none' : 'flex';
      if (amtLabel) amtLabel.textContent = isIntl ? 'Amount received' : 'Amount (INR)';
      recalc();
    };

    seg.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.mode === mode) return;
        const cur = parseAmt(amtInput.value);
        if (btn.dataset.mode === 'dom' && cur < 1000) amtInput.value = '50,000';
        if (btn.dataset.mode === 'intl' && cur >= 20000) amtInput.value = '3,000';
        setMode(btn.dataset.mode);
      });
    });

    amtInput.addEventListener('input', recalc);
    amtInput.addEventListener('blur', () => {
      const n = parseAmt(amtInput.value);
      if (n) amtInput.value = n.toLocaleString('en-IN');
    });
    if (curSel) curSel.addEventListener('change', recalc);
    if (methodSel) methodSel.addEventListener('change', recalc);
    setMode('dom');
  })();

  /* ---------- Anchor offset for fixed nav ---------- */
  if (window.location.hash) {
    requestAnimationFrame(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const offset = (nav ? nav.offsetHeight : 68) + 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
})();
