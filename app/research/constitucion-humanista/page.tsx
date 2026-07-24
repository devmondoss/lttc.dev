'use client';

import ResearchArticle, { type Block } from '@/components/ResearchArticle';
import { usePageT, type PageDict } from '@/lib/i18n';

const T: PageDict = {
  es: {
    'meta.breadcrumbTail': ' / Constitución Humanista',
    h1: 'El mercado que fabrica el hecho que mide',
    dek: 'En 2003 el Pentágono construyó un mercado de predicciones sobre el Medio Oriente. Duró un día. La constitución de Lattice existe porque hay preguntas que rompen el instrumento con el que se las hace.',
    'meta.writtenBy': 'ESCRITO POR',
    'meta.published': 'PUBLICADO',
    'meta.publishedDate': '23 de junio de 2026',
    'meta.updated': 'ÚLTIMA ACTUALIZACIÓN',
    'meta.updatedDate': '10 de julio de 2026',
    p1: 'El 28 de julio de 2003, dos senadores estadounidenses convocaron una conferencia de prensa para denunciar un programa de DARPA llamado Policy Analysis Market: un mercado de futuros sobre estabilidad geopolítica en Medio Oriente, financiado por el Pentágono. En la página del proyecto, como imágenes de muestra de fondo, aparecían ejemplos de contratos: el derrocamiento del rey de Jordania, el asesinato de Arafat. La prensa lo bautizó "el mercado de futuros del terrorismo". El programa fue cancelado al día siguiente. El almirante retirado a cargo de la unidad presentó su renuncia esa misma semana.',
    p2: 'Vale la pena decir lo que sus diseñadores dijeron después, porque es cierto: el mercado nunca fue pensado para predecir atentados concretos, sino para estimar indicadores agregados de estabilidad política y económica. Fue, en buena medida, un malentendido. Pero el malentendido no fue un accidente de comunicación. Fue el resultado predecible de no haber respondido antes, y en voz alta, la única pregunta que importa cuando se construye un mercado de información: <strong style="font-weight:600">qué preguntas no se pueden hacer sin destruir la respuesta</strong>.',
    p3: 'Lattice escribió su constitución para responder eso primero. No como una capa de relaciones públicas sobre un producto ya construido, sino como parte del diseño del instrumento.',
    'h2.1': 'Un mercado que puede crear su propio hecho no está midiendo nada',
    p4: 'El principio que ordena toda la constitución no es moral. Es mecánico, y se llama <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">reflexividad</span>: la propiedad de un sistema en el que el acto de medir altera aquello que se mide.',
    p5: 'Robert Merton (1948) le puso nombre a la versión social (la profecía autocumplida) y Charles Goodhart (1975) formuló su corolario más citado: cuando una medida se convierte en objetivo, deja de ser una buena medida. En un mercado de pronósticos, la reflexividad tiene una forma específica y letal. Si el comprador de una predicción puede salir a producir el hecho predicho, el precio de ese contrato ya no informa sobre la probabilidad de un evento: informa sobre cuánto está dispuesto a pagar alguien porque ese evento ocurra.',
    p6: 'Esa es la definición exacta del <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">riesgo moral activo</span>, y es la razón por la que un mercado sobre el asesinato de un político no es un mercado de predicción defectuoso. Es otra cosa. Un contrato que paga si una persona muere, comprable por cualquiera y ejecutable por el comprador, es funcionalmente una orden de trabajo con liquidación automática. El instrumento no falla al margen: falla en su núcleo, porque deja de medir el mundo y empieza a fabricarlo.',
    p7: 'Por eso Lattice bloquea esta categoría desde el código, no desde una política de moderación. Una regla que depende del criterio de un revisor es una regla que alguien va a negociar. Una regla escrita en el contrato no se negocia.',
    pullquote: 'Un mercado que puede fabricar el hecho que mide dejó de ser un pronóstico y pasó a ser un encargo.',
    'h2.2': 'Sin oráculo no hay contrato: hay un juicio',
    p8: 'La segunda restricción se sigue de la arquitectura descrita en el módulo anterior. La reputación de un Maker es un número calculado sobre predicciones resueltas; el reembolso al Taker se ejecuta cuando la predicción falla. Todo el sistema descansa sobre una condición previa: que exista una fuente externa capaz de decir <em>sí</em> o <em>no</em> sin ambigüedad.',
    p9: 'Ese es el <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">problema del oráculo</span>. Un contrato inteligente no interpreta: consulta. Necesita una métrica objetiva y documentada (una API, un dato de un banco central, el fallo de un juez oficial) y la ausencia de esa métrica no es un detalle técnico. Preguntas como <em>¿quién ganó el debate?</em> o <em>¿es arte lo que produce un modelo?</em> no tienen resolución, tienen opiniones; un mercado construido sobre ellas no colapsa en un error, colapsa en una disputa permanente.',
    p10: 'El criterio de admisión de Lattice, entonces, se aplica antes que cualquier consideración de gusto o de reputación: si el agente de verificación no encuentra una fuente de resolución objetiva, el mercado se rechaza. El equipo asume que este filtro va a producir falsos positivos (preguntas legítimas rechazadas por ser difíciles de resolver, no por ser ilegítimas) y por eso mantiene una instancia de apelación humana. Un sistema que pretende no equivocarse nunca es un sistema que oculta sus errores.',
    'h2.3': 'La línea incómoda',
    p11: 'Queda una categoría que no se resuelve con ninguno de los dos principios anteriores, y conviene tratarla sin eufemismos, porque es donde la constitución se vuelve un juicio y no un teorema.',
    p12: 'Nadie puede provocar un huracán para cobrar un contrato. No hay riesgo moral activo en un desastre natural, y la resolución suele ser perfectamente objetiva. Sin embargo, Lattice no lista contratos denominados en vidas humanas (cuántos muertos deja un incendio, cuántas víctimas una epidemia), y no lo hace por cálculo reputacional sino por una razón que Alvin Roth, Nobel por su trabajo en diseño de mercados, formuló con precisión en 2007: la repugnancia social es una restricción real de diseño. Hay transacciones que una sociedad rechaza, y el diseñador serio no las trata como una irracionalidad del público a superar, sino como un parámetro del problema. Michael Sandel (2012) llegó por otro camino a lo mismo: hay bienes cuyo sentido se degrada cuando se los pone en un mercado, y el precio, en esos casos, no revela valor sino que lo destruye.',
    p13: 'Lo que Lattice sí habilita son contratos denominados en la variable que las personas realmente necesitan cubrir: si un gobierno declarará emergencia agrícola antes de octubre, si una cadena de suministro se retrasará por un tifón. No es un rodeo semántico sobre la misma apuesta. Es un contrato distinto, con un comprador distinto y una función distinta: el agricultor y la aseguradora no quieren saber cuánta gente va a morir, quieren saber si van a poder sembrar. Ese contrato produce cobertura; el otro solo produce espectáculo.',
    'h2.5': 'Lattice Dev Human: elegir el signo de la reflexividad',
    p18: 'Una constitución que solo prohíbe es un filtro. Para ser una dirección, tiene que decir también qué promueve, y ahí aparece la simetría que da nombre a este módulo.',
    p19: 'La reflexividad (el mismo mecanismo que envenena el mercado de asesinato) cambia de signo cuando el hecho medido es un bien. Un mercado que estima si un ensayo clínico va a alcanzar su endpoint, o si un estudio va a replicar, mueve atención y capital <em>hacia</em> el hecho que mide. La profecía autocumplida deja de ser una amenaza y pasa a ser el producto.',
    p20: 'Esto no es una aspiración: está medido. Anna Dreber y sus colegas (2015) montaron mercados de predicción sobre la replicabilidad de 44 estudios de psicología incluidos en el Reproducibility Project y encontraron que los mercados anticiparon bien qué estudios iban a replicar, y superaron a una encuesta de pronósticos individuales de los propios investigadores. Un mercado de veracidad, cuando se lo apunta a la ciencia, produce un bien público: dice dónde conviene gastar los recursos escasos de replicación.',
    p21: '<span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">Lattice Dev Human</span> es el conjunto de verticales donde ese signo es positivo, y un vertical solo entra si cumple tres condiciones: existe un oráculo objetivo, no existe riesgo moral activo, y la información que el mercado produce vale para alguien más allá del que la compró.',
    p22: '<strong style="font-weight:600">Investigación y desarrollo.</strong> Mercados sobre replicabilidad, hitos de ensayos clínicos, benchmarks de modelos, plazos de resultados verificables. La ciencia sufre un problema de asimetría idéntico al que describe el módulo 2: hay señales tempranas sobre qué resultado es frágil, y esas señales viven en las cabezas de los revisores y los estudiantes de doctorado, sin canal ni recompensa. Lattice les da precio.',
    p23: '<strong style="font-weight:600">Coberturas accesibles.</strong> Contratos sobre variables macroeconómicas, climáticas y logísticas que hoy solo se cubren en una mesa de derivados con un contrato marco de por medio. El objetivo no es sofisticación financiera: es que el freelance que cobra en cripto y el productor que depende de una lluvia puedan comprar la lectura de quien mejor track record tiene, y recuperar lo que pagaron si esa lectura falla.',
    p24: '<strong style="font-weight:600">Cripto sostenible y verificación de compromisos.</strong> La infraestructura on-chain de Lattice no está ahí por afinidad cultural: está ahí porque un registro inmutable es lo que permite auditar un pronóstico años después. Aplicada a compromisos declarados (consumo energético, metas de emisión, plazos de despliegue), esa misma propiedad convierte una promesa corporativa en un contrato con contraparte.',
    p25: 'El mecanismo, en los tres casos, es el que Lattice ya construyó: colateral, reembolso, reputación calculada. Lo único que cambia es hacia dónde apunta.',
    p26: 'Un mercado de predicciones es una herramienta indiferente: mide con la misma eficiencia la probabilidad de un descubrimiento y la de un crimen. La constitución no lo hace más débil. Es lo único que decide cuál de las dos cosas va a estar midiendo.',
    'sources.heading': 'FUENTES',
    'sources.goodhart': 'Charles Goodhart (1975), formulación conocida como Ley de Goodhart',
    'sources.pam': 'Policy Analysis Market / DARPA: cobertura de prensa y actas del Senado de EE. UU., julio de 2003',
    disclaimer: 'Lattice no ofrece asesoramiento de inversión ni instrumentos financieros regulados. Los pronósticos son análisis de terceros; la garantía de reembolso es contractual y no constituye una garantía de rendimiento.',
    'nav.prev': '← ANTERIOR',
    'nav.prevTitle': 'Asimetría de Información',
    'nav.backToResearch': 'Volver a Research',
  },
  en: {
    'meta.breadcrumbTail': ' / Humanist Constitution',
    h1: 'The market that manufactures the fact it measures',
    dek: 'In 2003 the Pentagon built a prediction market on the Middle East. It lasted a day. Lattice’s constitution exists because some questions break the instrument used to ask them.',
    'meta.writtenBy': 'WRITTEN BY',
    'meta.published': 'PUBLISHED',
    'meta.publishedDate': 'June 23, 2026',
    'meta.updated': 'LAST UPDATED',
    'meta.updatedDate': 'July 10, 2026',
    p1: 'On July 28, 2003, two U.S. senators called a press conference to denounce a DARPA program called the Policy Analysis Market: a futures market on Middle East geopolitical stability, funded by the Pentagon. On the project’s page, as sample background images, were example contracts: the overthrow of the King of Jordan, the assassination of Arafat. The press dubbed it “the terrorism futures market.” The program was canceled the next day. The retired admiral in charge of the unit resigned that same week.',
    p2: 'It’s worth saying what its designers said afterward, because it’s true: the market was never meant to predict specific attacks, but to estimate aggregate indicators of political and economic stability. It was, in large part, a misunderstanding. But the misunderstanding wasn’t a communication accident. It was the predictable result of not having answered, earlier and out loud, the only question that matters when building an information market: <strong style="font-weight:600">which questions can’t be asked without destroying the answer</strong>.',
    p3: "Lattice wrote its constitution to answer that first. Not as a PR layer over an already-built product, but as part of the instrument's design.",
    'h2.1': "A market that can create its own fact isn't measuring anything",
    p4: 'The principle that orders the whole constitution isn’t moral. It’s mechanical, and it’s called <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">reflexivity</span>: the property of a system in which the act of measuring alters the thing being measured.',
    p5: "Robert Merton (1948) named the social version (the self-fulfilling prophecy) and Charles Goodhart (1975) formulated its most cited corollary: when a measure becomes a target, it stops being a good measure. In a forecasting market, reflexivity takes a specific and lethal form. If the buyer of a prediction can go out and produce the predicted fact, that contract's price no longer informs about the probability of an event: it informs about how much someone is willing to pay to make that event happen.",
    p6: "That's the exact definition of <span style=\"background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500\">active moral hazard</span>, and it's why a market on the assassination of a politician isn't a defective prediction market. It's something else. A contract that pays if a person dies, purchasable by anyone and executable by the buyer, is functionally a work order with automatic settlement. The instrument doesn't fail at the margin: it fails at its core, because it stops measuring the world and starts manufacturing it.",
    p7: "That's why Lattice blocks this category at the code level, not through a moderation policy. A rule that depends on a reviewer's judgment is a rule someone will negotiate. A rule written into the contract isn't negotiable.",
    pullquote: 'A market that can manufacture the fact it measures stopped being a forecast and became a commission.',
    'h2.2': "Without an oracle there's no contract: there's a judgment call",
    p8: "The second restriction follows from the architecture described in the previous module. A Maker's reputation is a number calculated over resolved predictions; the Taker's refund executes when the prediction fails. The whole system rests on a prior condition: that an external source exists capable of saying <em>yes</em> or <em>no</em> unambiguously.",
    p9: 'That’s the <span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">oracle problem</span>. A smart contract doesn’t interpret: it queries. It needs an objective, documented metric (an API, a central bank figure, an official judge’s ruling) and the absence of that metric isn’t a technical detail. Questions like <em>who won the debate?</em> or <em>is what a model produces art?</em> don’t have a resolution, they have opinions; a market built on them doesn’t collapse into an error, it collapses into a permanent dispute.',
    p10: "Lattice's admission criterion, then, applies before any consideration of taste or reputation: if the verification agent can't find an objective source of resolution, the market is rejected. The team accepts that this filter will produce false positives (legitimate questions rejected for being hard to resolve, not for being illegitimate) and that's why it keeps a human appeals process. A system that claims to never make mistakes is a system that hides its mistakes.",
    'h2.3': 'The uncomfortable line',
    p11: "There's a category left that neither of the two previous principles resolves, and it deserves to be treated without euphemism, because it's where the constitution becomes a judgment call rather than a theorem.",
    p12: "No one can trigger a hurricane to cash in a contract. There's no active moral hazard in a natural disaster, and resolution tends to be perfectly objective. And yet Lattice doesn't list contracts denominated in human lives (how many deaths a fire causes, how many victims an epidemic claims) and it doesn't do it for reputational calculation but for a reason Alvin Roth, Nobel laureate for his work on market design, put precisely in 2007: social repugnance is a real design constraint. There are transactions a society rejects, and the serious designer doesn't treat them as public irrationality to overcome, but as a parameter of the problem. Michael Sandel (2012) arrived at the same place by another route: there are goods whose meaning degrades when put in a market, and price, in those cases, doesn't reveal value. It destroys it.",
    p13: "What Lattice does enable are contracts denominated in the variable people actually need to hedge: whether a government will declare an agricultural emergency before October, whether a supply chain will be delayed by a typhoon. This isn't a semantic dodge around the same bet. It's a different contract, with a different buyer and a different function: the farmer and the insurer don't want to know how many people will die, they want to know whether they'll be able to plant. That contract produces coverage; the other only produces spectacle.",
    'h2.5': 'Lattice Dev Human: choosing the sign of reflexivity',
    p18: "A constitution that only prohibits is a filter. To be a direction, it also has to say what it promotes, and that's where the symmetry that names this module comes in.",
    p19: 'Reflexivity (the same mechanism that poisons the assassination market) flips sign when the fact being measured is a good. A market that estimates whether a clinical trial will hit its endpoint, or whether a study will replicate, moves attention and capital <em>toward</em> the fact it measures. The self-fulfilling prophecy stops being a threat and becomes the product.',
    p20: "This isn't an aspiration: it's measured. Anna Dreber and colleagues (2015) ran prediction markets on the replicability of 44 psychology studies included in the Reproducibility Project and found the markets correctly anticipated which studies would replicate, and outperformed a survey of individual forecasts from the researchers themselves. A truthfulness market, when pointed at science, produces a public good: it says where scarce replication resources are best spent.",
    p21: '<span style="background:linear-gradient(90deg,#FF3333,#FF6B00 55%,#F5A623);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:500">Lattice Dev Human</span> is the set of verticals where that sign is positive, and a vertical only gets in if it meets three conditions: an objective oracle exists, no active moral hazard exists, and the information the market produces has value for someone beyond whoever bought it.',
    p22: '<strong style="font-weight:600">Research and development.</strong> Markets on replicability, clinical trial milestones, model benchmarks, verifiable results timelines. Science suffers an asymmetry problem identical to the one described in Module 2: there are early signals about which results are fragile, and those signals live in the heads of reviewers and PhD students, with no channel and no reward. Lattice gives them a price.',
    p23: '<strong style="font-weight:600">Accessible hedges.</strong> Contracts on macroeconomic, climate, and logistics variables that today only get hedged at a derivatives desk with a master agreement in between. The goal isn’t financial sophistication: it’s that the freelancer who gets paid in crypto and the grower who depends on rain can buy the read from whoever has the best track record, and get back what they paid if that read fails.',
    p24: '<strong style="font-weight:600">Sustainable crypto and commitment verification.</strong> Lattice’s on-chain infrastructure isn’t there out of cultural affinity: it’s there because an immutable record is what makes it possible to audit a forecast years later. Applied to declared commitments (energy consumption, emission targets, rollout deadlines) that same property turns a corporate promise into a contract with a counterparty.',
    p25: "The mechanism, in all three cases, is the one Lattice already built: collateral, refund, calculated reputation. The only thing that changes is where it points.",
    p26: "A prediction market is an indifferent tool: it measures the probability of a discovery and the probability of a crime with the same efficiency. The constitution doesn't make it weaker. It's the only thing that decides which of the two it's going to be measuring.",
    'sources.heading': 'SOURCES',
    'sources.goodhart': "Charles Goodhart (1975), formulation known as Goodhart's Law",
    'sources.pam': 'Policy Analysis Market / DARPA: press coverage and U.S. Senate proceedings, July 2003',
    disclaimer: 'Lattice does not offer investment advice or regulated financial instruments. Forecasts are third-party analysis; the refund guarantee is contractual and does not constitute a performance guarantee.',
    'nav.prev': '← PREVIOUS',
    'nav.prevTitle': 'Information Asymmetry',
    'nav.backToResearch': 'Back to Research',
  },
};

