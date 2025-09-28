import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import WorkflowAnimation from './WorkflowAnimation';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>
        Your Expertise, Amplified.
        <br />
        Your Data, Sovereign.
      </h1>
      <p className={styles.subheadline}>
        We build high-fidelity digital partners, transforming generalist AI into
        specialized collaborators that respect your privacy and amplify your
        unique knowledge.
      </p>
      <Link href="#waitlist" passHref>
        <div className={styles.ctaButton}>Join the Waitlist</div>
      </Link>

      <WorkflowAnimation />

      <div className={styles.scrollIndicator}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
