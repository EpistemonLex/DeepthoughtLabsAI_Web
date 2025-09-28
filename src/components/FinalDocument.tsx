import React from 'react';
import styles from './FinalDocument.module.css';

interface FinalDocumentProps {
  isVisible: boolean;
}

const documentText = `Imagine having an expert assistant who knows your business, your projects, or your research inside and out. An assistant that doesn't just pull answers from the public internet, but from your own private documents, notes, and data. An assistant you can build, shape, and trust to help you with your most important work.`;

const FinalDocument = ({ isVisible }: FinalDocumentProps) => {
  return (
    <div className={`${styles.documentContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.documentHeader}>
        <div className={styles.headerDot} style={{ backgroundColor: '#ff5f56' }}></div>
        <div className={styles.headerDot} style={{ backgroundColor: '#ffbd2e' }}></div>
        <div className={styles.headerDot} style={{ backgroundColor: '#27c93f' }}></div>
      </div>
      <div className={styles.documentBody}>
        <h2 className={styles.documentTitle}>Synthesized Report</h2>
        <p className={styles.documentText}>{documentText}</p>
      </div>
    </div>
  );
};

export default FinalDocument;