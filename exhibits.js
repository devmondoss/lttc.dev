/* Lattice — exhibits editoriales inlineados (SVG) con paleta unificada.
   <lattice-exhibit exhibit="limones|score|alpha|calibracion"> — shadow DOM.
   Bilingüe: escucha 'lattice:lang' y re-renderiza con TPL.es / TPL.en. */
(function () {
  'use strict';
  if (customElements.get('lattice-exhibit')) return;

  function curLang() { return window.__latticeLang === 'en' ? 'en' : 'es'; }

  var CSS = "\
:host{display:block;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0A0A0B;-webkit-font-smoothing:antialiased;}\
.exhibit{width:100%;border-top:2px solid #0A0A0B;padding-top:20px;}\
.sub{font-size:13px;color:#5F5E5A;line-height:1.5;margin:0 0 20px;max-width:76ch;}\
svg{width:100%;height:auto;display:block;}\
.axis-line{stroke:#0A0A0B;stroke-width:1;}\
.grid{stroke:#E2E0DA;stroke-width:1;}\
.panel-title{font-size:11.5px;font-weight:600;fill:#0A0A0B;letter-spacing:.02em;}\
.panel-tag{font-family:'JetBrains Mono',monospace;font-size:9.5px;fill:#8A8A90;letter-spacing:.1em;}\
.axis-label{font-family:'JetBrains Mono',monospace;font-size:9px;fill:#5F5E5A;letter-spacing:.06em;}\
.annot{font-size:10px;fill:#5F5E5A;font-style:italic;}\
.annot-b{font-size:10px;fill:#0A0A0B;font-weight:600;}\
.legend{display:flex;gap:22px;margin:14px 0 4px;flex-wrap:wrap;}\
.legend div{display:flex;align-items:center;gap:7px;font-size:11px;color:#0A0A0B;}\
.swatch{width:18px;height:2.5px;border-radius:1px;}\
.swatch.dash{background:repeating-linear-gradient(90deg,#5F5E5A 0 4px,transparent 4px 7px);height:2px;}\
h2{font-size:20px;line-height:1.3;font-weight:700;letter-spacing:-.015em;margin:0 0 8px;max-width:64ch;}\
.rule{height:2px;width:52px;background:linear-gradient(90deg,#F5A623,#FF3333);margin-bottom:12px;}\
.seg-w{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:500;fill:#FAFAF8;}\
.seg-n{font-size:11.5px;font-weight:600;fill:#0A0A0B;}\
.seg-d{font-size:10px;fill:#5F5E5A;}\
.formula{font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#0A0A0B;background:#F1EFE8;border:1px solid #E2E0DA;border-left:3px solid #FF6B00;padding:12px 14px;margin-top:20px;line-height:1.6;}\
.formula span{color:#5F5E5A;}\
.tick{font-family:'JetBrains Mono',monospace;font-size:9px;fill:#5F5E5A;}\
.axis-t{font-family:'JetBrains Mono',monospace;font-size:9px;fill:#5F5E5A;letter-spacing:.09em;}\
.zone{font-size:10px;fill:#8A8A90;font-style:italic;}\
.k-t{font-size:11.5px;font-weight:600;fill:#0A0A0B;}\
.k-d{font-size:10px;fill:#5F5E5A;}\
.k-tag{font-family:'JetBrains Mono',monospace;font-size:9px;fill:#8A8A90;letter-spacing:.1em;}";

  var TPL = { es: {}, en: {} };

  TPL.es.limones = '<div class="exhibit">\
<h2>Sin verificación, el descuento del comprador expulsa al buen analista; con colateral, la brecha se cierra</h2>\
<div class="rule"></div>\
<p class="sub">La distancia vertical entre ambas curvas es el descuento por asimetría: lo que el comprador deja de pagar porque no puede distinguir el análisis riguroso del ruido. Ese descuento es también la razón por la que el analista riguroso se retira.</p>\
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dos paneles comparando la evolución de la calidad de la oferta y el precio dispuesto a pagar, sin verificación y con colateral.">\
<defs>\
<linearGradient id="sunsetLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="55%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#FF3333"/></linearGradient>\
<linearGradient id="wedgeA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A0A0B" stop-opacity="0.10"/><stop offset="100%" stop-color="#0A0A0B" stop-opacity="0.03"/></linearGradient>\
<linearGradient id="wedgeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.16"/><stop offset="100%" stop-color="#F5A623" stop-opacity="0.05"/></linearGradient>\
</defs>\
<text x="60" y="22" class="panel-tag">A · MERCADO SIN VERIFICACIÓN</text>\
<text x="60" y="38" class="panel-title">El equilibrio de los limones</text>\
<line x1="60" y1="60" x2="340" y2="60" class="grid"/><line x1="60" y1="105" x2="340" y2="105" class="grid"/><line x1="60" y1="150" x2="340" y2="150" class="grid"/><line x1="60" y1="195" x2="340" y2="195" class="grid"/>\
<line x1="60" y1="240" x2="340" y2="240" class="axis-line"/><line x1="60" y1="56" x2="60" y2="240" class="axis-line"/>\
<text x="52" y="63" class="axis-label" text-anchor="end">ALTO</text><text x="52" y="243" class="axis-label" text-anchor="end">BAJO</text>\
<path d="M60,76 L116,100 L172,130 L228,160 L284,184 L340,200 L340,206 L284,192 L228,176 L172,152 L116,124 L60,96 Z" fill="url(#wedgeA)"/>\
<polyline points="60,76 116,100 172,130 228,160 284,184 340,200" fill="none" stroke="#0A0A0B" stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round"/>\
<polyline points="60,96 116,124 172,152 228,176 284,192 340,206" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="60" cy="76" r="3" fill="#0A0A0B"/><circle cx="340" cy="200" r="3" fill="#0A0A0B"/>\
<text x="205" y="118" class="annot" text-anchor="middle">descuento por asimetría</text>\
<text x="330" y="228" class="annot" text-anchor="end">solo queda el ruido</text>\
<text x="200" y="262" class="axis-label" text-anchor="middle">RONDAS DE MERCADO →</text>\
<text x="420" y="22" class="panel-tag">B · CON COLATERAL Y REEMBOLSO</text>\
<text x="420" y="38" class="panel-title">El costo del error se internaliza</text>\
<line x1="420" y1="60" x2="700" y2="60" class="grid"/><line x1="420" y1="105" x2="700" y2="105" class="grid"/><line x1="420" y1="150" x2="700" y2="150" class="grid"/><line x1="420" y1="195" x2="700" y2="195" class="grid"/>\
<line x1="420" y1="240" x2="700" y2="240" class="axis-line"/><line x1="420" y1="56" x2="420" y2="240" class="axis-line"/>\
<path d="M420,76 L476,92 L532,100 L588,96 L644,88 L700,80 L700,84 L644,92 L588,98 L532,104 L476,108 L420,120 Z" fill="url(#wedgeB)"/>\
<polyline points="420,76 476,92 532,100 588,96 644,88 700,80" fill="none" stroke="url(#sunsetLine)" stroke-width="2.75" stroke-linejoin="round" stroke-linecap="round"/>\
<polyline points="420,120 476,108 532,104 588,98 644,92 700,84" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="700" cy="80" r="3.4" fill="#FF3333"/><circle cx="420" cy="120" r="3" fill="#5F5E5A"/>\
<line x1="700" y1="80" x2="700" y2="84" stroke="#0A0A0B" stroke-width="1"/>\
<text x="694" y="70" class="annot" text-anchor="end">la brecha se cierra: el precio</text>\
<text x="694" y="82" class="annot" text-anchor="end">refleja la calidad verificada</text>\
<text x="440" y="136" class="annot">el stake filtra la entrada</text>\
<text x="560" y="262" class="axis-label" text-anchor="middle">RONDAS DE MERCADO →</text>\
<line x1="380" y1="14" x2="380" y2="270" stroke="#E2E0DA" stroke-width="1"/>\
</svg>\
<div class="legend">\
<div><span class="swatch" style="background:#0A0A0B"></span> Calidad media de la oferta</div>\
<div><span class="swatch dash"></span> Precio que el comprador está dispuesto a pagar</div>\
<div><span class="swatch" style="background:linear-gradient(90deg,#F5A623,#FF3333)"></span> Calidad media con colateral reputacional</div>\
</div>\
</div>';

  TPL.en.limones = '<div class="exhibit">\
<h2>Without verification, the buyer’s discount drives out the rigorous analyst; with collateral, the gap closes</h2>\
<div class="rule"></div>\
<p class="sub">The vertical distance between the two curves is the asymmetry discount: what the buyer stops paying because they can’t tell rigorous analysis from noise. That discount is also why the rigorous analyst walks away.</p>\
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels comparing the evolution of supply quality and the price buyers are willing to pay, without verification and with collateral.">\
<defs>\
<linearGradient id="sunsetLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="55%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#FF3333"/></linearGradient>\
<linearGradient id="wedgeA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A0A0B" stop-opacity="0.10"/><stop offset="100%" stop-color="#0A0A0B" stop-opacity="0.03"/></linearGradient>\
<linearGradient id="wedgeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.16"/><stop offset="100%" stop-color="#F5A623" stop-opacity="0.05"/></linearGradient>\
</defs>\
<text x="60" y="22" class="panel-tag">A · MARKET WITHOUT VERIFICATION</text>\
<text x="60" y="38" class="panel-title">The lemons equilibrium</text>\
<line x1="60" y1="60" x2="340" y2="60" class="grid"/><line x1="60" y1="105" x2="340" y2="105" class="grid"/><line x1="60" y1="150" x2="340" y2="150" class="grid"/><line x1="60" y1="195" x2="340" y2="195" class="grid"/>\
<line x1="60" y1="240" x2="340" y2="240" class="axis-line"/><line x1="60" y1="56" x2="60" y2="240" class="axis-line"/>\
<text x="52" y="63" class="axis-label" text-anchor="end">HIGH</text><text x="52" y="243" class="axis-label" text-anchor="end">LOW</text>\
<path d="M60,76 L116,100 L172,130 L228,160 L284,184 L340,200 L340,206 L284,192 L228,176 L172,152 L116,124 L60,96 Z" fill="url(#wedgeA)"/>\
<polyline points="60,76 116,100 172,130 228,160 284,184 340,200" fill="none" stroke="#0A0A0B" stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round"/>\
<polyline points="60,96 116,124 172,152 228,176 284,192 340,206" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="60" cy="76" r="3" fill="#0A0A0B"/><circle cx="340" cy="200" r="3" fill="#0A0A0B"/>\
<text x="205" y="118" class="annot" text-anchor="middle">asymmetry discount</text>\
<text x="330" y="228" class="annot" text-anchor="end">only noise remains</text>\
<text x="200" y="262" class="axis-label" text-anchor="middle">MARKET ROUNDS →</text>\
<text x="420" y="22" class="panel-tag">B · WITH COLLATERAL AND REFUND</text>\
<text x="420" y="38" class="panel-title">The cost of error gets internalized</text>\
<line x1="420" y1="60" x2="700" y2="60" class="grid"/><line x1="420" y1="105" x2="700" y2="105" class="grid"/><line x1="420" y1="150" x2="700" y2="150" class="grid"/><line x1="420" y1="195" x2="700" y2="195" class="grid"/>\
<line x1="420" y1="240" x2="700" y2="240" class="axis-line"/><line x1="420" y1="56" x2="420" y2="240" class="axis-line"/>\
<path d="M420,76 L476,92 L532,100 L588,96 L644,88 L700,80 L700,84 L644,92 L588,98 L532,104 L476,108 L420,120 Z" fill="url(#wedgeB)"/>\
<polyline points="420,76 476,92 532,100 588,96 644,88 700,80" fill="none" stroke="url(#sunsetLine)" stroke-width="2.75" stroke-linejoin="round" stroke-linecap="round"/>\
<polyline points="420,120 476,108 532,104 588,98 644,92 700,84" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="700" cy="80" r="3.4" fill="#FF3333"/><circle cx="420" cy="120" r="3" fill="#5F5E5A"/>\
<line x1="700" y1="80" x2="700" y2="84" stroke="#0A0A0B" stroke-width="1"/>\
<text x="694" y="70" class="annot" text-anchor="end">the gap closes: price</text>\
<text x="694" y="82" class="annot" text-anchor="end">reflects verified quality</text>\
<text x="440" y="136" class="annot">the stake filters entry</text>\
<text x="560" y="262" class="axis-label" text-anchor="middle">MARKET ROUNDS →</text>\
<line x1="380" y1="14" x2="380" y2="270" stroke="#E2E0DA" stroke-width="1"/>\
</svg>\
<div class="legend">\
<div><span class="swatch" style="background:#0A0A0B"></span> Average supply quality</div>\
<div><span class="swatch dash"></span> Price the buyer is willing to pay</div>\
<div><span class="swatch" style="background:linear-gradient(90deg,#F5A623,#FF3333)"></span> Average quality with reputational collateral</div>\
</div>\
</div>';

  TPL.es.score = '<div class="exhibit">\
<h2>El peso de cada variable refleja cuánto puede manipularse: el rendimiento real domina, la racha casi no cuenta</h2>\
<div class="rule"></div>\
<p class="sub">El score de confianza no agrega opiniones: agrega hechos resueltos. Cada componente entra normalizado entre 0 y 1, y la suma ponderada determina tanto la posición del Maker como el precio que puede cobrar.</p>\
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Barra apilada de 100% mostrando los pesos del score de confianza: yield 40%, aciertos 30%, muestra 20%, racha 10%.">\
<defs>\
<linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#FF3333"/></linearGradient>\
<linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="100%" stop-color="#FF6B00"/></linearGradient>\
</defs>\
<text x="60" y="18" class="panel-tag">COMPOSICIÓN DEL SCORE · SUMA PONDERADA = 1.00</text>\
<rect x="60" y="36" width="256" height="52" fill="url(#sg)"/>\
<rect x="318" y="36" width="190" height="52" fill="url(#sg2)"/>\
<rect x="510" y="36" width="126" height="52" fill="#3F3F44"/>\
<rect x="638" y="36" width="62" height="52" fill="#8A8A90"/>\
<text x="72" y="70" class="seg-w">40%</text><text x="330" y="70" class="seg-w">30%</text><text x="522" y="70" class="seg-w">20%</text><text x="650" y="70" class="seg-w">10%</text>\
<line x1="120" y1="88" x2="120" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="378" y1="88" x2="378" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="556" y1="88" x2="556" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="664" y1="88" x2="664" y2="112" stroke="#E2E0DA" stroke-width="1"/>\
<text x="60" y="128" class="seg-n">Yield · rendimiento real</text>\
<text x="60" y="146" class="seg-d">Lo único que mide si generó</text><text x="60" y="160" class="seg-d">valor, no solo si acertó.</text><text x="60" y="174" class="seg-d">Se topa en +100%.</text>\
<text x="318" y="128" class="seg-n">Aciertos</text>\
<text x="318" y="146" class="seg-d">La métrica más legible</text><text x="318" y="160" class="seg-d">para el comprador.</text>\
<text x="510" y="128" class="seg-n">Muestra</text>\
<text x="510" y="146" class="seg-d">Castiga el 2 de 2.</text><text x="510" y="160" class="seg-d">Máximo recién con</text><text x="510" y="174" class="seg-d">20 predicciones resueltas.</text>\
<text x="638" y="128" class="seg-n">Racha</text>\
<text x="638" y="146" class="seg-d">La más ruidosa</text><text x="638" y="160" class="seg-d">y manipulable:</text><text x="638" y="174" class="seg-d">pesa poco a propósito.</text>\
<text x="60" y="222" class="panel-tag">VENTANA DE CÁLCULO</text>\
<line x1="60" y1="248" x2="700" y2="248" stroke="#E2E0DA" stroke-width="1"/>\
<rect x="470" y="240" width="230" height="16" fill="#FF6B00" opacity="0.14"/>\
<line x1="470" y1="234" x2="470" y2="262" stroke="#0A0A0B" stroke-width="1.5"/><line x1="700" y1="234" x2="700" y2="262" stroke="#0A0A0B" stroke-width="1.5"/>\
<polyline points="60,248 470,248" fill="none" stroke="#C9C7BF" stroke-width="2" stroke-dasharray="4 4"/>\
<text x="60" y="278" class="axis-label">HISTORIAL ANTIGUO · NO PONDERA</text>\
<text x="700" y="278" class="axis-label" text-anchor="end">ÚLTIMOS 90 DÍAS · FORMA RECIENTE</text>\
<text x="700" y="230" class="seg-d" text-anchor="end">ventana móvil: el score se recalcula en cada resolución</text>\
</svg>\
<div class="formula">score = 0.40·yield + 0.30·aciertos + 0.20·muestra + 0.10·racha &nbsp;<span>→ [0,1]</span><br>precio = 1 + 4 · score · calidad_del_mercado &nbsp;<span>→ piso $1 · techo $5</span></div>\
</div>';

  TPL.en.score = '<div class="exhibit">\
<h2>Each variable’s weight reflects how manipulable it is: real performance dominates, streak barely counts</h2>\
<div class="rule"></div>\
<p class="sub">The trust score doesn’t aggregate opinions: it aggregates resolved facts. Each component is normalized between 0 and 1, and the weighted sum determines both the Maker’s ranking and the price they can charge.</p>\
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacked 100% bar showing the trust score weights: yield 40%, hit rate 30%, sample 20%, streak 10%.">\
<defs>\
<linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#FF3333"/></linearGradient>\
<linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="100%" stop-color="#FF6B00"/></linearGradient>\
</defs>\
<text x="60" y="18" class="panel-tag">SCORE COMPOSITION · WEIGHTED SUM = 1.00</text>\
<rect x="60" y="36" width="256" height="52" fill="url(#sg)"/>\
<rect x="318" y="36" width="190" height="52" fill="url(#sg2)"/>\
<rect x="510" y="36" width="126" height="52" fill="#3F3F44"/>\
<rect x="638" y="36" width="62" height="52" fill="#8A8A90"/>\
<text x="72" y="70" class="seg-w">40%</text><text x="330" y="70" class="seg-w">30%</text><text x="522" y="70" class="seg-w">20%</text><text x="650" y="70" class="seg-w">10%</text>\
<line x1="120" y1="88" x2="120" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="378" y1="88" x2="378" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="556" y1="88" x2="556" y2="112" stroke="#E2E0DA" stroke-width="1"/><line x1="664" y1="88" x2="664" y2="112" stroke="#E2E0DA" stroke-width="1"/>\
<text x="60" y="128" class="seg-n">Yield · real return</text>\
<text x="60" y="146" class="seg-d">The only thing that measures</text><text x="60" y="160" class="seg-d">value created, not just luck.</text><text x="60" y="174" class="seg-d">Caps at +100%.</text>\
<text x="318" y="128" class="seg-n">Hit rate</text>\
<text x="318" y="146" class="seg-d">The most legible metric</text><text x="318" y="160" class="seg-d">for the buyer.</text>\
<text x="510" y="128" class="seg-n">Sample</text>\
<text x="510" y="146" class="seg-d">Punishes 2-for-2.</text><text x="510" y="160" class="seg-d">Maxes out only at</text><text x="510" y="174" class="seg-d">20 resolved predictions.</text>\
<text x="638" y="128" class="seg-n">Streak</text>\
<text x="638" y="146" class="seg-d">The noisiest</text><text x="638" y="160" class="seg-d">and most manipulable:</text><text x="638" y="174" class="seg-d">weighted low on purpose.</text>\
<text x="60" y="222" class="panel-tag">CALCULATION WINDOW</text>\
<line x1="60" y1="248" x2="700" y2="248" stroke="#E2E0DA" stroke-width="1"/>\
<rect x="470" y="240" width="230" height="16" fill="#FF6B00" opacity="0.14"/>\
<line x1="470" y1="234" x2="470" y2="262" stroke="#0A0A0B" stroke-width="1.5"/><line x1="700" y1="234" x2="700" y2="262" stroke="#0A0A0B" stroke-width="1.5"/>\
<polyline points="60,248 470,248" fill="none" stroke="#C9C7BF" stroke-width="2" stroke-dasharray="4 4"/>\
<text x="60" y="278" class="axis-label">OLD HISTORY · UNWEIGHTED</text>\
<text x="700" y="278" class="axis-label" text-anchor="end">LAST 90 DAYS · RECENT FORM</text>\
<text x="700" y="230" class="seg-d" text-anchor="end">rolling window: the score recalculates on every resolution</text>\
</svg>\
<div class="formula">score = 0.40·yield + 0.30·hit rate + 0.20·sample + 0.10·streak &nbsp;<span>→ [0,1]</span><br>price = 1 + 4 · score · market_quality &nbsp;<span>→ floor $1 · cap $5</span></div>\
</div>';

  TPL.es.alpha = '<div class="exhibit">\
<h2>El alpha se destruye al distribuirse: las plazas se derivan del volumen que el mercado puede absorber, no de la urgencia del comprador</h2>\
<div class="rule"></div>\
<p class="sub">Un insight vendido a todos deja de ser un insight. La restricción no es comercial sino física: si las órdenes que genera el pronóstico exceden lo que el mercado subyacente absorbe, el precio se ajusta y la ventaja desaparece antes de ejecutarse.</p>\
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Panel A: curva de decaimiento del valor del insight en el tiempo. Panel B: escalera de plazas habilitadas según el volumen del evento, con el tramo de entrada sin límite.">\
<defs>\
<linearGradient id="decay" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="40%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#8A8A90"/></linearGradient>\
<linearGradient id="fadeArea" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.18"/><stop offset="100%" stop-color="#FF6B00" stop-opacity="0.01"/></linearGradient>\
<linearGradient id="stepFill" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.10"/><stop offset="100%" stop-color="#F5A623" stop-opacity="0.22"/></linearGradient>\
</defs>\
<text x="60" y="18" class="panel-tag">A · ENTROPÍA INFORMATIVA</text>\
<text x="60" y="34" class="panel-title">El valor del insight en el tiempo</text>\
<line x1="60" y1="60" x2="340" y2="60" class="grid"/><line x1="60" y1="105" x2="340" y2="105" class="grid"/><line x1="60" y1="150" x2="340" y2="150" class="grid"/><line x1="60" y1="195" x2="340" y2="195" class="grid"/>\
<line x1="60" y1="240" x2="340" y2="240" class="axis-line"/><line x1="60" y1="52" x2="60" y2="240" class="axis-line"/>\
<text x="52" y="66" class="axis-label" text-anchor="end">MÁX</text><text x="52" y="243" class="axis-label" text-anchor="end">0</text>\
<path d="M60,70 C 90,88 110,122 140,158 C 175,196 240,222 340,233 L340,240 L60,240 Z" fill="url(#fadeArea)"/>\
<path d="M60,70 C 90,88 110,122 140,158 C 175,196 240,222 340,233" fill="none" stroke="url(#decay)" stroke-width="2.75" stroke-linecap="round"/>\
<line x1="140" y1="52" x2="140" y2="240" stroke="#0A0A0B" stroke-width="1" stroke-dasharray="3 3"/>\
<text x="66" y="48" class="annot-b">ventana privada</text>\
<text x="146" y="48" class="annot">información ya pública (beta)</text>\
<circle cx="60" cy="70" r="3.4" fill="#F5A623"/>\
<text x="70" y="88" class="annot">el Maker publica</text>\
<circle cx="340" cy="233" r="3" fill="#8A8A90"/>\
<text x="334" y="222" class="annot" text-anchor="end">el mercado ya se ajustó</text>\
<text x="200" y="262" class="axis-label" text-anchor="middle">MINUTOS DESDE LA PUBLICACIÓN →</text>\
<text x="420" y="18" class="panel-tag">B · ASIGNACIÓN DE CAPACIDAD</text>\
<text x="420" y="34" class="panel-title">Plazas habilitadas por evento</text>\
<line x1="420" y1="105" x2="700" y2="105" class="grid"/><line x1="420" y1="150" x2="700" y2="150" class="grid"/><line x1="420" y1="195" x2="700" y2="195" class="grid"/>\
<line x1="420" y1="240" x2="700" y2="240" class="axis-line"/><line x1="420" y1="52" x2="420" y2="240" class="axis-line"/>\
<path d="M420,215 L476,215 L476,188 L532,188 L532,152 L588,152 L588,118 L644,118 L644,88 L700,88 L700,240 L420,240 Z" fill="url(#stepFill)"/>\
<polyline points="420,215 476,215 476,188 532,188 532,152 588,152 588,118 644,118 644,88 700,88" fill="none" stroke="#0A0A0B" stroke-width="2.25" stroke-linejoin="miter"/>\
<line x1="420" y1="66" x2="700" y2="66" stroke="url(#decay)" stroke-width="2.25" stroke-dasharray="6 4"/>\
<text x="424" y="60" class="annot-b">TRAMO DE ENTRADA · $1 · SIN LÍMITE DE PLAZAS</text>\
<text x="700" y="80" class="axis-label" text-anchor="end">∞</text>\
<text x="424" y="232" class="annot">mercado delgado</text>\
<text x="696" y="106" class="annot" text-anchor="end">mercado profundo</text>\
<text x="560" y="262" class="axis-label" text-anchor="middle">VOLUMEN DEL MERCADO SUBYACENTE →</text>\
<line x1="380" y1="10" x2="380" y2="272" stroke="#E2E0DA" stroke-width="1"/>\
</svg>\
</div>';

  TPL.en.alpha = '<div class="exhibit">\
<h2>Alpha decays as it spreads: seats are derived from the volume the market can absorb, not from the buyer’s urgency</h2>\
<div class="rule"></div>\
<p class="sub">An insight sold to everyone stops being an insight. The constraint isn’t commercial, it’s physical: if the orders a forecast generates exceed what the underlying market can absorb, the price adjusts and the edge disappears before it can be executed.</p>\
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Panel A: decay curve of insight value over time. Panel B: step function of seats enabled by event volume, with an uncapped entry tier.">\
<defs>\
<linearGradient id="decay" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="40%" stop-color="#FF6B00"/><stop offset="100%" stop-color="#8A8A90"/></linearGradient>\
<linearGradient id="fadeArea" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.18"/><stop offset="100%" stop-color="#FF6B00" stop-opacity="0.01"/></linearGradient>\
<linearGradient id="stepFill" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#FF6B00" stop-opacity="0.10"/><stop offset="100%" stop-color="#F5A623" stop-opacity="0.22"/></linearGradient>\
</defs>\
<text x="60" y="18" class="panel-tag">A · INFORMATION ENTROPY</text>\
<text x="60" y="34" class="panel-title">The value of an insight over time</text>\
<line x1="60" y1="60" x2="340" y2="60" class="grid"/><line x1="60" y1="105" x2="340" y2="105" class="grid"/><line x1="60" y1="150" x2="340" y2="150" class="grid"/><line x1="60" y1="195" x2="340" y2="195" class="grid"/>\
<line x1="60" y1="240" x2="340" y2="240" class="axis-line"/><line x1="60" y1="52" x2="60" y2="240" class="axis-line"/>\
<text x="52" y="66" class="axis-label" text-anchor="end">MAX</text><text x="52" y="243" class="axis-label" text-anchor="end">0</text>\
<path d="M60,70 C 90,88 110,122 140,158 C 175,196 240,222 340,233 L340,240 L60,240 Z" fill="url(#fadeArea)"/>\
<path d="M60,70 C 90,88 110,122 140,158 C 175,196 240,222 340,233" fill="none" stroke="url(#decay)" stroke-width="2.75" stroke-linecap="round"/>\
<line x1="140" y1="52" x2="140" y2="240" stroke="#0A0A0B" stroke-width="1" stroke-dasharray="3 3"/>\
<text x="66" y="48" class="annot-b">private window</text>\
<text x="146" y="48" class="annot">already public (beta)</text>\
<circle cx="60" cy="70" r="3.4" fill="#F5A623"/>\
<text x="70" y="88" class="annot">Maker publishes</text>\
<circle cx="340" cy="233" r="3" fill="#8A8A90"/>\
<text x="334" y="222" class="annot" text-anchor="end">market has already adjusted</text>\
<text x="200" y="262" class="axis-label" text-anchor="middle">MINUTES SINCE PUBLICATION →</text>\
<text x="420" y="18" class="panel-tag">B · CAPACITY ALLOCATION</text>\
<text x="420" y="34" class="panel-title">Seats enabled per event</text>\
<line x1="420" y1="105" x2="700" y2="105" class="grid"/><line x1="420" y1="150" x2="700" y2="150" class="grid"/><line x1="420" y1="195" x2="700" y2="195" class="grid"/>\
<line x1="420" y1="240" x2="700" y2="240" class="axis-line"/><line x1="420" y1="52" x2="420" y2="240" class="axis-line"/>\
<path d="M420,215 L476,215 L476,188 L532,188 L532,152 L588,152 L588,118 L644,118 L644,88 L700,88 L700,240 L420,240 Z" fill="url(#stepFill)"/>\
<polyline points="420,215 476,215 476,188 532,188 532,152 588,152 588,118 644,118 644,88 700,88" fill="none" stroke="#0A0A0B" stroke-width="2.25" stroke-linejoin="miter"/>\
<line x1="420" y1="66" x2="700" y2="66" stroke="url(#decay)" stroke-width="2.25" stroke-dasharray="6 4"/>\
<text x="424" y="60" class="annot-b">ENTRY TIER · $1 · NO SEAT LIMIT</text>\
<text x="700" y="80" class="axis-label" text-anchor="end">∞</text>\
<text x="424" y="232" class="annot">thin market</text>\
<text x="696" y="106" class="annot" text-anchor="end">deep market</text>\
<text x="560" y="262" class="axis-label" text-anchor="middle">UNDERLYING MARKET VOLUME →</text>\
<line x1="380" y1="10" x2="380" y2="272" stroke="#E2E0DA" stroke-width="1"/>\
</svg>\
</div>';

  TPL.es.calibracion = '<div class="exhibit">\
<h2>La autoridad de un Maker no es acertar: es que la probabilidad que declara coincida con la frecuencia con que el hecho ocurre</h2>\
<div class="rule"></div>\
<p class="sub">Cada punto agrupa las predicciones emitidas con una misma probabilidad declarada; el eje vertical registra con qué frecuencia esos eventos efectivamente ocurrieron. Un pronosticador calibrado se apoya sobre la diagonal. Uno que vende certeza cae por debajo, y esa distancia es medible.</p>\
<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de calibración: probabilidad declarada contra frecuencia observada, con un Maker calibrado sobre la diagonal y un pronosticador sobreconfiado por debajo de ella.">\
<defs><linearGradient id="sun" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="100%" stop-color="#FF3333"/></linearGradient></defs>\
<line x1="80" y1="40" x2="440" y2="40" class="grid"/><line x1="80" y1="130" x2="440" y2="130" class="grid"/><line x1="80" y1="220" x2="440" y2="220" class="grid"/><line x1="80" y1="310" x2="440" y2="310" class="grid"/>\
<line x1="170" y1="40" x2="170" y2="400" class="grid"/><line x1="260" y1="40" x2="260" y2="400" class="grid"/><line x1="350" y1="40" x2="350" y2="400" class="grid"/><line x1="440" y1="40" x2="440" y2="400" class="grid"/>\
<line x1="80" y1="400" x2="440" y2="400" class="axis-line"/><line x1="80" y1="40" x2="80" y2="400" class="axis-line"/>\
<line x1="80" y1="400" x2="440" y2="40" stroke="#0A0A0B" stroke-width="1.25" stroke-dasharray="5 4"/>\
<text x="330" y="130" class="zone" transform="rotate(-45 330 130)" text-anchor="middle">calibración perfecta</text>\
<text x="128" y="112" class="zone">subconfianza</text><text x="130" y="126" class="zone">ocurre más de lo</text><text x="130" y="139" class="zone">que se declara</text>\
<text x="396" y="330" class="zone" text-anchor="end">sobreconfianza</text><text x="396" y="344" class="zone" text-anchor="end">se promete más de lo</text><text x="396" y="357" class="zone" text-anchor="end">que se entrega</text>\
<polyline points="116,357 170,321 224,245 278,213 332,155 386,101 422,69" fill="none" stroke="url(#sun)" stroke-width="2.25" stroke-linejoin="round"/>\
<circle cx="116" cy="357" r="4.5" fill="#F5A623"/><circle cx="170" cy="321" r="6" fill="#F89A1A"/><circle cx="224" cy="245" r="8" fill="#FC850E"/><circle cx="278" cy="213" r="9" fill="#FF6B00"/><circle cx="332" cy="155" r="7.5" fill="#FF5719"/><circle cx="386" cy="101" r="6" fill="#FF4527"/><circle cx="422" cy="69" r="4.5" fill="#FF3333"/>\
<polyline points="260,256 296,238 350,220 386,213 404,202 422,191" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="260" cy="256" r="5" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="296" cy="238" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="350" cy="220" r="7.5" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="386" cy="213" r="8" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="404" cy="202" r="7" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="422" cy="191" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/>\
<line x1="422" y1="78" x2="422" y2="183" stroke="#0A0A0B" stroke-width="1" stroke-dasharray="2 2"/>\
<line x1="416" y1="78" x2="428" y2="78" stroke="#0A0A0B" stroke-width="1"/><line x1="416" y1="183" x2="428" y2="183" stroke="#0A0A0B" stroke-width="1"/>\
<text x="72" y="404" class="tick" text-anchor="end">0</text><text x="72" y="314" class="tick" text-anchor="end">25</text><text x="72" y="224" class="tick" text-anchor="end">50</text><text x="72" y="134" class="tick" text-anchor="end">75</text><text x="72" y="44" class="tick" text-anchor="end">100</text>\
<text x="80" y="418" class="tick" text-anchor="middle">0</text><text x="170" y="418" class="tick" text-anchor="middle">25</text><text x="260" y="418" class="tick" text-anchor="middle">50</text><text x="350" y="418" class="tick" text-anchor="middle">75</text><text x="440" y="418" class="tick" text-anchor="middle">100</text>\
<text x="260" y="440" class="axis-t" text-anchor="middle">PROBABILIDAD DECLARADA (%) →</text>\
<text x="34" y="220" class="axis-t" text-anchor="middle" transform="rotate(-90 34 220)">FRECUENCIA OBSERVADA (%) →</text>\
<line x1="480" y1="40" x2="480" y2="400" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="52" class="k-tag">SERIES</text>\
<circle cx="508" cy="76" r="6" fill="#FF6B00"/>\
<text x="524" y="80" class="k-t">Maker calibrado</text>\
<text x="500" y="98" class="k-d">Cuando declara 70%, ocurre cerca del 70%.</text><text x="500" y="112" class="k-d">Su ventaja no es la certeza: es saber</text><text x="500" y="126" class="k-d">cuánta certeza tiene.</text>\
<circle cx="508" cy="152" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/>\
<text x="524" y="156" class="k-t">Vendedor de certeza</text>\
<text x="500" y="174" class="k-d">Declara 90% y acierta la mitad. En una red</text><text x="500" y="188" class="k-d">social gana audiencia; acá acumula</text><text x="500" y="202" class="k-d">reembolsos y pierde colateral.</text>\
<line x1="500" y1="222" x2="740" y2="222" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="246" class="k-tag">TAMAÑO DEL PUNTO</text>\
<text x="500" y="266" class="k-d">Número de predicciones resueltas en ese</text><text x="500" y="280" class="k-d">tramo. Sin muestra suficiente no hay</text><text x="500" y="294" class="k-d">calibración: hay ruido.</text>\
<line x1="500" y1="314" x2="740" y2="314" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="338" class="k-tag">CONSECUENCIA EN EL CONTRATO</text>\
<text x="500" y="358" class="k-d">Fallar una predicción declarada al 90%</text><text x="500" y="372" class="k-d">cuesta más que fallar una declarada al 51%.</text>\
<text x="500" y="392" class="k-d" font-weight="600" fill="#0A0A0B">Un sistema que castiga todos los errores por</text><text x="500" y="406" class="k-d" font-weight="600" fill="#0A0A0B">igual premia la cobardía.</text>\
</svg>\
</div>';

  TPL.en.calibracion = '<div class="exhibit">\
<h2>A Maker’s authority isn’t being right: it’s that the probability they declare matches how often the fact actually occurs</h2>\
<div class="rule"></div>\
<p class="sub">Each point groups predictions issued at the same declared probability; the vertical axis tracks how often those events actually occurred. A calibrated forecaster sits on the diagonal. One who sells certainty falls below it, and that distance is measurable.</p>\
<svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calibration diagram: declared probability against observed frequency, with a calibrated Maker on the diagonal and an overconfident forecaster below it.">\
<defs><linearGradient id="sun" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623"/><stop offset="100%" stop-color="#FF3333"/></linearGradient></defs>\
<line x1="80" y1="40" x2="440" y2="40" class="grid"/><line x1="80" y1="130" x2="440" y2="130" class="grid"/><line x1="80" y1="220" x2="440" y2="220" class="grid"/><line x1="80" y1="310" x2="440" y2="310" class="grid"/>\
<line x1="170" y1="40" x2="170" y2="400" class="grid"/><line x1="260" y1="40" x2="260" y2="400" class="grid"/><line x1="350" y1="40" x2="350" y2="400" class="grid"/><line x1="440" y1="40" x2="440" y2="400" class="grid"/>\
<line x1="80" y1="400" x2="440" y2="400" class="axis-line"/><line x1="80" y1="40" x2="80" y2="400" class="axis-line"/>\
<line x1="80" y1="400" x2="440" y2="40" stroke="#0A0A0B" stroke-width="1.25" stroke-dasharray="5 4"/>\
<text x="330" y="130" class="zone" transform="rotate(-45 330 130)" text-anchor="middle">perfect calibration</text>\
<text x="128" y="112" class="zone">underconfidence</text><text x="130" y="126" class="zone">occurs more often</text><text x="130" y="139" class="zone">than declared</text>\
<text x="396" y="330" class="zone" text-anchor="end">overconfidence</text><text x="396" y="344" class="zone" text-anchor="end">promises more than</text><text x="396" y="357" class="zone" text-anchor="end">it delivers</text>\
<polyline points="116,357 170,321 224,245 278,213 332,155 386,101 422,69" fill="none" stroke="url(#sun)" stroke-width="2.25" stroke-linejoin="round"/>\
<circle cx="116" cy="357" r="4.5" fill="#F5A623"/><circle cx="170" cy="321" r="6" fill="#F89A1A"/><circle cx="224" cy="245" r="8" fill="#FC850E"/><circle cx="278" cy="213" r="9" fill="#FF6B00"/><circle cx="332" cy="155" r="7.5" fill="#FF5719"/><circle cx="386" cy="101" r="6" fill="#FF4527"/><circle cx="422" cy="69" r="4.5" fill="#FF3333"/>\
<polyline points="260,256 296,238 350,220 386,213 404,202 422,191" fill="none" stroke="#5F5E5A" stroke-width="2" stroke-dasharray="5 3.5" stroke-linejoin="round"/>\
<circle cx="260" cy="256" r="5" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="296" cy="238" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="350" cy="220" r="7.5" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="386" cy="213" r="8" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="404" cy="202" r="7" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/><circle cx="422" cy="191" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/>\
<line x1="422" y1="78" x2="422" y2="183" stroke="#0A0A0B" stroke-width="1" stroke-dasharray="2 2"/>\
<line x1="416" y1="78" x2="428" y2="78" stroke="#0A0A0B" stroke-width="1"/><line x1="416" y1="183" x2="428" y2="183" stroke="#0A0A0B" stroke-width="1"/>\
<text x="72" y="404" class="tick" text-anchor="end">0</text><text x="72" y="314" class="tick" text-anchor="end">25</text><text x="72" y="224" class="tick" text-anchor="end">50</text><text x="72" y="134" class="tick" text-anchor="end">75</text><text x="72" y="44" class="tick" text-anchor="end">100</text>\
<text x="80" y="418" class="tick" text-anchor="middle">0</text><text x="170" y="418" class="tick" text-anchor="middle">25</text><text x="260" y="418" class="tick" text-anchor="middle">50</text><text x="350" y="418" class="tick" text-anchor="middle">75</text><text x="440" y="418" class="tick" text-anchor="middle">100</text>\
<text x="260" y="440" class="axis-t" text-anchor="middle">DECLARED PROBABILITY (%) →</text>\
<text x="34" y="220" class="axis-t" text-anchor="middle" transform="rotate(-90 34 220)">OBSERVED FREQUENCY (%) →</text>\
<line x1="480" y1="40" x2="480" y2="400" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="52" class="k-tag">SERIES</text>\
<circle cx="508" cy="76" r="6" fill="#FF6B00"/>\
<text x="524" y="80" class="k-t">Calibrated Maker</text>\
<text x="500" y="98" class="k-d">When they declare 70%, it happens close to 70%.</text><text x="500" y="112" class="k-d">Their edge isn’t certainty: it’s knowing</text><text x="500" y="126" class="k-d">how much certainty they have.</text>\
<circle cx="508" cy="152" r="6" fill="#FAFAF8" stroke="#5F5E5A" stroke-width="1.75"/>\
<text x="524" y="156" class="k-t">Certainty seller</text>\
<text x="500" y="174" class="k-d">Declares 90% and gets it right half the time. On a</text><text x="500" y="188" class="k-d">social network this builds an audience; here it racks up</text><text x="500" y="202" class="k-d">refunds and burns collateral.</text>\
<line x1="500" y1="222" x2="740" y2="222" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="246" class="k-tag">POINT SIZE</text>\
<text x="500" y="266" class="k-d">Number of resolved predictions in that</text><text x="500" y="280" class="k-d">bracket. Without enough sample there’s no</text><text x="500" y="294" class="k-d">calibration: there’s noise.</text>\
<line x1="500" y1="314" x2="740" y2="314" stroke="#E2E0DA" stroke-width="1"/>\
<text x="500" y="338" class="k-tag">CONTRACT CONSEQUENCE</text>\
<text x="500" y="358" class="k-d">Missing a prediction declared at 90%</text><text x="500" y="372" class="k-d">costs far more than missing one declared at 51%.</text>\
<text x="500" y="392" class="k-d" font-weight="600" fill="#0A0A0B">A system that punishes every miss</text><text x="500" y="406" class="k-d" font-weight="600" fill="#0A0A0B">equally rewards cowardice.</text>\
</svg>\
</div>';

  class LatticeExhibit extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this._kind = this.getAttribute('exhibit') || 'limones';
      this._root = this.attachShadow({ mode: 'open' });
      this._render();
      var self = this;
      this._onLang = function () { self._render(); };
      window.addEventListener('lattice:lang', this._onLang);
    }

    disconnectedCallback() {
      if (this._onLang) window.removeEventListener('lattice:lang', this._onLang);
    }

    _render() {
      var dict = TPL[curLang()] || TPL.es;
      this._root.innerHTML = '<style>' + CSS + '</style>' + (dict[this._kind] || '');
    }
  }
  customElements.define('lattice-exhibit', LatticeExhibit);
})();
