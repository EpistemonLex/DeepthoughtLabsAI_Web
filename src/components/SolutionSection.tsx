import React from 'react';
import styles from './SolutionSection.module.css';

const SolutionSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>The Deepthought Paradigm</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Persona</h3>
          <p>
            We give the AI a clear identity and role. This provides powerful,
            implicit instructions on its expected reasoning, knowledge base, and
            professional tone.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Charter</h3>
          <p>
            We instill the AI with your core philosophy and guiding principles.
            This teaches it *how to think*, fostering resilience and enabling
            autonomous, aligned decisions.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Plan</h3>
          <p>
            We provide the AI with a clear, actionable mission. This ensures its
            execution is not just technically correct, but strategically aligned
            with your ultimate goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
