"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './SchematicAnimation.module.css';

const NUM_LINES = 60;
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 320;

const SchematicAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => {
    const generatedLines = [];
    const box1 = "M 100,100 h 100 v 80 h -100 z";
    const box2 = "M 350,100 h 100 v 80 h -100 z";
    const box3 = "M 600,100 h 100 v 80 h -100 z";
    const arrow1 = "M 200,140 h 150";
    const arrow2 = "M 450,140 h 150";

    generatedLines.push({ id: 'box1', d: box1, delay: 0 });
    generatedLines.push({ id: 'arrow1', d: arrow1, delay: 1 });
    generatedLines.push({ id: 'box2', d: box2, delay: 2 });
    generatedLines.push({ id: 'arrow2', d: arrow2, delay: 3 });
    generatedLines.push({ id: 'box3', d: box3, delay: 4 });

    for (let i = 5; i < NUM_LINES; i++) {
      const isHorizontal = Math.random() > 0.5;
      const x1 = Math.random() * VIEWBOX_WIDTH;
      const y1 = Math.random() * VIEWBOX_HEIGHT;
      const length = Math.random() * 200 + 50;
      const d = isHorizontal ? `M ${x1},${y1} h ${length}` : `M ${x1},${y1} v ${length}`;
      
      generatedLines.push({
        id: `grid-${i}`,
        d: d,
        delay: Math.random() * 10,
      });
    }
    return generatedLines;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => { if (currentRef) {
      observer.unobserve(currentRef);
    }};
  }, []);

  return (
    <div ref={ref} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {/* The key prop is crucial here. When isVisible becomes false, we render nothing.
          When it becomes true again, React treats this as a new element, forcing a remount
          and therefore restarting the CSS animation. */}
      {isVisible && (
        <div key={Date.now()} className={styles.schematic}>
          <svg preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
            {lines.map(({ id, d, delay }) => (
              <path
                key={id}
                className={styles.line}
                d={d}
                style={{ animationDelay: `${delay}s` }}
                fill="none"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default SchematicAnimation;
