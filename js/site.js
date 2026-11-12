// Progressive enhancement for schero94.github.io. Every feature here is
// optional: without this file the pages read and link the same way.
(function () {
  'use strict';
  var doc = document.documentElement;
  var lang = doc.lang === 'de' ? 'de' : 'en';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* mobile menu: a disclosure that covers the page, traps focus and closes on Escape */
  var bar = $('.bar');
  var menuBtn = $('.menu-btn');
  var nav = $('#site-nav');
  if (bar && menuBtn && nav) {
    var mq = window.matchMedia('(max-width: 900px)');
    var label = menuBtn.querySelector('.menu-label');
    var setOpen = function (open, focusBack) {
      bar.classList.toggle('open', open);
      doc.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      label.textContent = menuBtn.getAttribute(open ? 'data-close' : 'data-open');
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus();
      } else if (focusBack) {
        menuBtn.focus();
      }
    };
    menuBtn.addEventListener('click', function () {
      setOpen(!bar.classList.contains('open'), true);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (!bar.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false, true);
        return;
      }
      if (e.key !== 'Tab') return;
      // Focus stays inside the open menu: its links, the theme toggle and the close button.
      var stops = $$('#site-nav a, .bar-tools button');
      var i = stops.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) {
        e.preventDefault();
        stops[stops.length - 1].focus();
      } else if (!e.shiftKey && i === stops.length - 1) {
        e.preventDefault();
        stops[0].focus();
      }
    });
    var onMq = function () { if (!mq.matches) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    // On the home page the header turns solid once the hero scrolls under it.
    var solid = function () { bar.classList.toggle('solid', window.scrollY > 24); };
    window.addEventListener('scroll', solid, { passive: true });
    solid();
  }

  /* theme toggle */
  var toggle = $('.theme-toggle');
  function effectiveTheme() {
    var set = doc.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function labelToggle() {
    if (!toggle) return;
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    var words = lang === 'de'
      ? { light: 'Zum hellen Farbschema wechseln', dark: 'Zum dunklen Farbschema wechseln' }
      : { light: 'Switch to the light theme', dark: 'Switch to the dark theme' };
    toggle.setAttribute('aria-label', words[next]);
    toggle.removeAttribute('aria-pressed');
  }
  if (toggle) {
    labelToggle();
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* not stored */ }
      labelToggle();
    });
  }

  /* hero: a cache grid that streams under the type.
     Cells are resident (loaded) or idle; heat marks a cell being streamed in.
     The pointer acts like a request: cells stream in where it goes. */
  var hero = $('.hero');
  var canvas = hero && hero.querySelector('.stream');
  if (canvas && canvas.getContext) {
    (function () {
      var ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;
      var small = window.innerWidth < 700;
      var lowPower = (navigator.hardwareConcurrency || 8) <= 4 || small;
      var PITCH = small ? 16 : 18, SIZE = small ? 12 : 13;
      var minFrame = lowPower ? 32 : 0; // about 30 fps on phones and small CPUs
      var cols = 0, rows = 0, w = 0, h = 0, dpr = 1;
      var heat, resident, quiet, colors = {};
      var heads = [], running = false, visible = true, last = 0, spawnAt = 0, drain = 0;
      var pointer = null;

      function readColors() {
        var cs = getComputedStyle(hero);
        colors = {
          bg: cs.getPropertyValue('--bg').trim(),
          idle: cs.getPropertyValue('--cell-idle').trim(),
          res: cs.getPropertyValue('--cell-res').trim(),
          hot: cs.getPropertyValue('--cell-hot').trim(),
        };
      }
      function markQuiet() {
        quiet = new Uint8Array(cols * rows);
        var box = hero.getBoundingClientRect();
        var els = $$('.mega .line > span, .hero-side > *, .bar > *', document);
        els.forEach(function (el) {
          var r = el.getBoundingClientRect();
          var x0 = Math.max(0, Math.floor((r.left - box.left - 10) / PITCH));
          var x1 = Math.min(cols - 1, Math.floor((r.right - box.left + 10) / PITCH));
          var y0 = Math.max(0, Math.floor((r.top - box.top - 8) / PITCH));
          var y1 = Math.min(rows - 1, Math.floor((r.bottom - box.top + 8) / PITCH));
          for (var y = y0; y <= y1; y += 1) for (var x = x0; x <= x1; x += 1) quiet[y * cols + x] = 1;
        });
      }
      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);
        w = hero.clientWidth;
        h = hero.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(w / PITCH);
        rows = Math.ceil(h / PITCH);
        heat = new Float32Array(cols * rows);
        resident = new Uint8Array(cols * rows);
        for (var i = 0; i < resident.length; i += 1) resident[i] = Math.random() < 0.2 ? 1 : 0;
        markQuiet();
        draw();
      }
      function ignite(cx, cy, radius, chance) {
        for (var y = cy - radius; y <= cy + radius; y += 1) {
          for (var x = cx - radius; x <= cx + radius; x += 1) {
            if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
            var d = Math.hypot(x - cx, y - cy);
            if (d > radius || Math.random() > chance * (1 - d / (radius + 1))) continue;
            var k = y * cols + x;
            if (quiet[k]) continue;
            heat[k] = 1;
            resident[k] = 1;
          }
        }
      }
      function step(dt) {
        var decay = Math.pow(0.9, dt / 16);
        for (var i = 0; i < heat.length; i += 1) if (heat[i] > 0.01) heat[i] *= decay; else heat[i] = 0;
        // background expert loads
        var loads = Math.max(1, Math.round(cols * rows * 0.0006 * (dt / 16)));
        for (var j = 0; j < loads; j += 1) {
          var k = (Math.random() * heat.length) | 0;
          if (!quiet[k]) { heat[k] = 1; resident[k] = 1; }
        }
        // evict a little so the grid never fills up
        for (var e = 0; e < loads; e += 1) resident[(Math.random() * resident.length) | 0] = 0;
        // streams: heads that run along rows, like a prefetch walking the layers
        if (last > spawnAt) {
          heads.push({ x: -2, y: (Math.random() * rows) | 0, v: 0.6 + Math.random() * 0.7, life: cols + 4 });
          spawnAt = last + 700 + Math.random() * 900;
        }
        heads = heads.filter(function (hd) {
          hd.x += hd.v * (dt / 16);
          var cx = Math.round(hd.x);
          ignite(cx, hd.y, 1, 0.9);
          return hd.x < hd.life;
        });
        if (pointer) ignite(pointer.x, pointer.y, 3, 0.55);
      }
      function draw() {
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, w, h);
        var off = (PITCH - SIZE) / 2;
        // base pass, batched by colour
        ['idle', 'res'].forEach(function (kind) {
          ctx.beginPath();
          for (var y = 0; y < rows; y += 1) {
            for (var x = 0; x < cols; x += 1) {
              var k = y * cols + x;
              var isRes = resident[k] && !quiet[k];
              if ((kind === 'res') !== Boolean(isRes)) continue;
              ctx.rect(x * PITCH + off, y * PITCH + off, SIZE, SIZE);
            }
          }
          ctx.fillStyle = colors[kind];
          ctx.fill();
        });
        // hot pass, alpha in five buckets
        ctx.fillStyle = colors.hot;
        for (var b = 1; b <= 5; b += 1) {
          var lo = (b - 1) / 5, hi = b / 5;
          ctx.globalAlpha = hi * (1 - drain);
          ctx.beginPath();
          var any = false;
          for (var i = 0; i < heat.length; i += 1) {
            var v = heat[i];
            if (v > lo && v <= hi && v > 0.04) {
              ctx.rect((i % cols) * PITCH + off, ((i / cols) | 0) * PITCH + off, SIZE, SIZE);
              any = true;
            }
          }
          if (any) ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      function frame(t) {
        if (!running) return;
        if (last && t - last < minFrame) { requestAnimationFrame(frame); return; }
        var dt = Math.min(64, last ? t - last : 16);
        last = t;
        step(dt);
        draw();
        requestAnimationFrame(frame);
      }
      function start() {
        if (running || reduce || !visible) return;
        running = true;
        last = 0;
        requestAnimationFrame(frame);
      }
      function stop() { running = false; }

      readColors();
      resize();
      // a still frame with some streamed cells, also the reduced-motion picture
      for (var s = 0; s < 6; s += 1) ignite((Math.random() * cols) | 0, (Math.random() * rows) | 0, 4, 0.5);
      draw();
      hero.classList.add('is-live');

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          visible = en[0].isIntersecting;
          if (visible) start(); else stop();
        }).observe(hero);
      }
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
      var rt, lastW = window.innerWidth;
      window.addEventListener('resize', function () {
        // Phones fire resize when the address bar shows or hides; only a width change rebuilds the grid.
        if (window.innerWidth === lastW && Math.abs(hero.clientHeight - h) < 120) return;
        lastW = window.innerWidth;
        clearTimeout(rt);
        rt = setTimeout(resize, 150);
      });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { markQuiet(); draw(); });
      function toCell(ev) {
        var r = hero.getBoundingClientRect();
        return { x: Math.floor((ev.clientX - r.left) / PITCH), y: Math.floor((ev.clientY - r.top) / PITCH) };
      }
      hero.addEventListener('pointermove', function (ev) {
        pointer = toCell(ev);
        if (reduce) { ignite(pointer.x, pointer.y, 2, 0.5); draw(); }
      });
      hero.addEventListener('pointerleave', function () { pointer = null; });
      // Touch: a drag through the grid streams cells in along the finger without blocking the scroll.
      hero.addEventListener('touchmove', function (ev) {
        var tch = ev.touches[0];
        if (!tch) return;
        pointer = toCell(tch);
        if (reduce) { ignite(pointer.x, pointer.y, 2, 0.5); draw(); }
      }, { passive: true });
      hero.addEventListener('touchend', function () { pointer = null; }, { passive: true });
      hero.addEventListener('pointerdown', function (ev) {
        var c = toCell(ev);
        ignite(c.x, c.y, 7, 0.8);
        if (reduce) draw();
      });
      // the grid drains as the hero scrolls away
      window.addEventListener('scroll', function () {
        drain = Math.min(0.85, Math.max(0, window.scrollY / (h || 1)));
        if (!running) draw();
      }, { passive: true });
      // theme changes
      new MutationObserver(function () { readColors(); draw(); }).observe(doc, { attributes: true, attributeFilter: ['data-theme'] });
      var mq = window.matchMedia('(prefers-color-scheme: light)');
      if (mq.addEventListener) mq.addEventListener('change', function () { readColors(); draw(); });
      start();
    })();
  }

  /* what I do: the layer of the discipline in view lifts out of the stack */
  var discs = $$('.disc');
  if (discs.length && 'IntersectionObserver' in window) {
    var layersById = {};
    $$('.layer').forEach(function (l) { layersById[l.getAttribute('data-id')] = l; });
    var discIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.getAttribute('data-id');
        discs.forEach(function (d) { d.classList.toggle('on', d === en.target); });
        Object.keys(layersById).forEach(function (k) { layersById[k].classList.toggle('on', k === id); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    discs.forEach(function (d) { discIo.observe(d); });
    discs[0].classList.add('on');
    if (layersById[discs[0].getAttribute('data-id')]) layersById[discs[0].getAttribute('data-id')].classList.add('on');
  }
  /* the panel opens from an inset card to the full width as it arrives */
  var whatPanel = $('.what-panel');
  if (whatPanel && !reduce && window.innerWidth > 700) {
    var ticking = false;
    var openUp = function () {
      ticking = false;
      var r = whatPanel.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
      whatPanel.style.setProperty('--open', p.toFixed(3));
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(openUp); }
    }, { passive: true });
    openUp();
  }

  /* screenshot strips: previous / next buttons */
  $$('.strip-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var host = btn.closest('.band') || btn.closest('.p-shots');
      var strip = host && host.querySelector('.strip');
      if (!strip) return;
      var slide = strip.querySelector('.slide');
      var step = slide ? slide.getBoundingClientRect().width + 20 : strip.clientWidth * 0.7;
      strip.scrollBy({ left: step * Number(btn.getAttribute('data-dir')), behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* strips open on their second picture, so both neighbours show */
  $$('.strip').forEach(function (strip) {
    var slides = strip.querySelectorAll('.slide');
    if (slides.length < 3) return;
    var s = slides[1];
    strip.scrollLeft = s.offsetLeft - (strip.clientWidth - s.offsetWidth) / 2;
  });

  /* version check */
  var input = $('#strapi-version');
  var out = $('.spec-out');
  var hint = $('#live-hint');
  function parse(v) {
    var m = String(v).trim().replace(/^v/i, '').match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/);
    if (!m) return null;
    return [Number(m[1]), Number(m[2] || 0), Number(m[3] || 0)];
  }
  function gte(a, b) {
    for (var i = 0; i < 3; i += 1) {
      if (a[i] !== b[i]) return a[i] > b[i];
    }
    return true;
  }
  function check() {
    var rows = $$('.live-list li');
    var v = parse(input.value);
    var invalid = !v || v[0] !== 5;
    input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    var form = $('#live-form');
    if (invalid) {
      hint.textContent = form ? (lang === 'de' ? 'Gib eine Strapi-5-Version ein, zum Beispiel 5.38.0' : 'Enter a Strapi 5 version such as 5.38.0') : '';
      out.textContent = '0 ' + out.getAttribute('data-of') + ' ' + rows.length;
      rows.forEach(function (li) { li.classList.remove('yes'); li.classList.add('no'); });
      return;
    }
    hint.textContent = '';
    var fit = 0;
    rows.forEach(function (li) {
      var min = parse(li.getAttribute('data-min'));
      var state = li.querySelector('.lc-state');
      var ok = min ? gte(v, min) : true;
      if (ok) fit += 1;
      li.classList.toggle('yes', ok);
      li.classList.toggle('no', !ok);
      state.textContent = ok ? state.getAttribute('data-yes') : state.getAttribute('data-no') + ' ' + li.getAttribute('data-min') + '+';
    });
    out.textContent = fit + ' ' + out.getAttribute('data-of') + ' ' + rows.length;
  }
  if (input && out) {
    input.addEventListener('input', check);
    var lf = $('#live-form');
    if (lf) lf.addEventListener('submit', function (e) { e.preventDefault(); check(); });
    check();
  }

  /* copy install command */
  $$('.copy-btn').forEach(function (b) {
    var label = b.textContent;
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
        b.textContent = b.getAttribute('data-done');
        setTimeout(function () { b.textContent = label; }, 1600);
      }, function () { /* clipboard refused; the command stays selectable */ });
    });
  });

  /* local time in Berlin */
  $$('.local-time').forEach(function (el) {
    var tz = el.getAttribute('data-tz');
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat(el.getAttribute('data-lang') === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
    } catch (e) { return; }
    function tick() { el.textContent = fmt.format(new Date()); }
    tick();
    setInterval(tick, 30000);
  });

  /* entrances: heading, then text, then pictures, once per section */
  // Phones skip the entrances: long pages read faster without them.
  if (!reduce && 'IntersectionObserver' in window && window.innerWidth > 700) {
    var groups = $$('main > section:not(.hero):not(.work):not(.what):not(.projects), main > article, .work > .h-big, .projects > .h-big, .projects > .other, .what-head, main > nav.crumbs, .band, .foot');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$('.reveal', en.target).forEach(function (el) { el.classList.add('in'); });
        if (en.target.classList.contains('reveal')) en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px 60% 0px', threshold: 0 });
    groups.forEach(function (g) {
      if (g.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already in view
      var parts = $$(':scope > h2, :scope > .h-big, :scope h3, :scope p, :scope .slide, :scope li, :scope .tile, :scope .cell, :scope dl', g)
        .filter(function (el) { return !el.closest('.marquee') && !el.closest('.reveal'); })
        .slice(0, 40);
      parts.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.setProperty('--d', Math.min(i, 10) * 70 + 'ms');
      });
      io.observe(g);
    });
  }
})();
