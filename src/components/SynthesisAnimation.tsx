"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './SynthesisAnimation.module.css';

const NUM_NODES = 50;
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 352;

const SynthesisAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { nodes, edges } = useMemo(() => {
    const generatedNodes = Array.from({ length: NUM_NODES }).map((_, i) => ({
      id: i,
      x: Math.random() * VIEWBOX_WIDTH,
      y: Math.random() * VIEWBOX_HEIGHT,
    }));

    const generatedEdges = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const nodeA = generatedNodes[i];
        const nodeB = generatedNodes[j];
        const distance = Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
        if (distance < 120) { // Connect nodes that are somewhat close
          generatedEdges.push({
            id: `edge-${i}-${j}`,
            from: nodeA.id,
            to: nodeB.id,
            d: `M${nodeA.x},${nodeA.y} L${nodeB.x},${nodeB.y}`,
          });
        }
      }
    }
    return { nodes: generatedNodes, edges: generatedEdges };
  }, []);

  // Logic to determine which nodes/edges are active
  const [activeElements, setActiveElements] = useState<{ nodes: Set<number>, edges: Set<string> }>({ nodes: new Set(), edges: new Set() });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { setIsVisible(entry.isIntersecting); }, { threshold: 0.5 });
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    let timers: ReturnType<typeof setTimeout>[] = [];
    if (isVisible) {
      // Start the cascade
      const cascade = (startNodeId: number, level: number) => {
        if (level > 3) return; // Limit cascade depth

        timers.push(setTimeout(() => {
          setActiveElements(prev => {
            const newNodes = new Set(prev.nodes).add(startNodeId);
            const newEdges = new Set(prev.edges);
            const connectedEdges = edges.filter(e => (e.from === startNodeId && !prev.nodes.has(e.to)) || (e.to === startNodeId && !prev.nodes.has(e.from)));
            
            connectedEdges.forEach(edge => {
              newEdges.add(edge.id);
              const nextNodeId = edge.from === startNodeId ? edge.to : edge.from;
              cascade(nextNodeId, level + 1);
            });

            return { nodes: newNodes, edges: newEdges };
          });
        }, level === 0 ? 0 : 250));
      };

      cascade(Math.floor(NUM_NODES / 2), 0); // Start cascade from a central node
    } else {
      // Reset when not visible
      setActiveElements({ nodes: new Set(), edges: new Set() });
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      timers.forEach(clearTimeout);
    };
  }, [isVisible, edges]);

  return (
    <div ref={ref} className={styles.container}>
      <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        {/* Render all edges (dimmed) */}
        {edges.map(edge => (
          <path
            key={edge.id}
            className={`${styles.edge} ${activeElements.edges.has(edge.id) ? styles.active : ''}`}
            d={edge.d}
            fill="none"
          />
        ))}
        {/* Render all nodes (dimmed) */}
        {nodes.map(node => (
          <circle
            key={node.id}
            className={`${styles.node} ${activeElements.nodes.has(node.id) ? styles.active : ''}`}
            cx={node.x}
            cy={node.y}
            r={4}
          />
        ))}
      </svg>
    </div>
  );
};

export default SynthesisAnimation;