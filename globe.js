/* Lattice — globo COBE con chips de mercado, arcos y whales. */
(function () {
  'use strict';
  if (customElements.get('lattice-globe')) return;

  var DEG = Math.PI / 180;
  var THETA = 0.24;
  var R_FACTOR = 0.4;

  // Lista FIJA de ciudades reales (lat, lng), todas tierra-adentro para que el
  // marker nunca caiga en agua por su radio. Nunca se generan coordenadas al
  // azar: sólo se elige aleatoriamente CUÁLES ciudades/pares se muestran en
  // cada carga, pero las coordenadas en sí son siempre estas.
  var CITY = {
    newyork:    [40.7128, -74.0060],
    denver:     [39.7392, -104.9903],
    mexicocity: [19.4326, -99.1332],
    saopaulo:   [-23.5505, -46.6333],
    cordoba:    [-31.4201, -64.1888],
    london:     [51.5074, -0.1278],
    madrid:     [40.4168, -3.7038],
    abuja:      [9.0765, 7.3986],
    nairobi:    [-1.2921, 36.8219],
    riyadh:     [24.7136, 46.6753],
    delhi:      [28.6139, 77.2090],
    bangkok:    [13.7563, 100.5018],
    seoul:      [37.5665, 126.9780],
    canberra:   [-35.2809, 149.1300]
  };
  var CITY_KEYS = Object.keys(CITY);

  var SUNSET = ['255,51,51', '255,107,0', '245,166,35'];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }

  function curLang() { return window.__latticeLang === 'en' ? 'en' : 'es'; }

  // Whale markers: 4 ciudades al azar (todas del set fijo, todas tierra-adentro).
  var WHALE_CITIES = sample(CITY_KEYS, 4);
  var WHALES = WHALE_CITIES.map(function (city, i) {
    return { city: city, color: SUNSET[i % SUNSET.length] };
  });

  var MARKERS = CITY_KEYS.map(function (k) {
    var whale = WHALE_CITIES.indexOf(k) >= 0;
    return { location: CITY[k], size: whale ? 0.07 : 0.035 };
  });

  // Arcos: 4 pares al azar entre ciudades del set fijo (todos los extremos en
  // tierra; la línea que cruza el océano es la conexión, y es esperada).
  // Emparejar consecutivas de un shuffle garantiza pares distintos, sin
  // auto-loops ni ciudad repetida. Los primeros 2 arcos son "hot" (sunset).
  var ARCS = (function () {
    var pool = shuffle(CITY_KEYS);
    var arcs = [];
    for (var i = 0; arcs.length < 4 && i + 1 < pool.length; i += 2) {
      arcs.push({
        a: pool[i],
        b: pool[i + 1],
        color: arcs.length < 2 ? SUNSET[arcs.length] : '138,138,144',
        hot: arcs.length < 2
      });
    }
    return arcs;
  })();

  // Chips: 5 ciudades al azar del set fijo, cada una con una categoría. Los
  // labels traen ES/EN para que el selector de idioma pueda intercambiarlos.
  var CATEGORIES = [
    { icon: '₿',  es: 'Crypto',   en: 'Crypto',   amount: '+$1,240' },
    { icon: '🗳', es: 'Política', en: 'Politics', amount: '+$2,150' },
    { icon: '⚽', es: 'Fútbol',   en: 'Soccer',   amount: '$3,600' },
    { icon: '🏀', es: 'NBA',      en: 'NBA',      amount: '$4,900' },
    { icon: '📈', es: 'Economía', en: 'Economy',  amount: '$1,890' },
    { icon: '🤖', es: 'IA',       en: 'AI',       amount: '+$6,750' },
    { icon: '☁️', es: 'Clima',    en: 'Climate',  amount: '$2,300' },
    { icon: '🛒', es: 'Retail',   en: 'Retail',   amount: '$1,480' }
  ];
  var CHIP_CITIES = sample(CITY_KEYS, CATEGORIES.length);
  var CHIPS = CATEGORIES.map(function (cat, i) {
    return {
      city: CHIP_CITIES[i],
      icon: cat.icon,
      labels: { es: cat.es, en: cat.en },
      amount: cat.amount,
      whale: WHALE_CITIES.indexOf(CHIP_CITIES[i]) >= 0
    };
  });

  // Convierte [lat,lng] a un punto 3D sobre la esfera unitaria. Portado
  // literalmente de la latLonTo3D real de COBE (src/index.js) para que mi
  // overlay (arcos/whales/chips) quede en la MISMA convención de ejes que usa
  // COBE para ubicar sus markers nativos y el mapa de puntos. La versión
  // anterior (sin el offset de -PI en la longitud, y con seno/coseno
  // intercambiados entre X y Z) producía un giro fijo de 90° respecto al
  // mapa real: por eso arcos/whales/chips nunca coincidían con tierra firme
  // aunque los markers nativos sí, sin importar en qué phi estuviera el globo.
  function xyz(loc) {
    var latRad = loc[0] * DEG;
    var lonRad = loc[1] * DEG - Math.PI;
    var cosLat = Math.cos(latRad);
    return [-cosLat * Math.cos(lonRad), Math.sin(latRad), cosLat * Math.sin(lonRad)];
  }

  function slerp(a, b, t) {
    var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    d = Math.min(1, Math.max(-1, d));
    var om = Math.acos(d);
    if (om < 1e-4) return a;
    var so = Math.sin(om);
    var f0 = Math.sin((1 - t) * om) / so, f1 = Math.sin(t * om) / so;
    return [a[0] * f0 + b[0] * f1, a[1] * f0 + b[1] * f1, a[2] * f0 + b[2] * f1];
  }

  class LatticeGlobe extends HTMLElement {
    static get observedAttributes() { return ['speed', 'show-chips']; }

    constructor() {
      super();
      this._phi = 0;
      this._speed = 1;
      this._size = 0;
      this._built = false;
      this._timers = [];
    }

    attributeChangedCallback() { if (this._built) this._applyAttrs(); }

    _applyAttrs() {
      var s = parseFloat(this.getAttribute('speed'));
      this._speed = isFinite(s) ? s : 1;
      if (this._chipLayer) {
        this._chipLayer.style.display = this.getAttribute('show-chips') === 'false' ? 'none' : '';
      }
    }

    connectedCallback() {
      if (this._built) return;
      this._built = true;
      var self = this;

      this.style.display = 'block';
      this.style.position = 'relative';
      if (!this.style.aspectRatio) this.style.aspectRatio = '1 / 1';

      this._cv = document.createElement('canvas');
      this._cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease;';
      this._ov = document.createElement('canvas');
      this._ov.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
      this._chipLayer = document.createElement('div');
      this._chipLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      this.appendChild(this._cv);
      this.appendChild(this._ov);
      this.appendChild(this._chipLayer);

      this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this._buildChips();
      this._applyAttrs();

      this._onLang = function () { self._relabelChips(); };
      window.addEventListener('lattice:lang', this._onLang);

      this._ro = new ResizeObserver(function () { self._resize(); });
      this._ro.observe(this);
      this._resize();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { self._measureChips(); });
      }

      import('https://esm.sh/cobe').then(function (mod) {
        if (!self.isConnected) return;
        self._createGlobe = mod.default;
        self._initGlobe();
      }).catch(function (err) { console.warn('COBE no cargó:', err); });
    }

    _initGlobe() {
      var self = this;
      if (!this._createGlobe || !this.isConnected) return;
      if (this._globe) { try { this._globe.destroy(); } catch (e) { } this._globe = null; }
      this._frameSeen = false;
      this._globe = this._createGlobe(this._cv, {
        devicePixelRatio: 2,
        width: Math.max(2, this._size * 2),
        height: Math.max(2, this._size * 2),
        phi: 0,
        theta: THETA,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.86, 0.86, 0.86],
        markerColor: [0.6, 0.6, 0.6],
        glowColor: [1, 1, 1],
        markers: MARKERS,
        onRender: function (state) { self._frameSeen = true; self._frame(state); }
      });
      this._cv.style.opacity = '1';
      // La build actual de esm.sh/cobe no tiene onRender ni loop interno:
      // devuelve {update, destroy} y espera que el caller maneje los frames.
      clearTimeout(this._apiCheck);
      this._apiCheck = setTimeout(function () {
        if (!self._frameSeen && self._globe && typeof self._globe.update === 'function') {
          self._startManualLoop();
        }
      }, 400);
    }

    _startManualLoop() {
      if (this._rafOn) return;
      this._rafOn = true;
      var self = this;
      var step = function () {
        if (!self.isConnected || !self._globe) { self._rafOn = false; return; }
        var base = self._reduced ? 0.0007 : 0.004;
        self._phi += base * self._speed;
        try { self._globe.update({ phi: self._phi }); } catch (e) { }
        self._drawOverlay();
        self._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }

    disconnectedCallback() {
      if (this._globe) { try { this._globe.destroy(); } catch (e) { } this._globe = null; }
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      if (this._onLang) window.removeEventListener('lattice:lang', this._onLang);
      cancelAnimationFrame(this._raf);
      this._rafOn = false;
      clearTimeout(this._apiCheck);
      this._timers.forEach(function (t) { clearInterval(t); });
      this._timers = [];
      this.innerHTML = '';
      this._chips = null;
      this._ctx = null;
      this._built = false;
    }

    _resize() {
      var w = this.clientWidth || 0;
      if (!w) return;
      this._size = w;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      this._ov.width = Math.round(w * dpr);
      this._ov.height = Math.round(w * dpr);
      this._ctx = this._ov.getContext('2d');
      this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // En modo manual (API nueva sin onRender) el tamaño se fija al crear:
      // recrear el globo al cambiar de tamaño.
      if (this._rafOn) {
        var self = this;
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(function () {
          cancelAnimationFrame(self._raf);
          self._rafOn = false;
          self._initGlobe();
        }, 250);
      }
    }

    _buildChips() {
      var self = this;
      this._chips = CHIPS.map(function (c, i) {
        var el = document.createElement('div');
        el.style.cssText =
          'position:absolute;left:0;top:0;display:flex;align-items:center;gap:7px;' +
          'padding:6px 12px;border-radius:999px;white-space:nowrap;opacity:0;' +
          "font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.02em;" +
          'will-change:transform,opacity;' +
          (c.whale
            ? 'background:#0A0A0B;color:#F5F5F3;border:1px solid rgba(245,166,35,0.6);box-shadow:0 6px 20px rgba(255,80,20,0.28);'
            : 'background:#F1EFE8;color:#5F5E5A;border:1px solid rgba(10,10,11,0.08);box-shadow:0 3px 10px rgba(10,10,11,0.08);');
        var ic = document.createElement('span');
        ic.textContent = c.icon;
        ic.style.cssText = 'font-size:12px;line-height:1;';
        var tx = document.createElement('span');
        tx.textContent = c.labels[curLang()];
        tx.style.cssText = 'display:inline-block;text-align:center;transition:opacity 0.3s ease;line-height:1.3;';
        el.appendChild(ic);
        el.appendChild(tx);
        self._chipLayer.appendChild(el);
        var chip = { cfg: c, el: el, tx: tx, pos: xyz(CITY[c.city]), showingAmount: false };
        self._timers.push(setTimeout(function () {
          self._timers.push(setInterval(function () { self._toggleChip(chip); }, 2000));
        }, 600 + i * 380));
        return chip;
      });
      this._measureChips();
    }

    _toggleChip(chip) {
      var tx = chip.tx, cfg = chip.cfg;
      tx.style.opacity = '0';
      this._timers.push(setTimeout(function () {
        chip.showingAmount = !chip.showingAmount;
        tx.textContent = chip.showingAmount ? cfg.amount : cfg.labels[curLang()];
        tx.style.color = chip.showingAmount ? (cfg.whale ? '#F5A623' : '#1A1A1D') : '';
        tx.style.opacity = '1';
      }, 300));
    }

    // Re-etiqueta los chips cuando cambia el idioma (escucha 'lattice:lang').
    _relabelChips() {
      if (!this._chips) return;
      this._chips.forEach(function (chip) {
        if (!chip.showingAmount) chip.tx.textContent = chip.cfg.labels[curLang()];
      });
    }

    _measureChips() {
      if (!this._chips) return;
      var cv = document.createElement('canvas');
      var ctx = cv.getContext('2d');
      ctx.font = '600 11px "JetBrains Mono", monospace';
      this._chips.forEach(function (chip) {
        var w = Math.ceil(Math.max(
          ctx.measureText(chip.cfg.labels.es).width,
          ctx.measureText(chip.cfg.labels.en).width,
          ctx.measureText(chip.cfg.amount).width
        ));
        chip.tx.style.minWidth = w + 'px';
      });
    }

    _frame(state) {
      var base = this._reduced ? 0.0007 : 0.004;
      this._phi += base * this._speed;
      state.phi = this._phi;
      state.width = this._size * 2;
      state.height = this._size * 2;
      this._drawOverlay();
    }

    _project(p) {
      var phi = this._phi;
      var c = Math.cos(phi), s = Math.sin(phi);
      var x = p[0] * c + p[2] * s;
      var z = p[2] * c - p[0] * s;
      var y = p[1];
      var ct = Math.cos(THETA), st = Math.sin(THETA);
      return [x, y * ct - z * st, y * st + z * ct];
    }

    _drawOverlay() {
      var ctx = this._ctx;
      if (!ctx) return;
      var size = this._size;
      var R = size * R_FACTOR, cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);
      var now = performance.now();

      // Los arcos elevados ("lift") pueden proyectar fuera del disco del
      // globo cerca del horizonte; se recortan al círculo para que nunca
      // se dibuje un trazo flotando sobre el fondo/página.
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      for (var ai = 0; ai < ARCS.length; ai++) {
        var arc = ARCS[ai];
        var A = xyz(CITY[arc.a]), B = xyz(CITY[arc.b]);
        var N = 44, prev = null;
        for (var i = 0; i <= N; i++) {
          var t = i / N;
          var p = slerp(A, B, t);
          var lift = 1 + 0.12 * Math.sin(Math.PI * t);
          var q = this._project([p[0] * lift, p[1] * lift, p[2] * lift]);
          var sxp = cx + q[0] * R, syp = cy - q[1] * R, z = q[2];
          if (prev) {
            var zz = (z + prev[2]) / 2;
            var alpha = Math.max(0, Math.min(1, (zz + 0.1) / 0.5)) * (arc.hot ? 0.85 : 0.45);
            if (alpha > 0.02) {
              ctx.strokeStyle = 'rgba(' + arc.color + ',' + alpha.toFixed(3) + ')';
              ctx.lineWidth = arc.hot ? 1.4 : 1;
              ctx.beginPath();
              ctx.moveTo(prev[0], prev[1]);
              ctx.lineTo(sxp, syp);
              ctx.stroke();
            }
          }
          prev = [sxp, syp, z];
        }
        if (arc.hot && !this._reduced) {
          var tt = ((now / 3800) + ai * 0.45) % 1;
          var pp = slerp(A, B, tt);
          var lift2 = 1 + 0.12 * Math.sin(Math.PI * tt);
          var qq = this._project([pp[0] * lift2, pp[1] * lift2, pp[2] * lift2]);
          if (qq[2] > 0) {
            ctx.fillStyle = 'rgba(' + arc.color + ',0.95)';
            ctx.beginPath();
            ctx.arc(cx + qq[0] * R, cy - qq[1] * R, 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();

      for (var wi = 0; wi < WHALES.length; wi++) {
        var w = WHALES[wi];
        var qw = this._project(xyz(CITY[w.city]));
        if (qw[2] <= 0.02) continue;
        var a2 = Math.max(0, Math.min(1, (qw[2] - 0.02) / 0.4));
        var wx = cx + qw[0] * R, wy = cy - qw[1] * R;
        var g = ctx.createRadialGradient(wx, wy, 0, wx, wy, 9);
        g.addColorStop(0, 'rgba(' + w.color + ',' + (0.9 * a2).toFixed(3) + ')');
        g.addColorStop(0.45, 'rgba(' + w.color + ',' + (0.35 * a2).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(' + w.color + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(wx, wy, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(' + w.color + ',' + a2.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(wx, wy, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (this._chips) {
        for (var ci = 0; ci < this._chips.length; ci++) {
          var chip = this._chips[ci];
          var qc = this._project(chip.pos);
          var alpha3 = Math.max(0, Math.min(1, (qc[2] - 0.08) / 0.35));
          var x2 = cx + qc[0] * R, y2 = cy - qc[1] * R;
          var sc2 = 0.85 + 0.15 * Math.max(0, qc[2]);
          chip.el.style.opacity = alpha3.toFixed(3);
          chip.el.style.transform =
            'translate(' + x2.toFixed(1) + 'px,' + y2.toFixed(1) + 'px) translate(-50%,-135%) scale(' + sc2.toFixed(3) + ')';
        }
      }
    }
  }

  customElements.define('lattice-globe', LatticeGlobe);
})();
