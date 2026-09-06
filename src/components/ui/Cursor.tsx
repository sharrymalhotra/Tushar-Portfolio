import React, { useEffect } from 'react';
import { useMousePosition } from '../../hooks';

const Cursor: React.FC = () => {
  const { x, y } = useMousePosition();

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor');
  }, []);

  if (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || window.matchMedia('(hover: none)').matches)
  ) {
    return null;
  }

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
        style={{
          transform: `translate(${x - 4}px, ${y - 4}px)`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
      </div>
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
        style={{
          transform: `translate(${x - 20}px, ${y - 20}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="h-8 w-8 rounded-full border border-cyan-400/30" />
      </div>
    </>
  );
};

export default Cursor;
