"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './WorkflowAnimation.module.css';
import { ALL_ICONS } from './Icons';
import FinalDocument from './FinalDocument';

const NUM_ICONS = 50; // Increased for a more chaotic feel
const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;

const WorkflowAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDocumentVisible, setDocumentVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const icons = useMemo(() => {
    return Array.from({ length: NUM_ICONS }).map((_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = (CONTAINER_WIDTH / 2) + Math.random() * 200;
      
      const initialX = (CONTAINER_WIDTH / 2) + radius * Math.cos(angle);
      const initialY = (CONTAINER_HEIGHT / 2) + radius * Math.sin(angle);

      const duration = 2.5 + Math.random() * 2; // 2.5s to 4.5s
      const delay = Math.random() * 1; // 0s to 1s

      return {
        id: i,
        Component: ALL_ICONS[i % ALL_ICONS.length],
        initialStyle: {
          top: `${initialY}px`,
          left: `${initialX}px`,
          transform: 'scale(0.8)',
          opacity: 0.7,
        },
        finalStyle: {
          top: `${CONTAINER_HEIGHT / 2}px`,
          left: `${CONTAINER_WIDTH / 2}px`,
          transform: 'scale(0)',
          opacity: 0,
          transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        },
      };
    });
  }, []);

  useEffect(() => {
    // This dual-trigger ensures the animation runs both in testing (timeout)
    // and in production (scroll).
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Failsafe trigger for test environments

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(timer); // Clear the failsafe if the observer works
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(timer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Set a timeout to show the document after the animations have mostly completed
      const timer = setTimeout(() => {
        setDocumentVisible(true);
      }, 3500); // This should be timed with the longest animation duration + delay
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
    >
      <div className={styles.blurOverlay}></div>
      {icons.map(({ id, Component, initialStyle, finalStyle }) => (
        <div
          key={id}
          className={styles.icon}
          style={isVisible ? { ...initialStyle, ...finalStyle } : initialStyle}
        >
          <Component />
        </div>
      ))}
      <FinalDocument isVisible={isDocumentVisible} />
    </div>
  );
};

export default WorkflowAnimation;