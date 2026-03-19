import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  onComplete: () => void;
  onStart: () => void;
}

export default function IntroOverlay({ onComplete, onStart }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial entry animation for text and line
    gsap.timeline()
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      .to(lineRef.current, {
        width: '60px',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.4')
      .to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2');
  }, []);

  const handleEnter = () => {
    // Trigger audio immediately on user click
    onStart();

    // Exit animation
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to([textRef.current, lineRef.current, btnRef.current], {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      }, '-=0.2');
  };

  return (
    <div className="intro-overlay" ref={overlayRef}>
      <div className="intro-content-wrap">
        <div className="intro-text" ref={textRef} style={{ transform: 'translateY(20px)' }}>
          With love ♡
        </div>
        <div className="intro-line" ref={lineRef} />
        <button 
          className="intro-enter-btn" 
          ref={btnRef} 
          onClick={handleEnter}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
