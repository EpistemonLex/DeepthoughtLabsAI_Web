"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './SchematicAnimation.module.css';

const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 320;

// Raw SVG path data for icons (24x24 viewBox)
const icons = {
  ingestion: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    "M14 2v6h6",
    "M16 13H8",
    "M16 17H8",
    "M10 9H8",
  ],
  graphDb: [
    "M6 3v12",
    "M18 6a3 3 0 1 0 0-6a3 3 0 0 0 0 6z",
    "M6 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6z",
    "M18 9a9 9 0 0 1-9 9",
  ],
  vectorDb: [
    "M3 3h7v7H3z",
    "M14 3h7v7h-7z",
    "M14 14h7v7h-7z",
    "M3 14h7v7H3z",
  ],
  llm: [
    "M4 4h16v16H4z",
    "M9 9h6v6H9z",
    "M9 1v3", "M15 1v3",
    "M9 20v3", "M15 20v3",
    "M20 9h3", "M20 14h3",
    "M1 9h3", "M1 14h3",
  ],
  agent: [
    "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  ]
};

// Define the layout, using x/y for the top-left corner of the 24x24 icon space
const diagramLayout = {
  nodes: [
    { id: 'ingestion', icon: icons.ingestion, x: 50, y: 130, scale: 2.5, label: "Ingestion" },
    { id: 'graphDb', icon: icons.graphDb, x: 225, y: 70, scale: 2.5, label: "Graph DB" },
    { id: 'vectorDb', icon: icons.vectorDb, x: 225, y: 190, scale: 2.5, label: "Vector DB" },
    { id: 'llm', icon: icons.llm, x: 450, y: 130, scale: 2.5, label: "LLM" },
    { id: 'agent', icon: icons.agent, x: 650, y: 130, scale: 2.5, label: "Agent Response" }
  ],
  connectors: [
    { from: 'ingestion', to: 'graphDb' },
    { from: 'ingestion', to: 'vectorDb' },
    { from: 'graphDb', to: 'llm' },
    { from: 'vectorDb', to: 'llm' },
    { from: 'llm', to: 'agent' }
  ]
};

const SchematicAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Memoize the final list of elements to render
  const { nodes, connectors } = useMemo(() => {
    let delay = 0;
    const nodeElements: any[] = [];
    const connectorElements: any[] = [];
    const nodePositions: { [key: string]: { x: number, y: number } } = {};

    // 1. Create Node Elements (icons and labels)
    diagramLayout.nodes.forEach(node => {
      const groupTransform = `translate(${node.x}, ${node.y}) scale(${node.scale})`;
      const labelYPos = 24 + (20 / node.scale); // Position label below the icon, adjusting for scale
      
      nodeElements.push({
        id: node.id,
        transform: groupTransform,
        label: node.label,
        labelY: labelYPos,
        paths: node.icon,
        delay: delay
      });
      delay += 1.0; // Increment delay for the next node group

      // Store the calculated center position for connectors
      nodePositions[node.id] = {
        x: node.x + (12 * node.scale),
        y: node.y + (12 * node.scale)
      };
    });

    // 2. Create Connector Elements
    diagramLayout.connectors.forEach((conn, index) => {
      const fromPos = nodePositions[conn.from];
      const toPos = nodePositions[conn.to];

      if (fromPos && toPos) {
        // Calculate offsets to connect to icon edges, not centers
        const dirX = Math.sign(toPos.x - fromPos.x);
        const startX = fromPos.x + (dirX * 12 * diagramLayout.nodes.find(n=>n.id===conn.from)!.scale);
        const endX = toPos.x - (dirX * 12 * diagramLayout.nodes.find(n=>n.id===conn.to)!.scale);

        connectorElements.push({
          id: `conn-${index}`,
          d: `M ${startX},${fromPos.y} L ${endX},${toPos.y}`,
          delay: delay,
        });
        delay += 0.5;
      }
    });

    return { nodes: nodeElements, connectors: connectorElements };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef) };
  }, []);

  return (
    <div ref={ref} className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      {isVisible && (
        <div key={Date.now()} className={styles.schematic}>
          <svg preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgba(0, 220, 255, 1)' }} />
                <stop offset="100%" style={{ stopColor: 'rgba(0, 120, 255, 1)' }} />
              </linearGradient>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="url(#glowGradient)" />
              </marker>
            </defs>

            {/* Render Node Groups */}
            {nodes.map(node => (
              <g key={node.id} transform={node.transform} style={{ animationDelay: `${node.delay}s` }} className={styles.nodeGroup}>
                {node.paths.map((pathD: string, index: number) => (
                  <path key={index} className={styles.line} d={pathD} />
                ))}
                <text x="12" y={node.labelY} className={styles.text}>
                  {node.label}
                </text>
              </g>
            ))}

            {/* Render Connectors */}
            {connectors.map(conn => (
              <path
                key={conn.id}
                className={styles.line}
                d={conn.d}
                style={{ animationDelay: `${conn.delay}s` }}
                markerEnd="url(#arrowhead)"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};

export default SchematicAnimation;