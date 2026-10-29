(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Header: border once the page scrolls ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() { header.classList.toggle('is-stuck', window.scrollY > 8); }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Security-print rosette (guilloche) ---------- */
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function hypotrochoid(R, r, d, radius, points) {
    var turns = r / gcd(R, r), maxR = (R - r) + d, k = radius / maxR, out = '';
    for (var i = 0; i <= points; i++) {
      var t = (i / points) * Math.PI * 2 * turns;
      var x = ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)) * k;
      var y = ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)) * k;
      out += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return out + 'Z';
  }
  function buildRosette() {
    var svg = document.getElementById('rosette');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var layers = [
      { id: 'rg-a', R: 11, r: 4, d: 5.2, radius: 290, points: 330, copies: 20, sw: .5 },
      { id: 'rg-b', R: 7, r: 3, d: 2.6, radius: 205, points: 240, copies: 16, sw: .6 },
      { id: 'rg-c', R: 5, r: 2, d: 1.8, radius: 120, points: 160, copies: 12, sw: .7 }
    ];
    var defs = document.createElementNS(NS, 'defs');
    layers.forEach(function (l) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('id', l.id);
      p.setAttribute('d', hypotrochoid(l.R, l.r, l.d, l.radius, l.points));
      p.setAttribute('pathLength', '1');
      defs.appendChild(p);
    });
    svg.appendChild(defs);

    var spin = document.createElementNS(NS, 'g');
    spin.setAttribute('class', 'spin');
    var n = 0;
    layers.forEach(function (l) {
      var g = document.createElementNS(NS, 'g');
      g.setAttribute('style', 'stroke-width:' + l.sw);
      for (var i = 0; i < l.copies; i++) {
        var u = document.createElementNS(NS, 'use');
        u.setAttribute('href', '#' + l.id);
        u.setAttribute('transform', 'rotate(' + ((360 / l.copies) * i).toFixed(2) + ')');
        u.setAttribute('style', '--i:' + (n++ % 24));
        g.appendChild(u);
      }
      spin.appendChild(g);
    });
    [296, 298.5].forEach(function (rad) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('r', rad);
      spin.appendChild(c);
    });
    svg.appendChild(spin);
  }
  buildRosette();

  /* ---------- Bar Council notice, then the hero sequence ---------- */
  var modal = document.getElementById('disclaimer');
  var agree = document.getElementById('disc-agree');
  var started = false;
  function start() {
    if (started) return;
    started = true;
    requestAnimationFrame(function () { root.classList.add('go'); });
  }
  var accepted = false;
  try { accepted = sessionStorage.getItem('disclaimerAccepted') === '1'; } catch (e) {}
  if (accepted) {
    start();
  } else {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    agree.focus();
    modal.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); agree.focus(); } });
    agree.addEventListener('click', function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      try { sessionStorage.setItem('disclaimerAccepted', '1'); } catch (e) {}
      start();
    });
  }

  /* ---------- Practice areas: one open at a time ---------- */
  var items = document.querySelectorAll('.docket-item');
  items.forEach(function (item) {
    var btn = item.querySelector('.docket-toggle');
    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');
      items.forEach(function (o) {
        o.classList.remove('is-open');
        o.querySelector('.docket-toggle').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Process timeline: line draws as you scroll ---------- */
  var steps = document.getElementById('steps');
  if (steps) {
    var stepEls = steps.querySelectorAll('.step');
    var ticking = false;
    var update = function () {
      ticking = false;
      if (reduce) {
        steps.style.setProperty('--p', 1);
        stepEls.forEach(function (s) { s.classList.add('is-on'); });
        return;
      }
      var rect = steps.getBoundingClientRect();
      var mark = window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
      steps.style.setProperty('--p', p.toFixed(3));
      stepEls.forEach(function (s) {
        s.classList.toggle('is-on', s.getBoundingClientRect().top < mark);
      });
    };
    var request = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  }

  /* ---------- Contact form (Formspree) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.className = 'err';
      status.textContent = 'The form is not connected yet. Add a Formspree form ID in index.html (see README).';
      return;
    }
    status.className = '';
    status.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('failed');
        status.className = 'ok';
        status.textContent = 'Enquiry sent. We will reply soon.';
        form.reset();
      })
      .catch(function () {
        status.className = 'err';
        status.textContent = 'The enquiry did not send. Please call or email us instead.';
      });
  });
})();
