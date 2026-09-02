/* ============================================================
   P.K CREATIVE & DIGITAL AGENCY — Interaction & Motion Engine
   Preloader · Smooth Scroll · Custom Cursor · Magnetic Buttons
   Portfolio Filter · Interactive Contact & WhatsApp Generator
   ============================================================ */

(function () {
  'use strict';

  const doc = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     Standard Native Smooth Scrolling for Anchor Links
     ============================================================ */
  function scrollToTarget(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#' || !document.querySelector(hash)) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(hash);
    });
  });

  /* ============================================================
     Scroll reveals + number counters
     ============================================================ */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealIO.unobserve(entry.target);
      if (entry.target.hasAttribute('data-count')) runCounter(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(runCounter);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  function initReveals() {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (!el.classList.contains('is-in')) revealIO.observe(el);
    });
    document.querySelectorAll('[data-count]').forEach((el) => {
      const holder = el.closest('[data-reveal]') || el;
      if (!holder.classList.contains('is-in')) return;
      runCounter(holder);
    });
  }

  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  function runCounter(el) {
    const num = el.querySelector('[data-count]') || el;
    if (num.dataset.counted) return;
    num.dataset.counted = '1';
    const end = parseInt(num.dataset.count, 10) || 0;
    if (reduced) { num.textContent = end; return; }
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      num.textContent = Math.round(end * easeOutExpo(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ============================================================
     Preloader
     ============================================================ */
  const preloader = document.querySelector('.preloader');
  const countEl = document.getElementById('preloaderCount');

  function finishLoading() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    if (preloader) preloader.classList.add('done');
    initReveals();
  }

  if (reduced || !preloader) {
    if (preloader) preloader.remove();
    finishLoading();
  } else {
    const t0 = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const shown = Math.round(100 * easeOutExpo(p));
      if (countEl) countEl.textContent = shown;
      const rule = preloader.querySelector('.preloader__rule');
      if (rule) rule.style.setProperty('--p', (p * 0.98).toFixed(3));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(finishLoading, 150);
    };
    requestAnimationFrame(tick);
    setTimeout(() => {
      if (!document.body.classList.contains('is-loaded')) finishLoading();
    }, 2800);
  }

  /* ============================================================
     Navigation scroll states & active links
     ============================================================ */
  const nav = document.getElementById('nav');
  let lastY = 0;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 30);
      if (!document.body.classList.contains('menu-open')) {
        if (y > 500 && y > lastY + 5) nav.classList.add('nav--hidden');
        else if (y < lastY - 5 || y < 100) nav.classList.remove('nav--hidden');
      }
    }
    lastY = y;
    updateProgress();
    ticking = false;
  }

  const progress = document.querySelector('.progress-bar');
  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* Section link highlighting */
  const navLinks = document.querySelectorAll('.nav__link');
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => sectionIO.observe(s));

  /* ============================================================
     Mobile menu
     ============================================================ */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  function closeMenu() {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    if (burger) {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    }
    if (menu) menu.setAttribute('aria-hidden', 'true');
  }

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = !document.body.classList.contains('menu-open');
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ============================================================
     Custom cursor
     ============================================================ */
  if (finePointer && !reduced) {
    doc.classList.add('has-cursor');
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      const dot = cursor.querySelector('.cursor__dot');
      const ring = cursor.querySelector('.cursor__ring');
      let mx = -100, my = -100, rx = -100, ry = -100;

      window.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      }, { passive: true });

      (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(loop);
      })();

      const hoverSel = 'a, button, [data-cursor], .service-pill-btn, .budget-pill-btn, .filter-btn';
      document.addEventListener('mouseover', (e) => {
        const view = e.target.closest('[data-cursor="view"]');
        const hover = e.target.closest(hoverSel);
        cursor.classList.toggle('cursor--view', !!view);
        cursor.classList.toggle('cursor--hover', !!hover && !view);
      });
      document.addEventListener('mousedown', () => cursor.classList.add('cursor--down'));
      document.addEventListener('mouseup', () => cursor.classList.remove('cursor--down'));
      document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
      document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
    }
  }

  /* ============================================================
     Magnetic buttons
     ============================================================ */
  if (finePointer && !reduced) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = 0.25;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transition = 'transform .1s ease-out';
        el.style.transform = 'translate(' + dx * strength + 'px,' + dy * strength + 'px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)';
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ============================================================
     Portfolio Filter Tabs
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'opacity .3s var(--ease-out), transform .3s var(--ease-out)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ============================================================
     Interactive Contact Form & Dynamic WhatsApp Generator
     ============================================================ */
  const servicePillBtns = document.querySelectorAll('.service-pill-btn');
  const budgetPillBtns = document.querySelectorAll('.budget-pill-btn');
  const projectForm = document.getElementById('projectForm');
  const formMsg = document.getElementById('formMsg');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const directWhatsApp = document.getElementById('directWhatsApp');

  // Toggle service selection (multi-select)
  servicePillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateWhatsAppLink();
    });
  });

  // Toggle budget selection (single select)
  budgetPillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      budgetPillBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateWhatsAppLink();
    });
  });

  function getSelectedServices() {
    const selected = [];
    document.querySelectorAll('.service-pill-btn.active').forEach((btn) => {
      selected.push(btn.getAttribute('data-service'));
    });
    return selected.length > 0 ? selected : ['Full-Stack Growth Sprint'];
  }

  function getSelectedBudget() {
    const active = document.querySelector('.budget-pill-btn.active');
    return active ? active.getAttribute('data-budget') : '₹50,000 - ₹2 Lakhs';
  }

  function generateWhatsAppText() {
    const name = (document.getElementById('clientName')?.value || '').trim() || 'Founder';
    const business = (document.getElementById('clientBusiness')?.value || '').trim() || 'My Business';
    const services = getSelectedServices().join(', ');
    const budget = getSelectedBudget();
    const notes = (document.getElementById('clientNotes')?.value || '').trim();

    let text = `Hi PK Agency team! 👋\n\nI'm *${name}* from *${business}*.\n\n🎯 *Services Needed:* ${services}\n💰 *Budget Range:* ${budget}`;
    if (notes) {
      text += `\n📝 *Project Notes:* ${notes}`;
    }
    text += `\n\nI would love to schedule a strategy call!`;
    return encodeURIComponent(text);
  }

  function updateWhatsAppLink() {
    const url = 'https://wa.me/919876543210?text=' + generateWhatsAppText();
    if (directWhatsApp) directWhatsApp.setAttribute('href', url);
  }

  // Update on input changes
  ['clientName', 'clientBusiness', 'clientNotes'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateWhatsAppLink);
  });

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const url = 'https://wa.me/919876543210?text=' + generateWhatsAppText();
      window.open(url, '_blank');
    });
  }

  if (projectForm && formMsg) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('clientName')?.value || '').trim();
      const email = (document.getElementById('clientEmail')?.value || '').trim();
      const phone = (document.getElementById('clientPhone')?.value || '').trim();
      const business = (document.getElementById('clientBusiness')?.value || '').trim();

      if (!name || !email || !phone || !business) {
        formMsg.textContent = 'Please fill out all required fields marked with *.';
        formMsg.style.color = '#C10E15';
        return;
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailValid) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.style.color = '#C10E15';
        return;
      }

      formMsg.textContent = 'Thank you ' + name + '! Your brief has been received. A senior partner will contact you within 2 hours.';
      formMsg.style.color = 'var(--brand-red)';

      // Auto trigger WhatsApp option popup after 1s
      setTimeout(() => {
        const ok = confirm('Brief submitted! Would you also like to open WhatsApp to connect directly with the team right now?');
        if (ok) {
          window.open('https://wa.me/919876543210?text=' + generateWhatsAppText(), '_blank');
        }
      }, 800);

      projectForm.reset();
      servicePillBtns.forEach((b, i) => b.classList.toggle('active', i === 0));
      budgetPillBtns.forEach((b, i) => b.classList.toggle('active', i === 1));
    });
  }

  /* ============================================================
     Newsletter
     ============================================================ */
  const newsletterForm = document.getElementById('newsletter');
  const newsletterMsg = document.getElementById('newsletterMsg');
  if (newsletterForm && newsletterMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const value = (input.value || '').trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      newsletterMsg.textContent = ok
        ? 'You\u2019re subscribed to The Growth Wire. Welcome! \u2726'
        : 'Please enter a valid email address.';
      newsletterMsg.style.color = ok ? 'var(--brand-red)' : '#C10E15';
      if (ok) input.value = '';
    });
  }
})();
