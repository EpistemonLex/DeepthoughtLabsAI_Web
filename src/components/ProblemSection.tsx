import React from 'react';
import styles from './ProblemSection.module.css';

const ProblemSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Beyond Generic AI</h2>
      <p className={styles.text}>
        Today&apos;s AI is an &quot;amnesiac master craftsman&quot;&mdash;possessing vast
        skill but no specific context. Low-context prompts lead to generic AI
        slop, while centralized platforms create a new &quot;digital
        serfdom,&quot; holding your data hostage. This is not a partnership; it&apos;s a
        limitation.
      </p>
    </section>
  );
};

export default ProblemSection;
