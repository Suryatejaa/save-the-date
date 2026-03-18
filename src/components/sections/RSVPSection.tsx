import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const PARTICLE_COUNT = 18;

interface RSVPProps {
  data: {
    rsvp: {
      message: string;
      deadline: string;
      whatsapp: string;
      contactName: string;
    };
    couple: {
      partner1: { name: string };
      partner2: { name: string };
    };
  };
}

export default function RSVPSection({ data }: RSVPProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Hi ${data.rsvp.contactName}! I'd love to attend the wedding of ${data.couple.partner1.name} & ${data.couple.partner2.name}. Count me in! 🎉`
  );
  const waLink = `https://wa.me/${data.rsvp.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 4,
    left: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 8,
    color: ['var(--blush)', 'var(--lavender)', 'var(--champagne)', 'var(--sage)'][Math.floor(Math.random() * 4)],
  }));

  return (
    <section className="rsvp-section section" id="rsvp" data-section="rsvp" ref={sectionRef}>
      {/* Floating particles */}
      <div className="rsvp-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="rsvp-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: '-20px',
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="rsvp-card" ref={cardRef}>
        <span className="rsvp-icon">💌</span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          Will you <em>join us?</em>
        </motion.h2>

        <div className="rsvp-deadline">Kindly respond by {data.rsvp.deadline}</div>

        <p className="rsvp-message">{data.rsvp.message}</p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rsvp-btn rsvp-btn-pulse"
          id="rsvp-whatsapp-btn"
        >
          <span>💬 RSVP on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