const blocks: Block[] = [
  { type: 'p', k: 'p1' },
  { type: 'p', k: 'p2' },
  { type: 'p', k: 'p3' },
  { type: 'h2', k: 'h2.1' },
  { type: 'p', k: 'p4' },
  { type: 'p', k: 'p5' },
  { type: 'p', k: 'p6' },
  { type: 'p', k: 'p7' },
  { type: 'pullquote', k: 'pullquote' },
  { type: 'h2', k: 'h2.2' },
  { type: 'p', k: 'p8' },
  { type: 'p', k: 'p9' },
  { type: 'p', k: 'p10' },
  { type: 'h2', k: 'h2.3' },
  { type: 'p', k: 'p11' },
  { type: 'p', k: 'p12' },
  { type: 'p', k: 'p13' },
  { type: 'h2', k: 'h2.5' },
  { type: 'p', k: 'p18' },
  { type: 'p', k: 'p19' },
  { type: 'p', k: 'p20' },
  { type: 'p', k: 'p21' },
  { type: 'p', k: 'p22' },
  { type: 'p', k: 'p23' },
  { type: 'p', k: 'p24' },
  { type: 'p', k: 'p25' },
  { type: 'p', k: 'p26' },
];

export default function Page() {
  const t = usePageT(T);
  const sources = (
    <>
      <li>Robert K. Merton, &quot;The Self-Fulfilling Prophecy&quot; (1948)</li>
      <li>{t('sources.goodhart')}</li>
      <li>Alvin E. Roth, &quot;Repugnance as a Constraint on Markets&quot; (2007)</li>
      <li>
        Michael Sandel, <em>What Money Can&apos;t Buy</em> (2012)
      </li>
      <li>Robin Hanson, &quot;Designing Real Terrorism Futures&quot; (2006)</li>
      <li>Anna Dreber et al., &quot;Using prediction markets to estimate the reproducibility of scientific research&quot;, PNAS (2015)</li>
      <li>{t('sources.pam')}</li>
    </>
  );

  return (
    <ResearchArticle
      T={T}
      blocks={blocks}
      sources={sources}
      prev={{ href: '/research/asimetria-de-informacion', titleKey: 'nav.prevTitle' }}
      next={null}
    />
  );
}
