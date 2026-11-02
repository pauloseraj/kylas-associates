(() => {
  const byId = (id) => document.getElementById(id);

  // Responsive navigation
  const menuButton = byId('menuToggle');
  const mainNav = byId('mainNav');
  if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Highlight the current page in the navigation.
  const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('href').split('#')[0].split('/').pop() || 'index.html';
    if (target === currentFile) link.setAttribute('aria-current', 'page');
  });

  // Mandatory first-visit disclaimer acknowledgement.
  const overlay = byId('disclaimerOverlay');
  const agreeButton = byId('agreeDisclaimer');
  const exitButton = byId('exitDisclaimer');
  const acceptedKey = 'kylas-associates-disclaimer-accepted-v1';
  const hasAccepted = () => {
    try { return window.localStorage.getItem(acceptedKey) === 'yes'; }
    catch (error) { return false; }
  };
  const saveAcceptance = () => {
    try { window.localStorage.setItem(acceptedKey, 'yes'); }
    catch (error) { /* The disclaimer still closes for this page view. */ }
  };
  if (overlay && !hasAccepted()) {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (agreeButton) agreeButton.focus();
  }
  if (agreeButton && overlay) {
    agreeButton.addEventListener('click', () => {
      saveAcceptance();
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    });
  }
  if (exitButton) {
    exitButton.addEventListener('click', () => {
      window.location.replace('about:blank');
    });
  }
  if (overlay) {
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        // The entry disclaimer is mandatory; Escape must not bypass it.
        event.preventDefault();
        return;
      }
      if (event.key !== 'Tab' || !overlay.classList.contains('active')) return;
      const focusable = overlay.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // FAQ accordion. Multiple questions may remain open to support scanning.
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // A static GitHub Pages site has no form-processing server. This creates a
  // pre-addressed email for the visitor to review and send from their own mail app.
  const enquiryForm = byId('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!enquiryForm.reportValidity()) return;
      const data = new FormData(enquiryForm);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const office = String(data.get('office') || '').trim();
      const subject = String(data.get('subject') || 'Website enquiry').trim();
      const message = String(data.get('message') || '').trim();
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Preferred office: ${office || 'Not specified'}`,
        '', 'Message:', message,
        '', 'This enquiry was prepared through the Kylas Associates website.'
      ].join('\n');
      const mailto = `mailto:kylasernakulam@gmail.com,kylasachuth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = byId('formStatus');
      if (status) status.textContent = 'Your email application will open with the enquiry details. Review the message and send it from your email account.';
      window.location.href = mailto;
    });
  }

  // Back-to-top affordance
  const backTop = byId('backTop');
  if (backTop) {
    const toggleBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', toggleBackTop, { passive: true });
    toggleBackTop();
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();
