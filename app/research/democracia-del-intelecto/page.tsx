'use client';

import ResearchArticle, { type Block } from '@/components/ResearchArticle';
import type { PageDict } from '@/lib/i18n';

const T: PageDict = {
  es: {
    'meta.breadcrumbTail': ' / Democracia del Intelecto',
    h1: 'Tener razón ya no pide permiso',
    dek: 'El mundo repartió el acceso al conocimiento. Falta lo más difícil: que ese conocimiento tenga voz, se verifique y se pague.',
    'meta.writtenBy': 'ESCRITO POR',
    'meta.published': 'PUBLICADO',
    'meta.publishedDate': '14 de mayo de 2026',
    'meta.updated': 'ÚLTIMA ACTUALIZACIÓN',
    'meta.updatedDate': '10 de julio de 2026',
    p1: 'Dos personas hacen la misma predicción sobre la inflación del próximo trimestre. Una trabaja en una mesa de Goldman Sachs. La otra tiene veintidós años, vive en Lima y corrió el modelo desde una laptop de segunda mano. Las dos aciertan. A una la van a citar; a la otra no la va a leer nadie.',
    p2: 'Esa distancia (entre tener razón y que a uno lo escuchen) es el problema que casi nadie nombra. Durante dos décadas celebramos haber democratizado el acceso a la información: primero internet, ahora modelos de IA que ponen capacidad analítica de frontera en manos de cualquiera con conexión. El insumo dejó de ser escaso. Lo que sigue escaso es otra cosa: que tu juicio cuente, que cuando aciertes alguien lo sepa y te lo pague.',
    p3: 'Democratizamos el conocimiento. Falta <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">democratizar el intelecto</span>.',
    'h2.1': 'El acceso ya se repartió',
    p4: 'La educación superior se pensó como un motor de progreso. Con el tiempo se volvió, sobre todo, un sistema para acumular credenciales. Michael Sandel lo llamó el último prejuicio socialmente aceptable: seguimos tratando el diploma como prueba de valía, y al hacerlo le decimos a la mayoría que no lo tiene (en Estados Unidos, alrededor de dos tercios de los adultos) que su criterio pesa menos. Sandel no acusa a las universidades de conspirar. Describe un desplazamiento estructural que ellas tampoco controlan: la sociedad delegó en el título la tarea de decidir a quién vale la pena escuchar.',
    p5: 'La IA acelera esto y a la vez lo vuelve absurdo. Si un modelo pone el mismo poder analítico frente al analista de un banco y frente a un chico curioso en una ciudad intermedia, el insumo se igualó. Lo que no se igualó es el permiso para ser tomado en serio.',
    'h2.2': 'El diploma es una señal, no una prueba',
    p6: 'Bryan Caplan (2018) dio con la explicación incómoda: buena parte de lo que compramos con un título no es aprendizaje, es señalización. El diploma le informa a un empleador que sos suficientemente inteligente, disciplinado y tolerante al aburrimiento como para completar cuatro años. Funciona como señal aunque enseñe poco. Pero es una señal cara (cientos de miles de dólares, media década) y lenta, que además excluye por diseño a quien no puede pagar el peaje.',
    p7: 'Visto así, el <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">credencialismo</span> no es un villano moral. Es una tecnología de verificación vieja. Responde la pregunta "¿debería confiar en el juicio de esta persona?" con un atajo: "¿tiene el sello?". Cuando el insumo era escaso, el atajo servía. Hoy, cuando cualquiera puede producir un análisis de aspecto competente, el atajo se rompe: el piso de ruido subió, y el sello pasa a ser todavía más un privilegio de partida que una medida de acierto.',
    pullquote: 'El credencialismo preguntaba de dónde venías. El mercado solo pregunta si tuviste razón.',
    figcaption1:
      '<strong style="color:#3F3F44;font-weight:600">Lectura:</strong> la distancia vertical entre cada punto y la diagonal es el error de calibración. Es la única métrica que distingue al analista riguroso del que vende convicción, y es invisible en cualquier plataforma que mida autoridad por audiencia. <strong style="color:#3F3F44;font-weight:600">Fuente:</strong> diagrama de fiabilidad, instrumento estándar en la evaluación de pronósticos probabilísticos (Brier, 1950; Gneiting y Raftery, 2007). Series ilustrativas del mecanismo; no representan datos de Makers reales.',
    'h2.3': 'El conocimiento no vive en un comité',
    p8: 'En 1945, Friedrich Hayek argumentó que el conocimiento que mueve una economía no está concentrado en la cabeza de un puñado de expertos. Está disperso en fragmentos (el productor que conoce su clima local, el operador que conoce su mercado) que ningún comité central puede reunir. El precio, decía, es el mecanismo que agrega ese <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">conocimiento distribuido</span> y lo vuelve utilizable.',
    p9: 'Las redes de la última década hicieron lo contrario. Centralizaron la atención y premiaron el volumen: más seguidores, más ruido, más certeza performática. Lattice toma la intuición de Hayek y la aplica a la veracidad. En lugar de recompensar a quien habla más fuerte, usa un mecanismo de mercado (el colateral y la plaza) para agregar el juicio disperso y silencioso, y convertirlo en una señal verificable.',
    p10: 'Ahí aparece el <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">Maker</span>: un tipo distinto de autoridad. No la construye con audiencia sino con aciertos. Arriesga su reputación como colateral (skin in the game) y su credibilidad se mide en <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">yield verificado on-chain</span>: el rendimiento comprobable de sus pronósticos, registrado de forma inmutable. Si falla, el contrato reembolsa a quien le compró. Acertar paga; equivocarse cuesta. La verificación deja de ser una promesa institucional y pasa a ser un hecho matemático.',
    'h2.4': 'La identidad se reduce a un historial',
    p11: 'Hay una consecuencia que conviene decir en voz alta. Cuando la confianza se apoya en un historial verificable y no en un currículum, el comprador (el Taker) ya no necesita saber quién sos. No tu nombre, no tu país, no tu edad, no tu género. Le alcanza con tu track record.',
    p12: 'Esto invierte la lógica del credencialismo. El diploma era, en el fondo, un proxy de tu origen: dónde estudiaste, con quién, con qué apellido. Un mercado de pronósticos verificables no necesita ese proxy porque mide directamente lo único que importa (si acertás) y es ciego a todo lo demás. Para el analista de Lima y para el productor rural con un modelo climático preciso, esa ceguera es, por primera vez, una ventaja.',
    'h2.6': 'Hacia dónde lleva esto',
    p15: 'La próxima generación va a crecer con la IA como lengua materna, capaz de desarrollar análisis en terrenos donde hoy no tiene voz (investigación, fondos derivados, sostenibilidad) desde la curiosidad y no desde el pedigrí. Y hay un paso más: si el conocimiento especializado se puede verificar y remunerar, también se puede vender para entrenar mejores modelos, donde cuanto más específico es el saber, más vale. La información deja de ser un subproducto y se vuelve un pilar: mejores modelos, mejores decisiones, un desarrollo que no depende de quién tuvo acceso al sello.',
    p16: 'El talento analítico del mundo siempre estuvo repartido. Lo que faltaba era una forma de probarlo sin pedir permiso.',
    'sources.heading': 'FUENTES',
    disclaimer: 'Lattice no ofrece asesoramiento de inversión ni instrumentos financieros regulados. Los pronósticos son análisis de terceros; la garantía de reembolso es contractual y no constituye una garantía de rendimiento.',
    'nav.backToResearch': 'Volver a Research',
    'nav.next': 'SIGUIENTE →',
    'nav.nextTitle': 'Asimetría de Información',
  },
  en: {
    'meta.breadcrumbTail': ' / Democracy of Intellect',
    h1: 'Being right no longer asks permission',
    dek: "The world distributed access to knowledge. What's missing is the hard part: giving that knowledge a voice, verifying it, and paying for it.",
    'meta.writtenBy': 'WRITTEN BY',
    'meta.published': 'PUBLISHED',
    'meta.publishedDate': 'May 14, 2026',
    'meta.updated': 'LAST UPDATED',
    'meta.updatedDate': 'July 10, 2026',
    p1: "Two people make the same prediction about next quarter's inflation. One works a trading desk at Goldman Sachs. The other is twenty-two, lives in Lima, and ran the model from a secondhand laptop. Both get it right. One gets quoted; the other gets read by no one.",
    p2: "That distance (between being right and being heard) is the problem almost nobody names. For two decades we celebrated democratizing access to information: first the internet, now AI models that put frontier-level analytical capacity in the hands of anyone with a connection. The input stopped being scarce. What's still scarce is something else: that your judgment counts, that when you're right someone knows it and pays you for it.",
    p3: 'We democratized knowledge. What’s missing is <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">democratizing intellect</span>.',
    'h2.1': 'Access has already been distributed',
    p4: "Higher education was conceived as an engine of progress. Over time it became, above all, a system for accumulating credentials. Michael Sandel called it the last socially acceptable prejudice: we still treat the diploma as proof of worth, and in doing so we tell the majority who doesn't have one (in the United States, roughly two-thirds of adults) that their judgment counts for less. Sandel doesn't accuse universities of conspiring. He describes a structural shift that they don't control either: society delegated to the degree the job of deciding who's worth listening to.",
    p5: "AI accelerates this and, at the same time, makes it absurd. If a model puts the same analytical power in front of a bank analyst and a curious kid in a mid-sized city, the input has been equalized. What hasn't been equalized is the permission to be taken seriously.",
    'h2.2': 'The diploma is a signal, not proof',
    p6: "Bryan Caplan (2018) landed on the uncomfortable explanation: much of what we buy with a degree isn't learning, it's signaling. The diploma tells an employer that you're smart, disciplined, and tolerant of boredom enough to finish four years. It works as a signal even if it teaches little. But it's an expensive signal (hundreds of thousands of dollars, half a decade) and a slow one, that by design excludes anyone who can't pay the toll.",
    p7: 'Seen this way, <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">credentialism</span> isn’t a moral villain. It’s an old verification technology. It answers the question “should I trust this person’s judgment?” with a shortcut: “do they have the stamp?” When the input was scarce, the shortcut worked. Today, when anyone can produce analysis that looks competent, the shortcut breaks down: the noise floor rose, and the stamp becomes even more a starting privilege than a measure of being right.',
    pullquote: 'Credentialism asked where you came from. The market only asks whether you were right.',
    figcaption1:
      '<strong style="color:#3F3F44;font-weight:600">Reading:</strong> the vertical distance between each point and the diagonal is the calibration error. It’s the only metric that distinguishes the rigorous analyst from the one who sells conviction, and it’s invisible on any platform that measures authority by audience size. <strong style="color:#3F3F44;font-weight:600">Source:</strong> reliability diagram, a standard instrument in the evaluation of probabilistic forecasts (Brier, 1950; Gneiting and Raftery, 2007). Illustrative series of the mechanism; they do not represent real Maker data.',
    'h2.3': "Knowledge doesn't live in a committee",
    p8: 'In 1945, Friedrich Hayek argued that the knowledge that drives an economy isn’t concentrated in the heads of a handful of experts. It’s scattered in fragments (the grower who knows their local climate, the trader who knows their market) that no central committee can gather. Price, he said, is the mechanism that aggregates that <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">distributed knowledge</span> and makes it usable.',
    p9: "Last decade's networks did the opposite. They centralized attention and rewarded volume: more followers, more noise, more performed certainty. Lattice takes Hayek's intuition and applies it to truthfulness. Instead of rewarding whoever speaks the loudest, it uses a market mechanism (collateral and seats) to aggregate scattered, quiet judgment and turn it into a verifiable signal.",
    p10: 'That’s where the <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">Maker</span> comes in: a different kind of authority. Not built with audience but with being right. They stake their reputation as collateral (skin in the game) and their credibility is measured in <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">yield verified on-chain</span>: the provable performance of their forecasts, recorded immutably. If they’re wrong, the contract refunds whoever bought from them. Being right pays; being wrong costs. Verification stops being an institutional promise and becomes a mathematical fact.',
    'h2.4': 'Identity reduces to a track record',
    p11: "There's a consequence worth saying out loud. When trust rests on a verifiable track record instead of a résumé, the buyer (the Taker) no longer needs to know who you are. Not your name, not your country, not your age, not your gender. Your track record is enough.",
    p12: "This inverts the logic of credentialism. The diploma was, at bottom, a proxy for your origin: where you studied, with whom, under what last name. A market for verifiable forecasts doesn't need that proxy because it measures directly the only thing that matters (whether you're right) and is blind to everything else. For the analyst in Lima and for the rural grower with an accurate climate model, that blindness is, for the first time, an advantage.",
    'h2.6': 'Where this leads',
    p15: 'The next generation will grow up with AI as a native language, able to develop analysis in fields where they have no voice today (research, derivatives, sustainability) driven by curiosity rather than pedigree. And there’s a further step: if specialized knowledge can be verified and paid for, it can also be sold to train better models, where the more specific the expertise, the more it’s worth. Information stops being a byproduct and becomes a pillar: better models, better decisions, a kind of development that doesn’t depend on who had access to the stamp.',
    p16: "The world's analytical talent was always distributed. What was missing was a way to prove it without asking permission.",
    'sources.heading': 'SOURCES',
    disclaimer: 'Lattice does not offer investment advice or regulated financial instruments. Forecasts are third-party analysis; the refund guarantee is contractual and does not constitute a performance guarantee.',
    'nav.backToResearch': 'Back to Research',
    'nav.next': 'NEXT →',
    'nav.nextTitle': 'Information Asymmetry',
  },
};

