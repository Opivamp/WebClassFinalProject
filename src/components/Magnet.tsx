import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  /** Distance in px outside the element's bounds where the magnet activates. */
  padding?: number;
  /** Higher = weaker pull (the raw offset is divided by this). */
  strength?: number;
  disabled?: boolean;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  innerClassName?: string;
}

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  disabled = false,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  className = '',
  innerClassName = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) {
      setIsActive(false);
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const { left, top, width, height } = node.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      const withinX = distX < width / 2 + padding;
      const withinY = distY < height / 2 + padding;

      if (withinX && withinY) {
        setIsActive(true);
        setOffset({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, disabled]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
