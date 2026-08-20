/* Lattice — "Signal vs Noise": escena full-height scrubbeada por scroll.
   GSAP + ScrollTrigger desde CDN; fallback a scroll listener + rAF.
   Escena 1: el Maker sunset y sus métricas verificadas apareciendo una por una en órbita.
     Las categorías y los números se sortean en cada carga, así la landing no muestra
     siempre las mismas (podés caer en NBA, cripto, política, clima, etc.).
   Escena 2: zoom-out al ruido, circle packing gris (el único sunset es el del medio).
   Escena 3: el ruido sale a la izquierda y entra la red Lattice: distribución pareja
     sunset, aro grafito instrumental, tags monospace fuera del aro.
   prefers-reduced-motion → estado ORDEN final estático. */
(function () {
  'use strict';
  if (customElements.get('signal-noise-scene')) return;

  var SVGNS = 'http://www.w3.org/2000/svg';

  var RING_PHRASES = [
    { t: '1000x gem', ang: -38 },
    { t: "it's pointless", ang: 62 },
    { t: 'dump', ang: 148 },
    { t: 'buy my coin', ang: 232 }
  ];

  var OUT_WORDS = [
    { t: 'wen', x: 88, y: 12, rot: 8, s: 14 },
    { t: 'to the moon', x: 6, y: 9, rot: -6, s: 16 },
    { t: 'nepo pick', x: 90, y: 60, rot: -10, s: 13 },
    { t: 'trust me bro', x: 1, y: 84, rot: 12, s: 14 }
  ];

  // Escena 1: las métricas del Maker son fijas; lo que rota en cada carga son las dos
  // categorías, para mostrar que la red no vive de una sola vertical.
  var SCENE1_CATS = [
    { es: 'NBA', en: 'NBA' },
    { es: 'Cripto', en: 'Crypto' },
    { es: 'Política', en: 'Politics' },
    { es: 'Fútbol', en: 'Soccer' },
    { es: 'Clima', en: 'Climate' },
    { es: 'Economía', en: 'Economy' },
    { es: 'IA', en: 'AI' },
    { es: 'Comercio', en: 'Trade' },
    { es: 'Elecciones', en: 'Elections' },
    { es: 'F1', en: 'F1' }
  ];

  var SCENE1_STATS = [
    { es: '95% win rate', en: '95% win rate' },
    { es: '45% yield', en: '45% yield' },
    { es: 'racha 10', en: '10 streak' }
  ];

  var BADGES = [
    { t: { es: 'Yield +42%', en: 'Yield +42%' }, dot: '#F5A623', ang: -90 },
    { t: { es: 'Stake Locked', en: 'Stake Locked' }, dot: '#FF6B00', ang: -28 },
    { t: { es: '14x Racha', en: '14x Streak' }, dot: '#F5A623', ang: 42 },
    { t: { es: 'Reembolso Activo', en: 'Refund Active' }, dot: '#FF6B00', ang: 158 },
    { t: { es: 'Audited', en: 'Audited' }, dot: '#8A8A90', neutral: true, ang: 216 }
  ];

  var SCENE_T = {
    es: { heading: 'Señal, no ruido.', sub: 'Cuando equivocarse cuesta, los charlatanes se callan solos.' },
    en: { heading: 'Signal, not noise.', sub: 'When being wrong costs money, the charlatans go quiet on their own.' }
  };

  function curLang() { return window.__latticeLang === 'en' ? 'en' : 'es'; }

  // Fisher-Yates parcial: devuelve n elementos al azar, sin repetir.
  function sample(arr, n) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a.slice(0, n);
  }

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function lin(p, a, b) { return clamp01((p - a) / (b - a)); }
  function seg(p, a, b) {
    var t = lin(p, a, b);
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // power2.inOut
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 2); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function svg(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function polar(r, deg) {
    var a = deg * Math.PI / 180;
    return [300 + Math.cos(a) * r, 300 + Math.sin(a) * r];
  }

  // Circle packing caótico: relleno parejo del disco (r = sqrt(rand) * R), radios variados.
  // Todo el ruido es gris: el único punto sunset de la escena 2 es el Maker del centro.
  function chaosPts(count, rMax) {
    var out = [];
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2;
      var r = Math.sqrt(Math.random()) * rMax;
      var v = 10 + Math.floor(Math.random() * 175); // negro → gris claro
      out.push({
        x: 300 + Math.cos(a) * r,
        y: 300 + Math.sin(a) * r,
        rad: 1.5 + Math.random() * 5,
        fill: 'rgb(' + v + ',' + v + ',' + v + ')',
        o: Math.random()
      });
    }
    return out;
  }

  // Distribución pareja tipo Poisson-disc (best-candidate sampling).
  function evenPts(count, rMax) {
    var pts = [];
    for (var i = 0; i < count; i++) {
      var best = null, bestD = -1;
      for (var c = 0; c < 26; c++) {
        var a = Math.random() * Math.PI * 2;
        var r = Math.sqrt(0.04 + 0.96 * Math.random()) * rMax;
        var x = 300 + Math.cos(a) * r, y = 300 + Math.sin(a) * r;
        var dmin = 1e9;
        for (var j = 0; j < pts.length; j++) {
          var dx = pts[j].x - x, dy = pts[j].y - y;
          var d2 = dx * dx + dy * dy;
          if (d2 < dmin) dmin = d2;
        }
        if (dmin > bestD) { bestD = dmin; best = { x: x, y: y, o: Math.random() }; }
      }
      pts.push(best);
    }
    return pts;
  }

  // Aro con gaps donde el texto lo interrumpe (estilo póster editorial).
  function ringWithGaps(r, gaps) {
    var sorted = gaps.slice().sort(function (a, b) { return a.ang - b.ang; });
    var d = '';
    for (var i = 0; i < sorted.length; i++) {
      var start = sorted[i].ang + sorted[i].half;
      var next = sorted[(i + 1) % sorted.length];
      var end = (i === sorted.length - 1 ? next.ang + 360 : next.ang) - next.half;
      var span = end - start;
      if (span <= 0) continue;
      var p0 = polar(r, start), p1 = polar(r, end);
      d += 'M ' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) +
        ' A ' + r + ' ' + r + ' 0 ' + (span > 180 ? 1 : 0) + ' 1 ' +
        p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' ';
    }
    return d;
  }

  class SignalNoiseScene extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      var self = this;
      this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.height = this._reduced ? 'auto' : '360vh';

      // ── stage (sticky, 100vh) ──
      var stage = document.createElement('div');
      stage.style.cssText =
        'position:' + (this._reduced ? 'relative' : 'sticky') + ';top:0;height:' +
        (this._reduced ? 'auto' : '100vh') + ';min-height:560px;display:flex;flex-wrap:wrap;' +
        'align-items:center;justify-content:center;gap:32px 56px;padding:48px 24px;box-sizing:border-box;overflow:hidden;';
      this.appendChild(stage);
      this._stage = stage;

      // ── copy fijo ──
      var copy = document.createElement('div');
      copy.style.cssText = 'flex:0 1 340px;min-width:260px;';
      copy.innerHTML =
        '<h2 data-sc-heading style="margin:0 0 16px;font-family:\'Space Grotesk\',sans-serif;font-weight:600;font-size:clamp(30px,4.4vw,48px);line-height:1.1;letter-spacing:-0.03em;color:#0A0A0B"></h2>' +
        '<p data-sc-sub style="margin:0;font-size:16px;line-height:1.65;color:#5F5E5A;max-width:340px"></p>';
      stage.appendChild(copy);
      this._scHeading = copy.querySelector('[data-sc-heading]');
      this._scSub = copy.querySelector('[data-sc-sub]');
      this._applyLang = function () {
        var t = SCENE_T[curLang()];
        if (self._scHeading) self._scHeading.textContent = t.heading;
        if (self._scSub) self._scSub.textContent = t.sub;
        if (self._badges) {
          self._badges.forEach(function (b) {
            var txt = b.el.querySelector('[data-badge-txt]');
            if (txt) txt.textContent = b.cfg.t[curLang()];
          });
        }
        if (self._concepts) {
          self._concepts.forEach(function (c) {
            var txt = c.el.querySelector('[data-concept-txt]');
            if (txt) txt.textContent = c.cfg[curLang()];
          });
        }
      };
      window.addEventListener('lattice:lang', this._applyLang);

      // ── escena ──
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;flex:0 1 auto;width:min(82vw,500px);aspect-ratio:1/1;';
      stage.appendChild(wrap);
      this._wrap = wrap;
      this._copy = copy;

      // Ajuste por altura: que el círculo completo + tags entren en el stage
      this._layoutScene = function () {
        var vh = window.innerHeight || 800;
        var vw = window.innerWidth || 1200;
        var stacked = copy.getBoundingClientRect().top < wrap.getBoundingClientRect().top - 10 ||
          (vw - 48) < (340 + 56 + 380);
        var avail = vh - 96 - (stacked ? copy.offsetHeight + 32 : 0);
        var size = Math.max(240, Math.min(500, 0.82 * vw, avail));
        wrap.style.width = size + 'px';
        // En pantallas chicas los chips ocupan una fracción mucho mayor del círculo:
        // se achican para no pisar la tarjeta del Maker.
        self._narrow = size < 400;
        if (self._concepts) {
          self._concepts.forEach(function (c) {
            c.el.style.fontSize = self._narrow ? '9.5px' : '11px';
            c.el.style.padding = self._narrow ? '4px 9px' : '5px 12px';
          });
        }
      };
      this._onResize = function () { self._layoutScene(); };
      window.addEventListener('resize', this._onResize);
      requestAnimationFrame(this._onResize);
      setTimeout(this._onResize, 400);

      var svgRoot = svg('svg', { viewBox: '0 0 600 600' });
      svgRoot.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;';
      wrap.appendChild(svgRoot);

      // ═ FASE A: mundo ruidoso ═
      var gA = svg('g', {});
      svgRoot.appendChild(gA);
      this._gA = gA;

      // aro interrumpido por frases de charlatán
      var gaps = RING_PHRASES.map(function (ph) {
        var w = ph.t.length * 7.4 + 18; // ancho estimado px
        return { ang: ph.ang, half: (w / 2 / 250) * 180 / Math.PI };
      });
      this._ringA = svg('path', { d: ringWithGaps(250, gaps), fill: 'none', stroke: '#B9B7B0', 'stroke-width': 1, opacity: 0 });
      gA.appendChild(this._ringA);

      this._ringTexts = svg('g', { opacity: 0 });
      RING_PHRASES.forEach(function (ph) {
        var pos = polar(250, ph.ang);
        var t = svg('text', {
          x: pos[0], y: pos[1], 'text-anchor': 'middle', 'dominant-baseline': 'middle',
          'font-size': 14, fill: '#6B6A66'
        });
        t.style.cssText = 'font-family:Inter,sans-serif;font-style:italic;';
        t.textContent = ph.t;
        self._ringTexts.appendChild(t);
      });
      gA.appendChild(this._ringTexts);

      // circle packing caótico: grises + brasas sunset ahogadas
      this._crowd = chaosPts(140, 236).map(function (pt) {
        var c = svg('circle', { cx: pt.x, cy: pt.y, r: pt.rad, fill: pt.fill, opacity: 0 });
        gA.appendChild(c);
        return { el: c, o: pt.o };
      });

      // mini-card del experto (close-up)
      var card = svg('g', {});
      card.appendChild(svg('rect', { x: 254, y: 268, width: 92, height: 64, rx: 10, fill: '#FFFFFF', stroke: '#0A0A0B', 'stroke-width': 1.5 }));
      card.appendChild(svg('circle', { cx: 274, cy: 290, r: 8, fill: '#FF6B00' }));
      card.appendChild(svg('rect', { x: 290, y: 284, width: 42, height: 4, rx: 2, fill: '#C9C7BF' }));
      card.appendChild(svg('rect', { x: 290, y: 294, width: 30, height: 4, rx: 2, fill: '#C9C7BF' }));
      card.appendChild(svg('rect', { x: 266, y: 310, width: 66, height: 4, rx: 2, fill: '#E4E2DA' }));
      gA.appendChild(card);
      this._card = card;

      // nodo Maker (vista de multitud): el único sunset en el mar de gris
      this._expert = svg('circle', { cx: 300, cy: 300, r: 7, fill: '#FF6B00', opacity: 0 });
      gA.appendChild(this._expert);

      // jerga flotando FUERA del aro, gris muy tenue (HTML)
      var wordLayer = document.createElement('div');
      wordLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      wrap.appendChild(wordLayer);
      this._wordLayer = wordLayer;
      this._words = OUT_WORDS.map(function (w, i) {
        var s = document.createElement('span');
        s.textContent = w.t;
        s.style.cssText =
          'position:absolute;left:' + w.x + '%;top:' + w.y + '%;font-family:Inter,sans-serif;font-style:italic;' +
          'font-size:' + w.s + 'px;color:#C4C2BB;opacity:0;white-space:nowrap;will-change:transform,opacity;';
        wordLayer.appendChild(s);
        return { el: s, rot: w.rot, i: i };
      });

      // ── ESCENA 1: métricas del Maker orbitando, apareciendo una por una ──
      // Las tres métricas son siempre las mismas y ocupan siempre el mismo lugar. Sólo
      // rotan las dos categorías, en dos slots no contiguos para que queden repartidas.
      var conceptLayer = document.createElement('div');
      conceptLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      wrap.appendChild(conceptLayer);
      var baseAng = -90;
      var cats = sample(SCENE1_CATS, 2);
      var picked = [cats[0], SCENE1_STATS[0], SCENE1_STATS[1], cats[1], SCENE1_STATS[2]];
      this._concepts = picked.map(function (cfg, i) {
        var s = document.createElement('span');
        s.style.cssText =
          'position:absolute;left:0;top:0;display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;white-space:nowrap;' +
          "font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.03em;opacity:0;will-change:transform,opacity;" +
          'background:#FFF1E3;border:0.5px solid #FBDBB6;color:#3F3F44;';
        var dot = document.createElement('span');
        dot.style.cssText = 'width:6px;height:6px;border-radius:50%;flex:none;background:' + (i % 2 ? '#F5A623' : '#FF6B00') + ';';
        var txt = document.createElement('span');
        txt.setAttribute('data-concept-txt', '');
        txt.textContent = cfg[curLang()];
        s.appendChild(dot);
        s.appendChild(txt);
        conceptLayer.appendChild(s);
        return { el: s, cfg: cfg, ang: baseAng + i * 72, start: 0.03 + i * 0.032 };
      });

      // ═ FASES B+C: círculo Lattice (instrumento) ═
      var gB = svg('g', { opacity: 0 });
      svgRoot.appendChild(gB);
      this._gB = gB;

      // aro-guía concéntrico tenue + aro principal grafito
      gB.appendChild(svg('circle', { cx: 300, cy: 300, r: 262, fill: 'none', stroke: '#EDEBE4', 'stroke-width': 1 }));
      gB.appendChild(svg('circle', { cx: 300, cy: 300, r: 250, fill: 'none', stroke: '#3A3A42', 'stroke-width': 1.8 }));

      // puntos sunset parejos (Poisson-disc). Radio fijo: entran escalonados por opacidad,
      // pero todos miden lo mismo en todo momento para que la señal se lea pareja.
      this._latticeNodes = evenPts(30, 226).map(function (pt) {
        var gold = Math.random() < 0.3;
        var c = svg('circle', { cx: pt.x, cy: pt.y, r: 5, fill: gold ? '#F5A623' : '#FF6B00', opacity: 0 });
        gB.appendChild(c);
        return { el: c, o: pt.o };
      });

      this._centerNode = svg('circle', { cx: 300, cy: 300, r: 7, fill: '#FF6B00', opacity: 0 });
      gB.appendChild(this._centerNode);

      // "análisis" publicado (hairlines)
      var lines = svg('g', { opacity: 0 });
      lines.appendChild(svg('rect', { x: 272, y: 254, width: 56, height: 3.5, rx: 1.75, fill: '#C9C7BF' }));
      lines.appendChild(svg('rect', { x: 280, y: 264, width: 40, height: 3.5, rx: 1.75, fill: '#DDDBD3' }));
      gB.appendChild(lines);
      this._lines = lines;

      // pulso del smart contract
      this._pulse = svg('circle', { cx: 300, cy: 300, r: 12, fill: 'none', stroke: '#FF6B00', 'stroke-width': 1.5, opacity: 0 });
      gB.appendChild(this._pulse);

      // candado minimalista que envuelve el nodo
      var lock = svg('g', { opacity: 0 });
      lock.appendChild(svg('path', { d: 'M 292 292 a 8 8 0 0 1 16 0', fill: 'none', stroke: '#0A0A0B', 'stroke-width': 2 }));
      lock.appendChild(svg('rect', { x: 286, y: 292, width: 28, height: 22, rx: 6, fill: '#FFFFFF', stroke: '#0A0A0B', 'stroke-width': 2 }));
      gB.appendChild(lock);
      this._lock = lock;

      // tags monospace por FUERA del aro (status pills)
      var badgeLayer = document.createElement('div');
      badgeLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      wrap.appendChild(badgeLayer);
      this._badges = BADGES.map(function (bd) {
        var s = document.createElement('span');
        s.style.cssText =
          'position:absolute;left:0;top:0;display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;white-space:nowrap;' +
          "font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.03em;opacity:0;will-change:transform,opacity;" +
          (bd.neutral
            ? 'background:#F5F5F3;border:0.5px solid #DDDBD3;color:#5F5E5A;'
            : 'background:#FFF1E3;border:0.5px solid #FBDBB6;color:#3F3F44;');
        var dot = document.createElement('span');
        dot.style.cssText = 'width:6px;height:6px;border-radius:50%;background:' + bd.dot + ';flex:none;';
        var txt = document.createElement('span');
        txt.setAttribute('data-badge-txt', '');
        txt.textContent = bd.t[curLang()];
        s.appendChild(dot);
        s.appendChild(txt);
        badgeLayer.appendChild(s);
        return { el: s, cfg: bd, ang: bd.ang };
      });

      // Texto inicial de heading/sub/badges según idioma activo.
      if (this._applyLang) this._applyLang();

      if (this._reduced) {
        this._apply(1);
        return;
      }

      this._apply(0);
      this._initScrub();
    }

    disconnectedCallback() {
      if (this._tween && this._tween.scrollTrigger) this._tween.scrollTrigger.kill();
      if (this._tween) this._tween.kill && this._tween.kill();
      if (this._onScroll) window.removeEventListener('scroll', this._onScroll);
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      if (this._applyLang) window.removeEventListener('lattice:lang', this._applyLang);
      cancelAnimationFrame(this._raf);
      this.innerHTML = '';
      this._built = false;
    }

    _initScrub() {
      var self = this;
      Promise.all([
        import('https://esm.sh/gsap@3.12.5'),
        import('https://esm.sh/gsap@3.12.5/ScrollTrigger')
      ]).then(function (mods) {
        var gsap = mods[0].gsap || mods[0].default;
        var ScrollTrigger = mods[1].ScrollTrigger || mods[1].default;
        gsap.registerPlugin(ScrollTrigger);
        var proxy = { p: 0 };
        self._tween = gsap.to(proxy, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: self, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
          onUpdate: function () { self._apply(proxy.p); }
        });
      }).catch(function () { self._fallbackScroll(); });
    }

    _fallbackScroll() {
      var self = this;
      var current = 0, target = 0;
      var measure = function () {
        var r = self.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        target = total > 0 ? clamp01(-r.top / total) : 0;
      };
      this._onScroll = measure;
      window.addEventListener('scroll', measure, { passive: true });
      measure();
      var tick = function () {
        current += (target - current) * 0.12;
        self._apply(current);
        self._raf = requestAnimationFrame(tick);
      };
      this._raf = requestAnimationFrame(tick);
    }

    _apply(p) {
      // ── FASE A (0–0.35): ruido ──
      var zoom = mix(2.2, 1, seg(p, 0.06, 0.32));
      var crowdIn = seg(p, 0.14, 0.32);
      var out = seg(p, 0.35, 0.58);        // FASE B: sale a la izquierda
      var inB = seg(p, 0.4, 0.6);          // círculo nuevo entra desde la derecha
      var txA = -840 * out;

      this._gA.setAttribute('transform',
        'translate(' + txA + ' 0) translate(300 300) scale(' + zoom.toFixed(4) + ') translate(-300 -300)');
      this._gA.setAttribute('opacity', String(1 - 0.25 * out));
      this._ringA.setAttribute('opacity', String(crowdIn * 0.9));
      this._ringTexts.setAttribute('opacity', String(crowdIn));

      var cardOp = 1 - lin(p, 0.14, 0.26);
      this._card.setAttribute('opacity', String(cardOp));

      this._expert.setAttribute('opacity', String(lin(p, 0.14, 0.24)));

      for (var i = 0; i < this._crowd.length; i++) {
        var cr = this._crowd[i];
        cr.el.setAttribute('opacity', String(seg(p, 0.14 + cr.o * 0.12, 0.3 + cr.o * 0.06) * 0.92));
      }

      // conceptos de la escena 1: entran uno por uno, orbitan y el ruido se los traga
      var cOut = 1 - lin(p, 0.21, 0.30);
      var cRad = (this._narrow ? 27 : 20) + 14 * (zoom - 1) / 1.2;  // acompañan el zoom-out
      var cSpin = p * 120;
      for (var b = 0; b < this._concepts.length; b++) {
        var cc = this._concepts[b];
        var cIn = seg(p, cc.start, cc.start + 0.04);
        var ca = (cc.ang + cSpin) * Math.PI / 180;
        cc.el.style.left = (50 + Math.cos(ca) * cRad) + '%';
        cc.el.style.top = (50 + Math.sin(ca) * cRad) + '%';
        cc.el.style.opacity = String(cIn * cOut);
        cc.el.style.transform = 'translate(-50%,-50%) scale(' + (0.86 + 0.14 * cIn).toFixed(3) + ')';
      }

      var wordOp = crowdIn * (1 - lin(p, 0.33, 0.46));
      for (var w = 0; w < this._words.length; w++) {
        var wd = this._words[w];
        wd.el.style.opacity = String(wordOp * 0.85);
        wd.el.style.transform =
          'translateX(' + (-110 * out) + 'vw) rotate(' + wd.rot + 'deg) translateY(' + (Math.sin(p * 7 + wd.i) * 6) + 'px)';
      }

      // ── FASES B+C: Lattice ──
      var settle = mix(1.03, 1, seg(p, 0.94, 1));
      var scaleB = (0.97 + 0.03 * inB) * settle;
      var txB = mix(840, 0, inB);
      this._gB.setAttribute('transform',
        'translate(' + txB + ' 0) translate(300 300) scale(' + scaleB.toFixed(4) + ') translate(-300 -300)');
      this._gB.setAttribute('opacity', String(clamp01(inB * 2)));

      // nodo publica
      var pop = seg(p, 0.58, 0.63);
      this._centerNode.setAttribute('opacity', String(pop));
      this._centerNode.setAttribute('r', String(7 * (0.4 + 0.6 * pop)));
      this._lines.setAttribute('opacity', String(seg(p, 0.6, 0.65) * (1 - 0.4 * seg(p, 0.9, 1))));

      // micro-momento smart contract (~1s real): trapecio + pulso claro
      var lockOp = Math.min(seg(p, 0.63, 0.67), 1 - seg(p, 0.79, 0.83));
      var lockScale = mix(1.6, 1, easeOut(lin(p, 0.63, 0.7)));
      this._lock.setAttribute('opacity', String(clamp01(lockOp)));
      this._lock.setAttribute('transform', 'translate(300 300) scale(' + lockScale.toFixed(3) + ') translate(-300 -300)');

      var pt = lin(p, 0.66, 0.8);
      this._pulse.setAttribute('r', String(12 + 30 * easeOut(pt)));
      this._pulse.setAttribute('opacity', String(pt > 0 && pt < 1 ? (1 - pt) * 0.6 : 0));

      // la red se llena, pareja y sunset
      for (var n = 0; n < this._latticeNodes.length; n++) {
        var ln = this._latticeNodes[n];
        var np = seg(p, 0.82 + ln.o * 0.08, 0.88 + ln.o * 0.08);
        ln.el.setAttribute('opacity', String(np));
      }

      // tags fuera del aro: fade + leve float, nunca tocan el aro
      var orbit = (1 - p) * 14;
      for (var g = 0; g < this._badges.length; g++) {
        var bg = this._badges[g];
        var bo = seg(p, 0.88 + g * 0.02, 0.93 + g * 0.02);
        var a = (bg.ang + orbit) * Math.PI / 180;
        var bx = 50 + Math.cos(a) * 48, by = 50 + Math.sin(a) * 48;
        bg.el.style.left = bx + '%';
        bg.el.style.top = by + '%';
        bg.el.style.opacity = String(bo);
        bg.el.style.transform =
          'translate(-50%,-50%) translateY(' + (10 * (1 - bo) + Math.sin(p * 9 + g * 1.7) * 2.5) + 'px)';
      }
    }
  }

  customElements.define('signal-noise-scene', SignalNoiseScene);
})();
