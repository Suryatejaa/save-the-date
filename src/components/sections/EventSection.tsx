import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventProps {
  data: {
    wedding: {
      date: string;
      day: string;
      time: string;
      venue: {
        name: string;
        address: string;
        city: string;
        mapUrl: string;
      };
    };
  };
}

const cards = [
  {
    icon: '📅',
    iconClass: 'icon-date',
    label: 'Date',
    valueKey: 'dateValue',
    subKey: 'day',
  },
  {
    icon: '🕐',
    iconClass: 'icon-time',
    label: 'Time',
    valueKey: 'time',
    subKey: null,
  },
  {
    icon: '📍',
    iconClass: 'icon-venue',
    label: 'Venue',
    valueKey: 'venueName',
    subKey: 'venueCity',
  },
];

export default function EventSection({ data }: EventProps) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current!.querySelectorAll('.event-card'), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  const cardData = [
    {
      icon: '📅', iconClass: 'icon-date', label: 'Date',
      value: data.wedding.date, sub: data.wedding.day,
    },
    {
      icon: '🕐', iconClass: 'icon-time', label: 'Time',
      value: data.wedding.time, sub: 'Ceremony begins',
    },
    {
      icon: '📍', iconClass: 'icon-venue', label: 'Venue',
      value: data.wedding.venue.name, sub: data.wedding.venue.city,
    },
  ];

  return (
    <section className="event-section section" id="event" data-section="event">
      <motion.p
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Save The Date
      </motion.p>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Join us for our<br /><em>special day</em>
      </motion.h2>

      <div ref={cardsRef} className="event-cards">
        {cardData.map((card, i) => (
          <div className="event-card" key={i}>
            <div className={`event-card-icon ${card.iconClass}`}>{card.icon}</div>
            <div className="event-card-text">
              <h3>{card.label}</h3>
              <p>{card.value}</p>
              <small>{card.sub}</small>
            </div>
          </div>
        ))}
      </div>

      <motion.a
        href={data.wedding.venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-mid)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          borderBottom: '1px solid var(--dusty-rose)',
          paddingBottom: '2px',
        }}
      >
        🗺 Get Directions
      </motion.a>
    </section>
  );
}
