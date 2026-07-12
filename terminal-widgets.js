/* Lattice — widgets vivos de la sección "La ventaja, en números."
   <lattice-live-feed> — feed en vivo (filas entran por arriba, loop).
   <lattice-termometro> — barras de rentabilidad que respiran + PROM/TOPE vivos.
   Sin verde: oro #F5A623 (live/yield/tope) · naranja #FF6B00 (calor/liquidez) ·
   carmesí #FF3333 (mínimo/reembolso). Respeta prefers-reduced-motion. */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var VAL_COLOR = { gold: '#F5A623', orange: '#FF6B00', crimson: '#FF3333' };

  /* ══════════ LIVE FEED ══════════ */
  var EVENTS = [
    { h: '@delta_norte', t: 'Plazas agotadas · Elección MX 2a vuelta', v: '48/48', c: 'gold' },
    { h: '@macrolena', t: 'Garantía bloqueada en contrato', v: '◆ 880', c: 'orange' },
    { h: '@quantfather', t: 'Insight acuñado · BTC > $128K', v: '#04218', c: 'gold' },
    { h: '@ledgersmith', t: 'Alerta de liquidez · mercado delgado', v: 'THIN', c: 'orange' },
    { h: '@cold_stat17', t: 'Racha actualizada on-chain', v: '14×', c: 'gold' },
    { h: '@teatime_fx', t: 'Reembolso ejecutado al Taker', v: '−$5.00', c: 'crimson' },
    { h: '@basilea_iv', t: 'Garantía bloqueada en contrato', v: '◆ 2,400', c: 'orange' },
    { h: '@quantfather', t: 'Plazas agotadas · Corte Fed Sep', v: '32/32', c: 'gold' },
    { h: '@delta_norte', t: 'Insight acuñado · Emergencia agrícola', v: '#04219', c: 'gold' },
    { h: '@ledgersmith', t: 'Reembolso ejecutado al Taker', v: '−$3.00', c: 'crimson' }
  ];

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  if (!customElements.get('lattice-live-feed')) {
    class LiveFeed extends HTMLElement {
      connectedCallback() {
        if (this._built) return;
        this._built = true;
        this.style.cssText += 'display:flex;flex-direction:column;height:100%;min-height:280px;';

        var head = document.createElement('div');
        head.style.cssText = 'display:flex;justify-content:flex-end;align-items:center;padding-bottom:10px;';
        head.innerHTML =
          '<span style="display:inline-flex;align-items:center;gap:7px;font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:0.16em;color:#F5A623">' +
          '<span data-pulse style="width:6px;height:6px;border-radius:50%;background:#F5A623"></span>EN VIVO</span>';
        this.appendChild(head);
        if (!REDUCED) {
          var dot = head.querySelector('[data-pulse]');
          dot.animate([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], { duration: 1800, iterations: Infinity });
        }

        this._list = document.createElement('div');
        this._list.style.cssText = 'flex:1;overflow:hidden;';
        this.appendChild(this._list);

        this._i = 0;
        this._clock = new Date();
        for (var k = 3; k >= 0; k--) this._list.appendChild(this._row(this._next(), true));

        if (!REDUCED) {
          var self = this;
          this._timer = setInterval(function () { self._tick(); }, 2800);
        }
      }

      disconnectedCallback() {
        clearInterval(this._timer);
        this.innerHTML = '';
        this._built = false;
      }

      _next() {
        var e = EVENTS[this._i % EVENTS.length];
        this._i++;
        this._clock = new Date(this._clock.getTime() + 2800 + Math.random() * 4000);
        return {
          h: e.h, t: e.t, v: e.v, c: e.c,
          ts: pad(this._clock.getHours()) + ':' + pad(this._clock.getMinutes()) + ':' + pad(this._clock.getSeconds())
        };
      }

      _row(e, instant) {
        var r = document.createElement('div');
        r.style.cssText =
          'overflow:hidden;border-bottom:1px solid #1C1C1F;' +
          (instant ? 'max-height:64px;opacity:1;transform:none;'
            : 'max-height:0;opacity:0;transform:translateY(-10px);') +
          'transition:max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;';
        r.innerHTML =
          '<div style="padding:10px 2px">' +
          '<div style="display:flex;align-items:baseline;gap:10px">' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-weight:500;font-size:12.5px;color:#F5F5F3">' + e.h + '</span>' +
          '<span style="flex:1"></span>' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-weight:500;font-size:12.5px;color:' + VAL_COLOR[e.c] + '">' + e.v + '</span>' +
          '</div>' +
          '<div style="display:flex;align-items:baseline;gap:8px;margin-top:3px">' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#5C5B58;flex:none">' + e.ts + '</span>' +
          '<span style="font-family:Inter,sans-serif;font-size:13px;color:#B4B2AA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1">' + e.t + '</span>' +
          '</div></div>';
        return r;
      }

      _tick() {
        var row = this._row(this._next(), false);
        this._list.insertBefore(row, this._list.firstChild);
        void row.offsetHeight;
        row.style.maxHeight = '64px';
        row.style.opacity = '1';
        row.style.transform = 'none';
        var kids = this._list.children;
        if (kids.length > 4) {
          var last = kids[kids.length - 1];
          last.style.maxHeight = '0';
          last.style.opacity = '0';
          setTimeout(function () { if (last.parentNode) last.parentNode.removeChild(last); }, 520);
        }
      }
    }
    customElements.define('lattice-live-feed', LiveFeed);
  }

  /* ══════════ TERMÓMETRO ══════════ */
  if (!customElements.get('lattice-termometro')) {
    var N = 18;
    var IDX_CRIMSON = 4;   // el mínimo
    var IDX_MAKER = 11;    // la más alta (naranja)
    var GRAYS = [15, 16, 17]; // sin dato

    class Termometro extends HTMLElement {
      connectedCallback() {
        if (this._built) return;
        this._built = true;
        this.style.cssText += 'display:flex;flex-direction:column;height:100%;gap:16px;justify-content:space-between;';

        var head = document.createElement('p');
        head.style.cssText = "margin:0;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.16em;color:#8A8A90;";
        head.textContent = 'RENTABILIDAD DEL MERCADO';
        this.appendChild(head);

        var rail = document.createElement('div');
        rail.style.cssText = 'flex:1;min-height:120px;display:flex;align-items:flex-end;gap:6px;';
        this.appendChild(rail);
        this._bars = [];
        for (var i = 0; i < N; i++) {
          var b = document.createElement('div');
          var bg = 'linear-gradient(180deg,#F7CE6B,#E09A2E)', glow = '';
          if (i === IDX_CRIMSON) bg = 'linear-gradient(180deg,#EF6152,#D93A2B)';
          else if (i === IDX_MAKER) { bg = 'linear-gradient(180deg,#FF7A18,#EF5C09)'; glow = 'box-shadow:0 6px 22px rgba(255,107,0,0.38);'; }
          else if (GRAYS.indexOf(i) >= 0) bg = '#E4E0D6';
          b.style.cssText =
            'flex:1;max-width:34px;border-radius:5px;background:' + bg + ';' + glow + 'height:' + this._h(i) + '%;' +
            'transition:height 0.9s cubic-bezier(0.2,0.8,0.2,1);';
          rail.appendChild(b);
          this._bars.push(b);
        }

        var met = document.createElement('div');
        met.style.cssText = 'display:flex;justify-content:space-between;gap:10px;margin-top:auto;';
        met.innerHTML =
          this._metric('+2%', 'MÍN', '#FF3333', '') +
          this._metric('+4.9%', 'PROM', '#3A3A38', 'prom') +
          this._metric('+15%', 'MAKER', '#FF6B00', '') +
          this._metric('+15.0%', 'TOPE', '#F5A623', 'tope');
        this.appendChild(met);
        this._prom = met.querySelector('[data-v="prom"]');
        this._tope = met.querySelector('[data-v="tope"]');
        this._topeVal = 15.0;
        this._lastTop = performance.now();

        if (!REDUCED) {
          var self = this;
          this._timer = setInterval(function () { self._breathe(); }, 2000);
        }
      }

      disconnectedCallback() {
        clearInterval(this._timer);
        cancelAnimationFrame(this._raf);
        if (this._mq) this._mq.removeEventListener('change', this._onMq);
        this.innerHTML = '';
        this._built = false;
      }

      _metric(v, l, color, key) {
        return '<div style="min-width:0">' +
          '<p data-v="' + key + '" style="margin:0 0 3px;font-family:\'JetBrains Mono\',monospace;font-weight:600;font-size:16px;letter-spacing:-0.01em;color:' + color + '">' + v + '</p>' +
          '<p style="margin:0;font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:0.14em;color:#8A8A90">' + l + '</p></div>';
      }

      _h(i) {
        if (i === IDX_CRIMSON) return 12;
        if (i === IDX_MAKER) return 96;
        if (GRAYS.indexOf(i) >= 0) return 16;
        return 26 + Math.random() * 48;
      }

      _breathe() {
        for (var i = 0; i < N; i++) {
          if (i === IDX_CRIMSON || i === IDX_MAKER || GRAYS.indexOf(i) >= 0) continue;
          this._bars[i].style.height = this._h(i) + '%';
        }
        this._prom.textContent = '+' + (4.2 + Math.random() * 1.4).toFixed(1) + '%';

        // TOPE: récord — solo sube, con probabilidad, cada 12–15s
        var now = performance.now();
        if (now - this._lastTop > 12000 && Math.random() < 0.4) {
          this._lastTop = now;
          var from = this._topeVal;
          var to = from + 0.3 + Math.random() * 1.2;
          this._topeVal = to;
          var maker = this._bars[IDX_MAKER];
          maker.style.height = '100%';
          maker.animate(
            [{ boxShadow: '0 0 0 rgba(255,107,0,0)' }, { boxShadow: '0 0 22px rgba(255,107,0,0.65)' }, { boxShadow: '0 0 0 rgba(255,107,0,0)' }],
            { duration: 900, easing: 'ease-out' }
          );
          var t0 = performance.now(), self = this;
          var step = function (t) {
            var p = Math.min(1, (t - t0) / 650);
            self._tope.textContent = '+' + (from + (to - from) * (1 - Math.pow(1 - p, 3))).toFixed(1) + '%';
            if (p < 1) self._raf = requestAnimationFrame(step);
          };
          this._raf = requestAnimationFrame(step);
        }
      }
    }
    customElements.define('lattice-termometro', Termometro);
  }

  /* ══════════ SYSTEM AUDIT LOG ══════════ */
  if (!customElements.get('lattice-audit-log')) {
    var LOG_LINES = [
      { pre: '> ', tag: '[SYS]', rest: ' Lattice Core v1.0 inicializado.' },
      { pre: '> ', tag: '[SEC]', rest: ' Smart contracts auditados en cadena.' },
      { pre: '> ', tag: '[NET]', rest: ' Protocolo de reembolso en stand-by.' },
      { pre: '> ', tag: '[ORC]', rest: ' Oráculos verificados: 5 categorías.' },
      { pre: '> ', tag: '[WAIT]', rest: ' Esperando el Bloque Génesis…' }
    ];

    class AuditLog extends HTMLElement {
      connectedCallback() {
        if (this._built) return;
        this._built = true;
        this.style.cssText += 'display:block;';
        this._list = document.createElement('div');
        this._list.style.cssText = 'display:flex;flex-direction:column;min-height:132px;justify-content:flex-end;';
        this.appendChild(this._list);
        this._i = 0;
        if (REDUCED) {
          for (var k = 0; k < LOG_LINES.length; k++) this._list.appendChild(this._line(LOG_LINES[k], true));
          return;
        }
        var self = this;
        this._tick();
        this._timer = setInterval(function () { self._tick(); }, 1400);
      }

      disconnectedCallback() {
        clearInterval(this._timer);
        this.innerHTML = '';
        this._built = false;
      }

      _line(l, instant) {
        var r = document.createElement('p');
        r.style.cssText =
          "margin:0;padding:4px 0;font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.5;color:#3F3F44;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" +
          (instant ? '' : 'opacity:0;transform:translateX(-14px);max-height:0;') +
          'transition:opacity 0.5s ease, transform 0.5s ease, max-height 0.4s ease;';
        r.innerHTML =
          '<span style="color:#8A8A90">' + l.pre + '</span>' +
          '<span style="color:#FF6B00;font-weight:600">' + l.tag + '</span>' +
          '<span>' + l.rest + '</span>';
        return r;
      }

      _tick() {
        var l = LOG_LINES[this._i % LOG_LINES.length];
        this._i++;
        var row = this._line(l, false);
        this._list.appendChild(row);
        void row.offsetHeight;
        row.style.opacity = '1';
        row.style.transform = 'none';
        row.style.maxHeight = '28px';
        var kids = this._list.children;
        if (kids.length > 5) {
          var first = kids[0];
          first.style.opacity = '0';
          first.style.maxHeight = '0';
          setTimeout(function () { if (first.parentNode) first.parentNode.removeChild(first); }, 520);
        }
      }
    }
    customElements.define('lattice-audit-log', AuditLog);
  }
})();
