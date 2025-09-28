"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './WorkflowAnimation.module.css';

// Shape components remain the same
const DocShape = () => (
  <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0H25L40 15V45C40 47.7614 37.7614 50 35 50H5C2.23858 50 0 47.7614 0 45V5C0 2.23858 2.23858 0 5 0Z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M25 0V15H40L25 0Z" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);
const NodeShape = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);
const LineShape = () => (
  <svg width="50" height="10" viewBox="0 0 50 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5H50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
  </svg>
);

const SHAPE_TYPES = [DocShape, NodeShape, LineShape];
const NUM_SHAPES = 100;

// Define the area where the final structure appears
const FINAL_AREA = { x: 640, y: 192, width: 200, height: 250 }; // left: 80% of 800px, top: 50% of 384px

const WorkflowAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: NUM_SHAPES }).map((_, i) => {
      const initialTop = Math.random() * 100;
      const initialLeft = Math.random() * 45;
      
      // Calculate a random destination within the final structure area
      const finalTop = (FINAL_AREA.y - FINAL_AREA.height / 2) + (Math.random() * FINAL_AREA.height);
      const finalLeft = (FINAL_AREA.x - FINAL_AREA.width / 2) + (Math.random() * FINAL_AREA.width);

      return {
        id: i,
        Component: SHAPE_TYPES[i % SHAPE_TYPES.length],
        initialStyle: {
          top: `${initialTop}%`,
          left: `${initialLeft}%`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`,
          transitionDelay: `${Math.random() * 0.2}s`,
        },
        finalStyle: {
          top: `${finalTop / 3.84}%`, // Convert px to % of container height
          left: `${finalLeft / 8}%`, // Convert px to % of container width
          transform: 'scale(0)',
          opacity: 0,
        },
      };
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.4 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div ref={ref} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {shapes.map(({ id, Component, initialStyle, finalStyle }) => (
        <div key={id} className={styles.shape} style={isVisible ? { ...initialStyle, ...finalStyle } : initialStyle}>
          <Component />
        </div>
      ))}
      <div className={styles.finalStructure}></div>
    </div>
  );
};

export default WorkflowAnimation;