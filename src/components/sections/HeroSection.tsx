import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { images } from '../../images';

interface HeroProps {
  data: {
    couple: {
      partner1: { name: string };
      partner2: { name: string };
    };
    wedding: {
      date: string;
      day: string;
    };
  };
}

export default function HeroSection({ data }: HeroProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(namesRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .to(dividerRef.current, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .to(dateRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, '+=0.4');
  }, []);

  return (
    <section className="hero-section section" id="hero" data-section="hero">
      <img
        src={images.hero}
        alt={`${data.couple.partner1.name} & ${data.couple.partner2.name}`}
        className="hero-bg"
        loading="eager"
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-eyebrow" ref={eyebrowRef} style={{ transform: 'translateY(10px)' }}>
          You are cordially invited
        </div>

        <div className="hero-names" ref={namesRef} style={{ transform: 'translateY(20px)' }}>
          {data.couple.partner1.name}
          <br />
          <span className="hero-ampersand">&</span>
          <br />
          {data.couple.partner2.name}
        </div>

        <div className="hero-divider" ref={dividerRef} style={{ transform: 'scaleX(0)' }} />

        <div className="hero-date" ref={dateRef} style={{ transform: 'translateY(10px)' }}>
          {data.wedding.day} · {data.wedding.date}
        </div>

        <div className="hero-scroll-hint" ref={scrollHintRef}>
          <span className="line" />
          scroll
        </div>
      </div>
    </section>
  );
}
