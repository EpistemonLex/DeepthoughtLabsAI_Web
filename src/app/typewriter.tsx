
'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter = ({ text, speed = 30 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let i = 0;
            const type = () => {
              if (i < text.length) {
                if (text.substring(i, i + 6) === '&apos;') {
                  setDisplayedText((prev) => prev + "'");
                  i += 6;
                } else {
                  setDisplayedText((prev) => prev + text.charAt(i));
                  i++;
                }
                setTimeout(type, speed);
              } else {
                setIsDone(true);
              }
            };
            type();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    const currentRef = pRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [text, speed]);

  return (
    <p
      ref={pRef}
      className={`typewriter-text ${isDone ? 'done' : ''}`}
    >
      {displayedText}
    </p>
  );
};

export default Typewriter;
