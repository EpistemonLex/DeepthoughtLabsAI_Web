"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './SynthesisAnimation.module.css';

const getPentagonPoints = (cx: number, cy: number, r: number): string => {
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Pointing up
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
};

const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 352;

// Define the structured graph data for our story
const storyGraph = {
  nodes: [
    { id: 1, label: 'Orchestrator Agent', type: 'agent', x: 400, y: 50 },
    { id: 2, label: 'Web Search', type: 'tool', x: 200, y: 150 },
    { id: 3, label: 'Summarizer Agent', type: 'agent', x: 400, y: 250 },
    { id: 4, label: 'Writer Tool', type: 'tool', x: 600, y: 150 },
  ],
  edges: [
    { id: 'e1-2', from: 1, to: 2, label: 'uses' },
    { id: 'e2-3', from: 2, to: 3, label: 'provides data to' },
    { id: 'e3-1', from: 3, to: 1, label: 'returns insights to' },
    { id: 'e1-4', from: 1, to: 4, label: 'uses' },
  ],
};

const NUM_BACKGROUND_NODES = 50;

const SynthesisAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { nodes, edges } = useMemo(() => {
    const nodeMap = new Map(storyGraph.nodes.map(n => [n.id, n]));
    const processedEdges = storyGraph.edges.map(edge => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (!fromNode || !toNode) {
        console.error("Invalid edge:", edge);
        return { ...edge, d: '', labelX: 0, labelY: 0 };
      }
      return {
        ...edge,
        d: `M${fromNode.x},${fromNode.y} L${toNode.x},${toNode.y}`,
        labelX: (fromNode.x + toNode.x) / 2,
        labelY: (fromNode.y + toNode.y) / 2,
      };
    });
    return { nodes: storyGraph.nodes, edges: processedEdges };
  }, []);

  const backgroundGraph = useMemo(() => {
    const bgNodes = Array.from({ length: NUM_BACKGROUND_NODES }).map((_, i) => ({
      id: `bg-${i}`,
      x: Math.random() * VIEWBOX_WIDTH,
      y: Math.random() * VIEWBOX_HEIGHT,
    }));
    const bgEdges = [];
    for (let i = 0; i < bgNodes.length; i++) {
      for (let j = i + 1; j < bgNodes.length; j++) {
        const dist = Math.hypot(bgNodes[i].x - bgNodes[j].x, bgNodes[i].y - bgNodes[j].y);
        if (dist < 100) {
          bgEdges.push({
            id: `bg-edge-${i}-${j}`,
            d: `M${bgNodes[i].x},${bgNodes[i].y} L${bgNodes[j].x},${bgNodes[j].y}`,
          });
        }
      }
    }
    return { nodes: bgNodes, edges: bgEdges };
  }, []);

  // Logic to determine which nodes/edges are active
  const [activeElements, setActiveElements] = useState<{ nodes: Set<number>, edges: Set<string> }>({ nodes: new Set(), edges: new Set() });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { setIsVisible(entry.isIntersecting); }, { threshold: 0.5 });
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    let timers: ReturnType<typeof setTimeout>[] = [];
    if (isVisible) {
      const animationSequence = [
        { delay: 0, nodes: [1] },
        { delay: 500, nodes: [2], edges: ['e1-2'] },
        { delay: 1000, nodes: [3], edges: ['e2-3'] },
        { delay: 1500, edges: ['e3-1'] },
        { delay: 2000, nodes: [4], edges: ['e1-4'] },
      ];
      const totalAnimationTime = 2500; // A little after the last animation

      setActiveElements({ nodes: new Set(), edges: new Set() });
      setShowBackground(false);

      animationSequence.forEach(step => {
        const timer = setTimeout(() => {
          setActiveElements(prev => ({
            nodes: new Set([...prev.nodes, ...(step.nodes || [])]),
            edges: new Set([...prev.edges, ...(step.edges || [])]),
          }));
        }, step.delay);
        timers.push(timer);
      });

      timers.push(setTimeout(() => setShowBackground(true), totalAnimationTime));

    } else {
      setActiveElements({ nodes: new Set(), edges: new Set() });
      setShowBackground(false);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      timers.forEach(clearTimeout);
    };
  }, [isVisible]);

  return (
    <div ref={ref} className={styles.container}>
      <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        <defs>
          {/* A path for each edge to align the text label */}
          {edges.map(edge => (
            <path id={`path-${edge.id}`} key={`path-${edge.id}`} d={edge.d} fill="none" />
          ))}
        </defs>

        {/* Render Background Graph */}
        <g className={`${styles.backgroundGraph} ${showBackground ? styles.visible : ''}`}>
          {backgroundGraph.edges.map(edge => (
            <path key={edge.id} className={styles.backgroundEdge} d={edge.d} />
          ))}
          {backgroundGraph.nodes.map(node => (
            <circle key={node.id} className={styles.backgroundNode} cx={node.x} cy={node.y} r={3} />
          ))}
        </g>

        {/* Render Story Graph Edges and their labels */}
        {edges.map(edge => (
          <g key={edge.id} className={`${styles.edgeGroup} ${activeElements.edges.has(edge.id) ? styles.active : ''}`}>
            <path
              className={styles.edge}
              d={edge.d}
              fill="none"
            />
            <text className={styles.edgeLabel} dy="-5">
              <textPath href={`#path-${edge.id}`} startOffset="50%" textAnchor="middle">
                {edge.label}
              </textPath>
            </text>
          </g>
        ))}

        {/* Render Story Graph Nodes and their labels */}
        {nodes.map(node => (
          <g key={node.id} className={`${styles.nodeGroup} ${activeElements.nodes.has(node.id) ? styles.active : ''}`}>
            {node.type === 'agent' ? (
              <polygon
                points={getPentagonPoints(node.x, node.y, 40)}
                className={`${styles.node} ${styles.agent}`}
              />
            ) : (
              <circle
                className={`${styles.node} ${styles.tool}`}
                cx={node.x}
                cy={node.y}
                r={35}
              />
            )}
            <text
              x={node.x}
              y={node.y}
              className={styles.nodeLabel}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SynthesisAnimation;