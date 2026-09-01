import { Fragment, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface CharProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ children, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder keeps the layout; the animated copy sits on top. */}
      <span className="opacity-0">{children}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({
  text,
  className = '',
  style,
}: AnimatedTextProps) {
  const element = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={element} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split('').map((char) => {
          const start = charIndex / totalChars;
          const end = (charIndex + 1) / totalChars;
          charIndex += 1;
          return { char, range: [start, end] as [number, number] };
        });
        // Account for the space that follows this word.
        charIndex += 1;

        return (
          <Fragment key={`${word}-${wordIdx}`}>
            <span className="inline-block">
              {wordChars.map(({ char, range }, i) => (
                <Char key={`${char}-${i}`} progress={scrollYProgress} range={range}>
                  {char}
                </Char>
              ))}
            </span>
            {wordIdx < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </p>
  );
}
