'use client';

import ResearchArticle, { type Block } from '@/components/ResearchArticle';
import type { PageDict } from '@/lib/i18n';

const T: PageDict = {
  es: {
    'meta.breadcrumbTail': ' / Asimetría de Información',
    h1: 'El mercado de los limones tiene canal de Telegram',
    dek: 'Cuando hablar es gratis, el buen análisis no encuentra comprador. El equipo de Lattice partió de ese diagnóstico y llegó a una sola conclusión operativa: la única forma de arreglar un mercado de información es hacer que equivocarse cueste.',
    'meta.writtenBy': 'ESCRITO POR',
    'meta.published': 'PUBLICADO',
    'meta.publishedDate': '2 de junio de 2026',
    'meta.updated': 'ÚLTIMA ACTUALIZACIÓN',
    'meta.updatedDate': '10 de julio de 2026',
    p1: 'El vendedor de autos usados sabe cuál de los dos coches del lote tiene la caja de cambios rota. El comprador no. Como no puede distinguirlos, no va a pagar el precio del auto bueno: va a pagar un promedio entre el bueno y el roto. Y ahí empieza el desastre, porque a ese precio promedio el dueño del auto bueno prefiere no vender. Se retira. Lo que queda en el lote es cada vez peor, el comprador lo intuye, ofrece menos, y el ciclo se repite hasta que solo quedan cacharros.',
    p2: 'George Akerlof describió esto en 1970 y le valió el Nobel. Lo llamó el mercado de los limones ("limón" es el auto malo), y su hallazgo incómodo fue que no hace falta ningún estafador para que un mercado colapse. Basta con que el vendedor sepa algo que el comprador no puede verificar. La <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">asimetría de información</span> (la brecha entre lo que sabe quien vende y lo que puede comprobar quien compra) no degrada el producto: expulsa al bueno.',
    p3: 'Reemplácese el auto por un pronóstico y se obtiene el mercado de información que existe hoy. Ese fue el punto de partida del equipo de Lattice.',
    figcaption1:
      '<strong style="color:#3F3F44;font-weight:600">Lectura:</strong> en A, el comprador no puede distinguir calidad, descuenta a todos y el oferente riguroso se retira; cada retiro baja la calidad media y realimenta el descuento. En B, el colateral y la garantía de reembolso hacen que el error tenga costo, de modo que el precio vuelve a informar sobre la calidad. <strong style="color:#3F3F44;font-weight:600">Fuente:</strong> esquema conceptual construido a partir de Akerlof, G. (1970), <em>The Market for "Lemons"</em>. Curvas ilustrativas del mecanismo; no representan datos empíricos.',
    'h2.1': 'Por qué el buen análisis no encuentra comprador',
    p4: 'Un analista que hizo el trabajo real (el que armó el modelo, revisó los datos, calibró la probabilidad) y un tipo que copió un gráfico y le puso una flecha verde publican en la misma pantalla, con la misma tipografía, con el mismo tono de certeza. Desde afuera son indistinguibles. El buen analista tiene además un problema estructural: no puede probar que es bueno sin exponer el análisis, y una vez que lo expone, ya lo regaló.',
    p5: 'Como el lector no puede separarlos, hace lo mismo que el comprador de autos: descuenta a todos. Asume que le están vendiendo un limón. Ese descuento es lo que los economistas llaman <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">selección adversa</span>: el precio cae hasta un punto en el que solo tiene sentido quedarse a quien no le costó nada producir lo que vende. El que hizo el trabajo se va a otro lado (a un fondo, a un empleo asalariado, al silencio) y el que se queda es el que puede publicar cien pronósticos al mes porque no le importa ninguno.',
    p6: 'El equipo insiste en ser preciso sobre dónde está la falla, porque de ese diagnóstico depende todo lo demás. No es que la gente mienta más que antes. Es que el costo de estar equivocado se externaliza por completo: lo paga el que siguió el consejo, nunca el que lo dio. El influencer financiero recomienda una posición, sus seguidores pierden, y al mes siguiente él tiene más audiencia, porque el algoritmo premia el volumen y la convicción, no el acierto. El sistema está haciendo exactamente lo que se le pidió.',
    p7: 'Un problema de incentivos no se resuelve con mejores intenciones. Se resuelve cambiando el contrato.',
    'h2.2': 'El que da la opinión tiene que poder perder',
    p8: 'Nassim Taleb (2018) formuló la corrección en una frase brutal: no me digas lo que pensás, decime qué tenés en la cartera. Su argumento sobre el <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">skin in the game</span> (tener algo propio en riesgo) suele leerse mal, como si fuera un problema de alineación: compartir la ganancia entre asesor y cliente. Taleb dice lo contrario. No se trata de compartir la ganancia sino de compartir la pérdida. La simetría que importa no es cobrar juntos, es pagar juntos.',
    p9: 'Lattice tomó ese principio y lo bajó a un contrato ejecutable, que es donde el argumento de Taleb todavía no había llegado. El Maker (quien vende un pronóstico) deposita un colateral reputacional: pone en garantía capital y reputación medible detrás de cada predicción. El Taker (quien lo compra) recibe una garantía de reembolso: si el pronóstico falla, el smart contract le devuelve lo que pagó y ejecuta la penalización sobre el Maker. Automáticamente, sin apelación, sin necesidad de que nadie se enoje.',
    p10: 'Ese último punto llegó al diseño por una discusión interna que vale la pena contar. En cualquier plataforma social, cuando un gurú falla se activa un ciclo de resentimiento: linchamiento público, listas negras, y del otro lado alianzas defensivas entre quienes se cubren mutuamente. Robert Axelrod (1984) mostró que la reciprocidad estricta (el <em>tit for tat</em>) puede sostener la cooperación entre agentes, pero el equipo llegó a la conclusión de que ejecutarla con emociones humanas y sin árbitro produce lo contrario: colusión de un lado, represalia del otro, y en el medio un mercado que deja de descubrir precios porque la gente vota con su rencor y no con su criterio.',
    p11: 'Por eso Lattice despersonaliza el castigo. El Taker no necesita odiar al Maker que falló, porque el sistema ya le cobró. La venganza se automatiza y, al automatizarse, deja de contaminar la señal.',
    pullquote: 'El mercado no necesita creerte. Necesita poder cobrarte.',
    p12: 'Conviene decir con claridad qué es de quién. Akerlof describió la enfermedad en 1970. Taleb nombró el remedio en 2018. Axelrod explicó por qué la reciprocidad humana no alcanza para administrarlo. Ninguno de los tres escribió el contrato. La arquitectura que combina colateral, reembolso automático, reputación calculada y asignación de plazas (y en la que cada pieza existe para tapar un agujero que la anterior deja abierto) es autoría de Lattice.',
    'h2.3': 'La reputación no se vota: se calcula',
    p13: 'De ahí se sigue una decisión que el equipo tomó temprano y sin ambigüedad: en Lattice no hay reseñas. No hay estrellitas, no hay comentarios, no hay ranking de simpatía. Un sistema de calificaciones (el modelo de Amazon o TripAdvisor) es manipulable por construcción: un vendedor puede coordinar reseñas positivas, un competidor puede hundir a otro con reseñas falsas, y la reputación termina midiendo popularidad y coordinación, no calidad. Reintroducir opiniones habría sido reintroducir el ruido que el resto del sistema existe para eliminar.',
    p14: 'La reputación de un Maker no es una opinión agregada. Es un número calculado sobre hechos verificables: qué predijo, con qué cuota, y si ocurrió. Ese número es el <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">score de confianza</span>, y el equipo se puso de acuerdo en cuatro variables con pesos deliberadamente desiguales: el yield o retorno real que generó (40%), porque es lo único que mide si el Maker creó valor y no solo si tuvo suerte; su porcentaje de aciertos (30%), la métrica más legible para quien compra; el tamaño de la muestra, cuántas predicciones tiene efectivamente resueltas (20%), para que nadie parezca infalible con dos aciertos de dos; y la racha (10%), la métrica más ruidosa y manipulable de las cuatro, que pesa poco justamente por eso. Se recalcula sobre una ventana móvil de noventa días: no es un pedigrí acumulado de por vida, es la forma reciente.',
    p15: 'Y no es decorativo. Ese score determina cuánto puede cobrar el Maker por cada pronóstico. La confiabilidad no es un badge en el perfil: es el precio. (Cómo se construye ese número, y por qué esos pesos y no otros, merece su propio texto.)',
    figcaption2:
      '<strong style="color:#3F3F44;font-weight:600">Lectura:</strong> la reputación no es un badge de perfil. El mismo número que ordena el ranking fija cuánto puede cobrar el Maker por cada pronóstico, y se recalcula cada vez que una predicción se resuelve. <strong style="color:#3F3F44;font-weight:600">Fuente:</strong> implementación del modelo de confiabilidad de Lattice (fuente única de precio y reputación).',
    'h2.4': 'El alpha es hielo bajo el sol',
    p16: 'Falta la pieza que hace que el mercado sobreviva en el tiempo, y es la que más discusión interna costó, porque es contraintuitiva: la información buena no se puede vender infinitas veces.',
    p17: 'Un Maker en São Paulo detecta una discrepancia a las 08:00. En ese momento su ventaja informativa (el <em>alpha</em>, el rendimiento que supera al mercado) es máxima. Si vendiera ese insight a diez mil personas, esas diez mil ejecutarían la misma operación, el mercado subyacente se ajustaría en minutos y el alpha valdría cero. Habría vendido un hielo y entregado un charco.',
    p18: 'Hay además un problema de oferta que el equipo detectó modelando el caso extremo: sin ningún límite, un evento popular atrae a más Makers vendiendo el mismo insight que Takers dispuestos a comprarlo. La ventaja se reparte hasta desaparecer antes siquiera de ejecutarse. El mercado se congestiona del lado equivocado.',
    p19: 'Por eso Lattice asigna las plazas por evento mediante <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">capital allocation</span>: el número de compradores habilitados para un pronóstico se deriva del volumen real del mercado subyacente. Un evento profundo, con mucha liquidez, absorbe más órdenes sin moverse y habilita más plazas. Un mercado delgado habilita pocas. No es escasez fabricada para generar urgencia (eso sería un truco de casino): es la capacidad física del mercado que se está explotando, traducida en cupos.',
    p20: 'Y hay un piso deliberado que evita que esto se convierta en un club. El tramo de entrada, el pronóstico de un dólar, no tiene límite de plazas. La escasez opera sobre el alpha caro y estrecho, nunca sobre el acceso. Habría sido incoherente sostener que el talento no debe pedir permiso para entrar y después construir un mercado donde entrar requiere permiso.',
    p21: 'Dicho con precisión: Lattice no vende verdad. Vende velocidad de procesamiento de la verdad, durante la ventana en que esa verdad todavía es privada.',
    figcaption3:
      '<strong style="color:#3F3F44;font-weight:600">Lectura:</strong> en A, la ventaja informativa se degrada apenas se ejecuta: Lattice no vende verdad, vende la ventana en que esa verdad todavía es privada. En B, las plazas escalan con el volumen del evento (un mercado profundo absorbe más órdenes sin moverse), de modo que la escasez recae sobre el alpha caro y estrecho, nunca sobre el acceso: el tramo de entrada permanece abierto sin límite. <strong style="color:#3F3F44;font-weight:600">Fuente:</strong> mecanismo de asignación de plazas de Lattice; curvas ilustrativas del principio, no datos de mercado. Marco conceptual: Grossman, S. y Stiglitz, J. (1980).',
    'h2.6': 'Coberturas para quien nunca las tuvo',
    p26: 'La consecuencia que más le importa al equipo no es financiera sino social.',
    p27: 'Una aerolínea que teme una suba del petróleo compra derivados y se cubre. Un fondo que teme una suba de tasas se cubre. Un desarrollador freelance en Buenos Aires que cobra en cripto y teme exactamente lo mismo no se cubre, porque nadie le va a redactar un contrato de derivados por su portafolio de cuatro cifras: la barrera de entrada es prohibitiva y siempre lo fue. Su única opción frente a la incertidumbre es aguantar.',
    p28: 'Un mercado de pronósticos verificables abre una puerta intermedia. Ese freelance puede comprarle el análisis macro a quien tiene el mejor track record auditado y ajustar su exposición con esa información; si el Maker se equivoca, recupera lo que pagó. La incertidumbre no desaparece (nada la hace desaparecer), pero por primera vez tiene un precio accesible y una contraparte que responde. Lo mismo vale para el agricultor que necesita una lectura climática y hoy solo tiene el rumor del pueblo.',
    p29: 'La asimetría de información nunca fue un problema abstracto de los libros de texto. Siempre fue la razón por la cual algunos pueden protegerse del futuro y otros solo pueden esperarlo.',
    'sources.heading': 'FUENTES',
    disclaimer: 'Lattice no ofrece asesoramiento de inversión ni instrumentos financieros regulados. Los pronósticos son análisis de terceros; la garantía de reembolso es contractual y no constituye una garantía de rendimiento.',
    'nav.prev': '← ANTERIOR',
    'nav.prevTitle': 'Democracia del Intelecto',
    'nav.backToResearch': 'Volver a Research',
    'nav.next': 'SIGUIENTE →',
    'nav.nextTitle': 'Constitución Humanista',
  },
  en: {
    'meta.breadcrumbTail': ' / Information Asymmetry',
    h1: 'The market for lemons has a Telegram channel',
    dek: "When talk is free, good analysis can't find a buyer. The Lattice team started from that diagnosis and arrived at a single operational conclusion: the only way to fix an information market is to make being wrong cost something.",
    'meta.writtenBy': 'WRITTEN BY',
    'meta.published': 'PUBLISHED',
    'meta.publishedDate': 'June 2, 2026',
    'meta.updated': 'LAST UPDATED',
    'meta.updatedDate': 'July 10, 2026',
    p1: "The used-car dealer knows which of the two cars on the lot has a broken transmission. The buyer doesn't. Since he can't tell them apart, he won't pay the good car's price: he'll pay an average between the good one and the broken one. And that's where the disaster starts, because at that average price the good car's owner would rather not sell. He walks away. What's left on the lot gets worse and worse, the buyer senses it, offers less, and the cycle repeats until only wrecks remain.",
    p2: 'George Akerlof described this in 1970, and it won him the Nobel. He called it the market for lemons (“lemon” being the bad car) and his uncomfortable finding was that no con artist is needed for a market to collapse. It’s enough that the seller knows something the buyer can’t verify. <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">Information asymmetry</span> (the gap between what the seller knows and what the buyer can confirm) doesn’t degrade the product: it drives out the good one.',
    p3: "Replace the car with a forecast and you get the information market that exists today. That was the Lattice team's starting point.",
    figcaption1:
      '<strong style="color:#3F3F44;font-weight:600">Reading:</strong> in A, the buyer can’t tell quality apart, discounts everyone, and the rigorous provider walks away; each exit lowers average quality and feeds back into the discount. In B, collateral and the refund guarantee give error a cost, so price goes back to informing about quality. <strong style="color:#3F3F44;font-weight:600">Source:</strong> conceptual scheme built from Akerlof, G. (1970), <em>The Market for "Lemons"</em>. Illustrative curves of the mechanism; they do not represent empirical data.',
    'h2.1': "Why good analysis can't find a buyer",
    p4: "An analyst who did the real work (who built the model, checked the data, calibrated the probability) and a guy who copy-pasted a chart and slapped a green arrow on it publish on the same screen, in the same typeface, with the same tone of certainty. From the outside they're indistinguishable. The good analyst also has a structural problem: he can't prove he's good without exposing the analysis, and once he exposes it, he's already given it away.",
    p5: 'Since the reader can’t tell them apart, he does the same thing as the car buyer: he discounts everyone. He assumes he’s being sold a lemon. That discount is what economists call <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">adverse selection</span>: the price falls to a point where it only makes sense to stick around for whoever it cost nothing to produce what they’re selling. The one who did the work moves elsewhere (to a fund, to a salaried job, to silence) and the one who stays is the one who can publish a hundred forecasts a month because he doesn’t care about any of them.',
    p6: "The team insists on being precise about where the failure lies, because everything else depends on that diagnosis. It's not that people lie more than before. It's that the cost of being wrong is fully externalized: it's paid by whoever followed the advice, never by whoever gave it. The finance influencer recommends a position, his followers lose, and the next month he has a bigger audience, because the algorithm rewards volume and conviction, not accuracy. The system is doing exactly what it was asked to do.",
    p7: "An incentive problem doesn't get solved with better intentions. It gets solved by changing the contract.",
    'h2.2': 'Whoever gives the opinion has to be able to lose',
    p8: 'Nassim Taleb (2018) put the correction in one brutal sentence: don’t tell me what you think, tell me what’s in your portfolio. His argument about <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">skin in the game</span> (having something of your own at risk) tends to get misread, as if it were an alignment problem: sharing the upside between advisor and client. Taleb says the opposite. It’s not about sharing the gain, it’s about sharing the loss. The symmetry that matters isn’t getting paid together, it’s paying together.',
    p9: "Lattice took that principle and brought it down to an executable contract, which is where Taleb's argument hadn't yet reached. The Maker (whoever sells a forecast) deposits reputational collateral: puts up capital and measurable reputation behind each prediction. The Taker (whoever buys it) receives a refund guarantee: if the forecast fails, the smart contract returns what they paid and executes the penalty against the Maker. Automatically, without appeal, without anyone needing to get angry.",
    p10: 'That last point made it into the design through an internal discussion worth recounting. On any social platform, when a guru fails, a cycle of resentment kicks in: public pile-ons, blacklists, and on the other side, defensive alliances between people covering for each other. Robert Axelrod (1984) showed that strict reciprocity (<em>tit for tat</em>) can sustain cooperation between agents, but the team concluded that running it with human emotions and no referee produces the opposite: collusion on one side, retaliation on the other, and in the middle a market that stops discovering prices because people vote with their grudges instead of their judgment.',
    p11: "That's why Lattice depersonalizes the punishment. The Taker doesn't need to hate the Maker who failed, because the system already charged him. Revenge gets automated, and once automated, it stops contaminating the signal.",
    pullquote: "The market doesn't need to believe you. It needs to be able to charge you.",
    p12: "It's worth being clear about what belongs to whom. Akerlof described the disease in 1970. Taleb named the remedy in 2018. Axelrod explained why human reciprocity isn't enough to administer it. None of the three wrote the contract. The architecture that combines collateral, automatic refunds, calculated reputation, and seat allocation (where each piece exists to plug a hole the previous one leaves open) is Lattice's own authorship.",
    'h2.3': "Reputation isn't voted on: it's calculated",
    p13: "From that follows a decision the team made early and without ambiguity: Lattice has no reviews. No star ratings, no comments, no popularity ranking. A rating system (the Amazon or TripAdvisor model) is manipulable by construction: a seller can coordinate positive reviews, a competitor can sink another with fake ones, and reputation ends up measuring popularity and coordination, not quality. Reintroducing opinions would have meant reintroducing the exact noise the rest of the system exists to eliminate.",
    p14: "A Maker's reputation isn't an aggregated opinion. It's a number calculated over verifiable facts: what they predicted, at what odds, and whether it happened. That number is the <span style=\"background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500\">trust score</span>, and the team settled on four variables with deliberately unequal weights: yield, or the real return generated (40%), because it's the only thing that measures whether the Maker created value and not just got lucky; hit rate (30%), the most legible metric for the buyer; sample size, how many predictions they've actually resolved (20%), so nobody looks infallible on two-for-two; and streak (10%), the noisiest and most manipulable of the four, which is weighted low precisely for that reason. It recalculates over a rolling ninety-day window: not a lifetime accumulated pedigree, but recent form.",
    p15: "And it isn't decorative. That score determines how much the Maker can charge for each forecast. Reliability isn't a badge on a profile: it's the price. (How that number is built, and why those weights and not others, deserves its own piece.)",
    figcaption2:
      '<strong style="color:#3F3F44;font-weight:600">Reading:</strong> reputation isn’t a profile badge. The same number that orders the ranking sets how much the Maker can charge for each forecast, and it recalculates every time a prediction resolves. <strong style="color:#3F3F44;font-weight:600">Source:</strong> implementation of Lattice’s trust model (single source of price and reputation).',
    'h2.4': 'Alpha is ice in the sun',
    p16: "There's one piece left that makes the market survive over time, and it's the one that took the most internal debate, because it's counterintuitive: good information can't be sold an infinite number of times.",
    p17: 'A Maker in São Paulo spots a discrepancy at 8:00 AM. At that moment his informational edge (the <em>alpha</em>, the return that beats the market) is at its peak. If he sold that insight to ten thousand people, those ten thousand would execute the same trade, the underlying market would adjust within minutes, and the alpha would be worth zero. He would have sold ice and delivered a puddle.',
    p18: "There's also a supply problem the team detected by modeling the extreme case: with no limit at all, a popular event attracts more Makers selling the same insight than Takers willing to buy it. The edge gets split until it disappears before it's even executed. The market congests on the wrong side.",
    p19: 'That’s why Lattice allocates seats per event through <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">capital allocation</span>: the number of buyers enabled for a forecast is derived from the real volume of the underlying market. A deep event, with plenty of liquidity, absorbs more orders without moving and enables more seats. A thin market enables few. It isn’t manufactured scarcity to create urgency (that would be a casino trick) it’s the physical capacity of the market being exploited, translated into slots.',
    p20: "And there's a deliberate floor that keeps this from becoming a club. The entry tier, the one-dollar forecast, has no seat limit. Scarcity operates on the expensive, narrow alpha, never on access. It would have been incoherent to argue that talent shouldn't need permission to enter and then build a market where entering requires permission.",
    p21: "Put precisely: Lattice doesn't sell truth. It sells the speed of processing the truth, during the window while that truth is still private.",
    figcaption3:
      '<strong style="color:#3F3F44;font-weight:600">Reading:</strong> in A, the informational edge degrades as soon as it’s executed: Lattice doesn’t sell truth, it sells the window while that truth is still private. In B, seats scale with the event’s volume (a deep market absorbs more orders without moving) so scarcity falls on the expensive, narrow alpha, never on access: the entry tier stays open with no limit. <strong style="color:#3F3F44;font-weight:600">Source:</strong> Lattice’s seat-allocation mechanism; illustrative curves of the principle, not market data. Conceptual framework: Grossman, S. and Stiglitz, J. (1980).',
    'h2.6': 'Hedges for those who never had them',
    p26: "The consequence the team cares about most isn't financial, it's social.",
    p27: "An airline that fears an oil price spike buys derivatives and hedges. A fund that fears a rate hike hedges. A freelance developer in Buenos Aires who gets paid in crypto and fears exactly the same thing doesn't hedge, because nobody's going to draft a derivatives contract for his four-figure portfolio: the barrier to entry is prohibitive and always has been. His only option in the face of uncertainty is to grit his teeth.",
    p28: "A market for verifiable forecasts opens an intermediate door. That freelancer can buy macro analysis from whoever has the best audited track record and adjust his exposure with that information; if the Maker is wrong, he gets back what he paid. Uncertainty doesn't disappear (nothing makes it disappear) but for the first time it has an accessible price and a counterparty that answers. The same goes for the farmer who needs a climate reading and today has only village rumor.",
    p29: 'Information asymmetry was never an abstract textbook problem. It was always the reason some people can protect themselves from the future while others can only wait for it.',
    'sources.heading': 'SOURCES',
    disclaimer: 'Lattice does not offer investment advice or regulated financial instruments. Forecasts are third-party analysis; the refund guarantee is contractual and does not constitute a performance guarantee.',
    'nav.prev': '← PREVIOUS',
    'nav.prevTitle': 'Democracy of Intellect',
    'nav.backToResearch': 'Back to Research',
    'nav.next': 'NEXT →',
    'nav.nextTitle': 'Humanist Constitution',
  },
};

