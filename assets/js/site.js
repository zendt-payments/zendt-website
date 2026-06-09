/**
 * Zendt Payments — shared site interactions
 */
(() => {
  'use strict';

  const root = document.documentElement;
  /* Replace URL in assets/js/form-config.js after deploying google-apps-script.gs */
  const SHEET_ENDPOINT = window.ZENDT_FORM_ENDPOINT || '';

  const postToSheet = async (fields) => {
    if (!SHEET_ENDPOINT) {
      throw new Error('Form endpoint not configured');
    }

    const payload = new URLSearchParams({
      ...fields,
      submitted_at: new Date().toISOString(),
    });

    const res = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      body: payload,
      redirect: 'follow',
    });

    const text = (await res.text()).trim();
    if (text === 'ok') return;

    if (text.startsWith('error:')) {
      throw new Error(text.slice(6).trim());
    }

    throw new Error(text || 'Submit failed');
  };

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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navHeight = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) ? parsed : 68;
  };

  /* ---------- Staggered child reveals ---------- */
  if (!prefersReducedMotion) {
    [
      { parent: '.steps', child: '.step' },
      { parent: '.features', child: '.feature' },
      { parent: '.ctable-mobile', child: '.ctable-mobile__card' },
    ].forEach(({ parent, child }) => {
      document.querySelectorAll(parent).forEach((container) => {
        const items = container.querySelectorAll(child);
        if (!items.length) return;
        container.classList.remove('reveal', 'in', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6');
        items.forEach((item, i) => {
          item.classList.add('reveal');
          if (i > 0) item.classList.add(`d${Math.min(i, 6)}`);
        });
      });
    });
  }

  /* ---------- Smooth anchor scroll (fixed nav offset) ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight() - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.pushState(null, '', hash);
  });

  /* ---------- Reveal on scroll ---------- */
  document.body.classList.add('js-ready');

  const revealInView = (el, vh) => {
    const r = el.getBoundingClientRect();
    return r.top < vh + 120 && r.bottom > -80;
  };

  const revealVisible = () => {
    const vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
      if (revealInView(el, vh)) el.classList.add('in');
    });
  };

  const revealAll = () => {
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
  };

  revealVisible();
  requestAnimationFrame(revealVisible);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 10% 0px' }
  );
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));

  let revealTick = false;
  window.addEventListener(
    'scroll',
    () => {
      if (revealTick) return;
      revealTick = true;
      requestAnimationFrame(() => {
        revealVisible();
        revealTick = false;
      });
    },
    { passive: true }
  );

  window.addEventListener('resize', revealVisible, { passive: true });

  setTimeout(revealVisible, 400);
  setTimeout(revealVisible, 1500);
  setTimeout(revealAll, 3500);

  /* ---------- Active section in nav ---------- */
  const spyLinks = Array.from(document.querySelectorAll('.nav__links a[href^="#"]')).filter(
    (a) => a.getAttribute('href').length > 1
  );
  const homeLink = document.querySelector('.nav__links a[href="#top"]');

  if (spyLinks.length || homeLink) {
    const sections = spyLinks
      .map((a) => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        return el ? { id, el, link: a } : null;
      })
      .filter(Boolean);

    const setActiveNav = () => {
      const offset = navHeight() + 48;
      if (homeLink && window.scrollY < 120) {
        spyLinks.forEach((a) => a.classList.remove('is-active'));
        homeLink.classList.add('is-active');
        return;
      }
      let current = sections[0]?.id;
      sections.forEach(({ id, el }) => {
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      });
      if (homeLink) homeLink.classList.remove('is-active');
      spyLinks.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
      });
    };

    let spyTick = false;
    window.addEventListener(
      'scroll',
      () => {
        if (spyTick) return;
        spyTick = true;
        requestAnimationFrame(() => {
          setActiveNav();
          spyTick = false;
        });
      },
      { passive: true }
    );
    setActiveNav();
  }

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
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-count], [data-num]').forEach((el) => {
    countIO.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countUp(el);
      countIO.unobserve(el);
    }
  });

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
  const MENU_ANIM_MS = 360;
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
    let closeTimer = null;

    const finishCloseNav = () => {
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (panel._returnTo) {
        panel._returnTo.appendChild(panel);
        panel._returnTo = null;
      }
      window.scrollTo(0, menuScrollY);
    };

    const closeNav = () => {
      if (!navEl.classList.contains('is-open')) return;
      navEl.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menu');
      if (closeTimer) window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        closeTimer = null;
        finishCloseNav();
      }, MENU_ANIM_MS);
    };

    const openNav = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      menuScrollY = window.scrollY;
      if (window.innerWidth <= MOBILE_NAV_BP && panel.parentElement !== document.body) {
        panel._returnTo = panel.parentElement;
        document.body.appendChild(panel);
      }
      document.body.classList.add('menu-open');
      document.body.style.top = `-${menuScrollY}px`;
      requestAnimationFrame(() => {
        navEl.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
      });
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
    let closeTimer = null;

    const finishCloseNav = () => {
      document.body.classList.remove('menu-open');
      document.body.style.top = '';
      if (navLinks._returnTo) {
        navLinks._returnTo.appendChild(navLinks);
        navLinks._returnTo = null;
      }
      window.scrollTo(0, menuScrollY);
    };

    const closeNav = () => {
      if (!navLinks.classList.contains('is-open')) return;
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      if (closeTimer) window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        closeTimer = null;
        finishCloseNav();
      }, MENU_ANIM_MS);
    };

    const openNav = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
      menuScrollY = window.scrollY;
      if (window.innerWidth <= 720 && navLinks.parentElement !== document.body) {
        navLinks._returnTo = navLinks.parentElement;
        document.body.appendChild(navLinks);
      }
      document.body.classList.add('menu-open');
      document.body.style.top = `-${menuScrollY}px`;
      requestAnimationFrame(() => {
        navLinks.classList.add('is-open');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close menu');
      });
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

    form.addEventListener('submit', async (e) => {
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
        await postToSheet({ email, source: 'waitlist' });
        localStorage.setItem('zendt-waitlist', '1');
        showSuccess();
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = defaultBtnHtml;
        }
        if (errorEl) {
          errorEl.textContent =
            err.message === 'Form endpoint not configured'
              ? 'Waitlist is not connected yet. Email hello@zendtpayments.com to join.'
              : 'Something went wrong. Please try again or email hello@zendtpayments.com.';
          errorEl.style.display = 'block';
        }
      }
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successEl = document.getElementById('formSuccess');
    const errorEl = document.getElementById('cfError');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const defaultBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const showContactSuccess = () => {
      contactForm.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';
      if (successEl) successEl.style.display = 'flex';
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('cf-name')?.value || '').trim();
      const email = (document.getElementById('cf-email')?.value || '').trim();
      const topic = (document.getElementById('cf-topic')?.value || '').trim();
      const message = (document.getElementById('cf-message')?.value || '').trim();
      const validEmail = /^\S+@\S+\.\S+$/.test(email);

      if (!name || !validEmail || !message) {
        if (errorEl) {
          errorEl.textContent = 'Please fill in your name, a valid email, and a message.';
          errorEl.style.display = 'block';
        }
        return;
      }

      if (errorEl) errorEl.style.display = 'none';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        await postToSheet({
          source: 'contact',
          name,
          email,
          topic,
          message,
        });
        showContactSuccess();
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = defaultBtnHtml;
        }
        if (errorEl) {
          const msg = String(err.message || err);
          errorEl.textContent =
            err.message === 'Form endpoint not configured'
              ? 'Contact form is not connected yet. Email zendtpayments@gmail.com directly.'
              : msg.includes('MailApp.sendEmail') || msg.includes('script.send_mail')
                ? 'Contact form saved, but email is not authorized yet. The site owner must run testContactEmail() in Apps Script once, then redeploy.'
                : 'Could not send your message. Please try again or email zendtpayments@gmail.com.';
          errorEl.style.display = 'block';
        }
      }
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
    const intlNote = document.getElementById('calcIntlNote');
    if (!seg || !amtInput) return;

    const calcRoot = seg.closest('.calc');
    let mode = 'dom';

    if (!seg.querySelector('.calc__seg-thumb')) {
      const thumb = document.createElement('span');
      thumb.className = 'calc__seg-thumb';
      thumb.setAttribute('aria-hidden', 'true');
      seg.insertBefore(thumb, seg.firstChild);
    }
    const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
    const parseAmt = (v) => parseFloat(String(v).replace(/,/g, '')) || 0;

    const methodRate = (amountInr) => {
      if (!methodSel) return 0.006;
      const v = methodSel.value;
      if (v === 'debit') return amountInr < 2000 ? 0.015 : 0.019;
      return parseFloat(v);
    };

    const methodPct = (amountInr) => {
      if (!methodSel) return '0.6%';
      const v = methodSel.value;
      if (v === 'debit') return amountInr < 2000 ? '1.5%' : '1.9%';
      return (parseFloat(v) * 100).toFixed(1).replace(/\.0$/, '') + '%';
    };

    const recalc = () => {
      const raw = amtInput.value.trim();
      const isIntl = mode === 'intl';

      if (mode === 'intl') {
        const opt = curSel.options[curSel.selectedIndex];
        const rate = parseFloat(curSel.value);
        if (rateLine) {
          rateLine.textContent =
            'at ₹' + rate.toFixed(2) + ' / ' + opt.textContent + ' · mid-market';
        }
        if (grossLabel) grossLabel.textContent = 'Gross (in INR)';
        if (feeLabel) feeLabel.textContent = 'Platform fee (4%)';
      } else {
        if (rateLine) rateLine.textContent = 'Settles T+1 to your INR account';
        if (grossLabel) grossLabel.textContent = 'Amount charged';
        if (feeLabel) feeLabel.textContent = 'Platform fee (' + methodPct(parseAmt(raw)) + ')';
      }

      if (!raw) {
        if (out) out.textContent = '₹0';
        if (grossEl) grossEl.textContent = '₹0';
        if (feeEl) feeEl.textContent = '₹0';
        if (gstEl) gstEl.textContent = '₹0';
        return;
      }

      const amt = parseAmt(raw);
      let gross;
      if (isIntl) {
        gross = amt * parseFloat(curSel.value);
      } else {
        gross = amt;
      }
      const feeR = isIntl ? 0.04 : methodRate(amt);
      const fee = gross * feeR;
      const gst = fee * 0.18;
      const net = gross - fee - gst;

      if (out) out.textContent = inr(net);
      if (grossEl) grossEl.textContent = inr(gross);
      if (feeEl) feeEl.textContent = '−' + inr(fee);
      if (gstEl) gstEl.textContent = '−' + inr(gst);

      if (!isIntl && feeLabel) {
        feeLabel.textContent = 'Platform fee (' + methodPct(amt) + ')';
      }
    };

    const setMode = (m) => {
      mode = m;
      const isIntl = mode === 'intl';
      seg.querySelectorAll('button').forEach((b) => {
        const active = b.dataset.mode === m;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (calcRoot) calcRoot.classList.toggle('calc--intl', isIntl);
      if (amtLabel) amtLabel.textContent = isIntl ? 'Amount received' : 'Amount (INR)';
      recalc();
    };

    seg.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.mode === mode) return;
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
