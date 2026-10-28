(function () {
  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Bar Council disclaimer (once per browser session)
  var modal = document.getElementById('disclaimer');
  var agreed = false;
  try { agreed = sessionStorage.getItem('disclaimerAccepted') === '1'; } catch (e) {}
  if (!agreed) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('disc-agree').addEventListener('click', function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      try { sessionStorage.setItem('disclaimerAccepted', '1'); } catch (e) {}
    });
  }

  // Contact form (Formspree)
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      e.preventDefault();
      status.className = 'err';
      status.textContent = 'Form is not configured yet. Add your Formspree form ID (see README).';
      return;
    }
    e.preventDefault();
    status.className = '';
    status.textContent = 'Sending…';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (r) {
      if (r.ok) {
        status.className = 'ok';
        status.textContent = 'Thanks for submitting! We will get back to you soon.';
        form.reset();
      } else {
        throw new Error('failed');
      }
    }).catch(function () {
      status.className = 'err';
      status.textContent = 'Something went wrong. Please email or call us directly.';
    });
  });
})();