const blocks: Block[] = [
  { type: 'p', k: 'p1' },
  { type: 'p', k: 'p2' },
  { type: 'p', k: 'p3' },
  { type: 'figure', exhibit: 'limones', captionKey: 'figcaption1' },
  { type: 'h2', k: 'h2.1' },
  { type: 'p', k: 'p4' },
  { type: 'p', k: 'p5' },
  { type: 'p', k: 'p6' },
  { type: 'p', k: 'p7' },
  { type: 'h2', k: 'h2.2' },
  { type: 'p', k: 'p8' },
  { type: 'p', k: 'p9' },
  { type: 'p', k: 'p10' },
  { type: 'p', k: 'p11' },
  { type: 'pullquote', k: 'pullquote' },
  { type: 'p', k: 'p12' },
  { type: 'h2', k: 'h2.3' },
  { type: 'p', k: 'p13' },
  { type: 'p', k: 'p14' },
  { type: 'p', k: 'p15' },
  { type: 'figure', exhibit: 'score', captionKey: 'figcaption2' },
  { type: 'h2', k: 'h2.4' },
  { type: 'p', k: 'p16' },
  { type: 'p', k: 'p17' },
  { type: 'p', k: 'p18' },
  { type: 'p', k: 'p19' },
  { type: 'p', k: 'p20' },
  { type: 'p', k: 'p21' },
  { type: 'figure', exhibit: 'alpha', captionKey: 'figcaption3' },
  { type: 'h2', k: 'h2.6' },
  { type: 'p', k: 'p26' },
  { type: 'p', k: 'p27' },
  { type: 'p', k: 'p28' },
  { type: 'p', k: 'p29' },
];

const sources = (
  <>
    <li>George Akerlof, &quot;The Market for &apos;Lemons&apos;&quot; (1970)</li>
    <li>
      Nassim Nicholas Taleb, <em>Skin in the Game</em> (2018)
    </li>
    <li>
      Robert Axelrod, <em>The Evolution of Cooperation</em> (1984)
    </li>
    <li>Sanford Grossman y Joseph Stiglitz, &quot;On the Impossibility of Informationally Efficient Markets&quot; (1980)</li>
  </>
);

export default function Page() {
  return (
    <ResearchArticle
      T={T}
      blocks={blocks}
      sources={sources}
      prev={{ href: '/research/democracia-del-intelecto', titleKey: 'nav.prevTitle' }}
      next={{ href: '/research/constitucion-humanista', titleKey: 'nav.nextTitle' }}
    />
  );
}
