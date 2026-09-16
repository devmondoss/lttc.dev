'use client';

import { SENAL, usePageT } from '@/lib/i18n';
import SceneSellado from './SceneSellado';
import SceneLiquidado from './SceneLiquidado';
import SceneSinRuido from './SceneSinRuido';
import styles from './SenalNoRuido.module.css';

/** Sección «Señal, no ruido»: la vida de un mismo pronóstico contada en tres
 * escenas — sellado, liquidado, a la vista. Reemplaza a <signal-noise-scene>. */
export default function SenalNoRuido() {
  const t = usePageT(SENAL);

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.aside}>
          <div className={styles.asideInner}>
            <h2 className={styles.title}>
              <span className={styles.titleSignal}>{t('senal.title.signal')}</span>{' '}
              {t('senal.title.noise')}
            </h2>
            <p className={styles.sub}>{t('senal.sub')}</p>
          </div>
        </div>

        <div className={styles.scenes}>
          <SceneSellado />
          <SceneLiquidado />
          <SceneSinRuido />
        </div>
      </div>
    </div>
  );
}
