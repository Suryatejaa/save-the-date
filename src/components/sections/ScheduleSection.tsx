import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTimelineDraw } from '../../hooks/useAnimations';

gsap.registerPlugin(ScrollTrigger);

const EMOJIS = ['🌸', '💒', '🍽️', '📸', '🎉'];

interface ScheduleProps {
  data: {
    schedule: Array<{
      time: string;
      event: string;
      description: string;
    }>;
  };
}

export default function ScheduleSection({ data }: ScheduleProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useTimelineDraw(lineRef);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current!.querySelectorAll('.timeline-item'), {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="schedule-section section" id="schedule" data-section="schedule">
      <motion.p
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Day of Celebration
      </motion.p>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        The <em>timeline</em>
      </motion.h2>

      <div className="timeline" ref={containerRef}>
        <div className="timeline-line" ref={lineRef} />
        {data.schedule.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot">{EMOJIS[i] || '✨'}</div>
            <div className="timeline-content">
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-event">{item.event}</div>
              <div className="timeline-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
