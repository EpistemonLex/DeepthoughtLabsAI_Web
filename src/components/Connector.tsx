"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './Connector.module.css';

const Connector = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.connector} ${isVisible ? styles.visible : ''}`}>
      <svg width="2" height="100%" viewBox="0 0 2 192">
        <line className={styles.line} x1="1" y1="0" x2="1" y2="192" />
      </svg>
    </div>
  );
};

export default Connector;