const blocks: Block[] = [
  { type: 'p', k: 'p1' },
  { type: 'p', k: 'p2' },
  { type: 'p', k: 'p3' },
  { type: 'h2', k: 'h2.1' },
  { type: 'p', k: 'p4' },
  { type: 'p', k: 'p5' },
  { type: 'h2', k: 'h2.2' },
  { type: 'p', k: 'p6' },
  { type: 'p', k: 'p7' },
  { type: 'pullquote', k: 'pullquote' },
  { type: 'figure', exhibit: 'calibracion', captionKey: 'figcaption1' },
  { type: 'h2', k: 'h2.3' },
  { type: 'p', k: 'p8' },
  { type: 'p', k: 'p9' },
  { type: 'p', k: 'p10' },
  { type: 'h2', k: 'h2.4' },
  { type: 'p', k: 'p11' },
  { type: 'p', k: 'p12' },
  { type: 'h2', k: 'h2.6' },
  { type: 'p', k: 'p15' },
  { type: 'p', k: 'p16' },
];

const sources = (
  <>
    <li>
      Michael Sandel, <em>The Tyranny of Merit</em> (2020)
    </li>
    <li>
      Bryan Caplan, <em>The Case Against Education</em> (2018)
    </li>
    <li>Friedrich Hayek, &quot;The Use of Knowledge in Society&quot; (1945)</li>
    <li>Raj Chetty et al., &quot;Where is the Land of Opportunity?&quot; (2014)</li>
  </>
);

export default function Page() {
  return (
    <ResearchArticle
      T={T}
      blocks={blocks}
      sources={sources}
      prev={null}
      next={{ href: '/research/asimetria-de-informacion', titleKey: 'nav.nextTitle' }}
    />
  );
}
