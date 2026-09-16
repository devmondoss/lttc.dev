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
    canberra:   [-35.2809, 149.1300],
    berlin:     [52.5200, 13.4050],
    paris:      [48.8566, 2.3522],
    milan:      [45.4642, 9.1900],
    beijing:    [39.9042, 116.4074],
    sacramento: [38.5816, -121.4944]
  };
  var CITY_KEYS = Object.keys(CITY);

  // Un solo acento, leído de app/tokens.css: el canvas necesita la tripleta
  // numérica para rgba(), así que se convierte una vez desde la variable.
  function accentRGB() {
    var hex = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim().replace('#', '');
    if (hex.length !== 6) return '232,92,21';
    return parseInt(hex.slice(0, 2), 16) + ',' +
           parseInt(hex.slice(2, 4), 16) + ',' +
           parseInt(hex.slice(4, 6), 16);
  }
  var SUNSET = [accentRGB()];

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

  var ARC_HOT_COUNT = 5;   // moderado: antes 2, +3
  var ARC_GRAY_COUNT = 2;
  var ARC_CITY_CAP = 2;    // ninguna ciudad es "hub": máx 2 arcos hot por ciudad

  // Distancia angular aproximada entre dos ciudades usando solo la diferencia
  // de longitud (más simple que great-circle completo, alcanza para rankear
  // "lejos" vs "cerca" a los fines de elegir pares).
  function lngDist(a, b) {
    var d = Math.abs(CITY[a][1] - CITY[b][1]);
    return Math.min(d, 360 - d);
  }

  // ¿Se cruzan los segmentos de círculo máximo (great-circle) entre a1-b1 y
  // a2-b2 en algún punto de la esfera? Dos great circles se cruzan siempre en
  // un par de puntos antipodales (n1×n2 y su opuesto); alcanza con verificar
  // si alguno de esos dos puntos cae DENTRO de ambos arcos (no solo sobre las
  // circunferencias completas). Se usa para que ningún par de trazos del
  // globo se dibuje cruzándose entre sí — evita el efecto "telaraña" incluso
  // cuando se priorizan pares lejanos (que, al ser arcos largos, son los que
  // más chance tienen de cruzar a otro).
  function greatCircleIntersect(a1, b1, a2, b2) {
    function cross(u, v) { return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; }
    function dot(u, v) { return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]; }
    function angle(u, v) { return Math.acos(Math.max(-1, Math.min(1, dot(u, v)))); }
    function onSegment(p, a, b) {
      var ab = angle(a, b), ap = angle(a, p), pb = angle(p, b);
      return Math.abs(ap + pb - ab) < 1e-3;
    }
    var n1 = cross(a1, b1), n2 = cross(a2, b2);
    var line = cross(n1, n2);
    var len = Math.sqrt(dot(line, line));
    if (len < 1e-9) return false; // arcos sobre el mismo plano: no se consideran "cruce"
    var p = [line[0] / len, line[1] / len, line[2] / len];
    var negP = [-p[0], -p[1], -p[2]];
    return (onSegment(p, a1, b1) && onSegment(p, a2, b2)) || (onSegment(negP, a1, b1) && onSegment(negP, a2, b2));
  }

  // Arcos "hot" (naranja/sunset): se arman a partir de un pool de los pares
  // MÁS LEJANOS entre sí (tercio superior por distancia de longitud, con el
  // resto como respaldo si hiciera falta), para que se lean como operación
  // global y no tráfico entre vecinos. Reglas duras: cupo de ARC_CITY_CAP
  // arcos hot por ciudad, nunca se repite un mismo par, y NINGÚN arco (hot o
  // gris) se dibuja si cruza a otro ya elegido — así el resultado se lee
  // limpio en vez de telaraña aunque haya varios arcos largos a la vez.
  //
  // Arcos grises de fondo: pares al azar entre las ciudades que no quedaron
  // usadas en los arcos hot cuando es posible (son "ruido" de fondo, no la
  // señal), con la misma regla de no-cruce.
  var ARCS = (function () {
    var pairs = [];
    for (var i = 0; i < CITY_KEYS.length; i++) {
      for (var j = i + 1; j < CITY_KEYS.length; j++) {
        pairs.push([CITY_KEYS[i], CITY_KEYS[j], lngDist(CITY_KEYS[i], CITY_KEYS[j])]);
      }
    }
    pairs.sort(function (p, q) { return q[2] - p[2]; });
    var farThird = pairs.slice(0, Math.ceil(pairs.length / 3));
    var rest = pairs.slice(Math.ceil(pairs.length / 3));
    var hotCandidates = shuffle(farThird).concat(shuffle(rest));

    function crossesPlaced(placed, a, b) {
      var A3 = xyz(CITY[a]), B3 = xyz(CITY[b]);
      for (var i = 0; i < placed.length; i++) {
        if (greatCircleIntersect(A3, B3, xyz(CITY[placed[i].a]), xyz(CITY[placed[i].b]))) return true;
      }
      return false;
    }

    var placed = [];
    var useCount = {};
    CITY_KEYS.forEach(function (k) { useCount[k] = 0; });
    for (var fi = 0; fi < hotCandidates.length && placed.length < ARC_HOT_COUNT; fi++) {
      var a = hotCandidates[fi][0], b = hotCandidates[fi][1];
      if (useCount[a] >= ARC_CITY_CAP || useCount[b] >= ARC_CITY_CAP) continue;
      if (crossesPlaced(placed, a, b)) continue;
      placed.push({ a: a, b: b, color: SUNSET[placed.length % SUNSET.length], hot: true });
      useCount[a]++; useCount[b]++;
    }
    var hotArcs = placed.slice();

    var usedInHot = {};
    hotArcs.forEach(function (arc) { usedInHot[arc.a] = true; usedInHot[arc.b] = true; });
    var grayCandidates = shuffle(pairs.filter(function (p) { return !usedInHot[p[0]] && !usedInHot[p[1]]; }))
      .concat(shuffle(pairs));
    var grayStart = placed.length;
    for (var gi = 0; gi < grayCandidates.length && placed.length - grayStart < ARC_GRAY_COUNT; gi++) {
      var ga = grayCandidates[gi][0], gb = grayCandidates[gi][1];
      if (placed.some(function (x) { return (x.a === ga && x.b === gb) || (x.a === gb && x.b === ga); })) continue;
      if (crossesPlaced(placed, ga, gb)) continue;
      placed.push({ a: ga, b: gb, color: '138,138,144', hot: false });
    }

    return placed;
  })();

  // Chips: 5 ciudades al azar del set fijo, cada una con una categoría. Los
  // labels traen ES/EN para que el selector de idioma pueda intercambiarlos.
  var CATEGORIES = [
    { icon: '₿',  es: 'Crypto',   en: 'Crypto',   amount: '+$1,240' },
    { icon: '🗳', es: 'Política', en: 'Politics', amount: '+$2,150' },
    { icon: '⚽', es: 'Fútbol',   en: 'Soccer',   amount: '$3,600' },
    { icon: '📈', es: 'Economía', en: 'Economy',  amount: '$1,890' },
    { icon: '🤖', es: 'IA',       en: 'AI',       amount: '+$6,750' },
    { icon: '☁️', es: 'Clima',    en: 'Climate',  amount: '$2,300' },
    { icon: '🛒', es: 'Retail',   en: 'Retail',   amount: '$1,480' },
    { icon: '🚢', es: 'Comercio', en: 'Trade',    amount: '$3,150' }
  ];
  var CHIP_CITIES = sample(CITY_KEYS, CATEGORIES.length);

  // Algunas categorías tienen una región geográfica fija (a diferencia del
  // resto, que cae en cualquier ciudad del sorteo): Fútbol/Soccer en una
  // capital europea, Comercio/Trade específicamente en Beijing, IA/AI
  // específicamente en California (Sacramento — tierra adentro, mismo
  // criterio por el que se había usado Denver en vez de San Francisco).
  // CHIP_CITIES[i] se empareja posicionalmente con CATEGORIES[i]; para cada
  // categoría con restricción, si le tocó una ciudad fuera de su región, se
  // intercambia con la de otra categoría que sí sea de esa región (o, si
  // ninguna de las sorteadas lo es, se toma una directo del pool de la
  // región). Las regiones no se superponen entre sí, así que el orden en que
  // se procesan no importa. Las demás categorías siguen sin restricción.
  // (NBA se sacó de los chips: al quedar cerca de IA/Sacramento en varios
  // sorteos, las etiquetas se pisaban y saturaban el globo.)
  var CATEGORY_REGION = {
    Soccer:   ['berlin', 'madrid', 'paris', 'milan'],
    Trade:    ['beijing'],
    AI:       ['sacramento'],
    Politics: ['newyork']
  };
  (function fixCategoryGeography() {
    Object.keys(CATEGORY_REGION).forEach(function (catEn) {
      var region = CATEGORY_REGION[catEn];
      var idx = -1;
      for (var i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].en === catEn) { idx = i; break; }
      }
      if (idx < 0 || region.indexOf(CHIP_CITIES[idx]) >= 0) return;
      for (var j = 0; j < CHIP_CITIES.length; j++) {
        if (j !== idx && region.indexOf(CHIP_CITIES[j]) >= 0) {
          var tmp = CHIP_CITIES[idx];
          CHIP_CITIES[idx] = CHIP_CITIES[j];
          CHIP_CITIES[j] = tmp;
          return;
        }
      }
      for (var k = 0; k < region.length; k++) {
        if (CHIP_CITIES.indexOf(region[k]) < 0) {
          CHIP_CITIES[idx] = region[k];
          return;
        }
      }
    });
  })();

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

      // El globo y sus chips no necesitan seguir animando cuando el hero
      // quedó scrolleado lejos de la vista.
      this._visible = true;
      this._io = new IntersectionObserver(function (entries) {
        self._visible = entries[0].isIntersecting;
      }, { rootMargin: '200px 0px' });
      this._io.observe(this);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { self._measureChips(); });
      }

      import('https://esm.sh/cobe@0.6.3').then(function (mod) {
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
        if (self._visible) {
          var base = self._reduced ? 0.0007 : 0.004;
          self._phi += base * self._speed;
          try { self._globe.update({ phi: self._phi }); } catch (e) { }
          self._drawOverlay();
        }
        self._raf = requestAnimationFrame(step);
      };
      this._raf = requestAnimationFrame(step);
    }

    disconnectedCallback() {
      if (this._globe) { try { this._globe.destroy(); } catch (e) { } this._globe = null; }
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      if (this._io) { this._io.disconnect(); this._io = null; }
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
            ? 'background:#0A0A0B;color:#F5F5F3;border:1px solid var(--color-accent-line);box-shadow:var(--shadow-card);'
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
      if (!this._visible) return;
      var tx = chip.tx, cfg = chip.cfg;
      tx.style.opacity = '0';
      this._timers.push(setTimeout(function () {
        chip.showingAmount = !chip.showingAmount;
        tx.textContent = chip.showingAmount ? cfg.amount : cfg.labels[curLang()];
        tx.style.color = chip.showingAmount ? (cfg.whale ? 'var(--color-accent)' : '#1A1A1D') : '';
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
      if (this._visible) this._drawOverlay();
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
