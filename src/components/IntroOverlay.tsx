import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(lineRef.current, {
        width: '60px',
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.2')
      .to([textRef.current, lineRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.6,
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.1');
  }, []);

  return (
    <div className="intro-overlay" ref={overlayRef}>
      <div className="intro-text" ref={textRef}>With love ♡</div>
      <div className="intro-line" ref={lineRef} />
    </div>
  );
}
