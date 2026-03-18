import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useStaggerReveal } from '../../hooks/useAnimations';
import { images } from '../../images';

interface CoupleProps {
  data: {
    couple: {
      partner1: { name: string; fullName: string; role: string };
      partner2: { name: string; fullName: string; role: string };
      story: string;
    };
    families: {
      bride: string;
      groom: string;
    };
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: i * 0.15 },
  }),
};

export default function CoupleSection({ data }: CoupleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(containerRef, '.couple-photo-wrap', 0.18);

  return (
    <section className="couple-section section" id="couple" data-section="couple" ref={containerRef}>
      {/* Photos */}
      <div className="couple-photos">
        <div className="couple-photo-wrap photo-1">
          <img src={images.bride} alt={data.couple.partner1.fullName} />
          <div className="photo-label">{data.couple.partner1.name}</div>
        </div>
        <div className="couple-photo-wrap photo-2">
          <img src={images.groom} alt={data.couple.partner2.fullName} />
          <div className="photo-label">{data.couple.partner2.name}</div>
        </div>
      </div>

      {/* Text */}
      <motion.p
        className="section-label"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={0}
      >
        Our Story
      </motion.p>

      <motion.h2
        className="section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={1}
      >
        A love built on<br /><em>one rainy afternoon</em>
      </motion.h2>

      <motion.p
        className="section-body"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={2}
      >
        {data.couple.story}
      </motion.p>

      <motion.div
        className="families-text"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        custom={3}
      >
        <div>{data.couple.partner1.role} — {data.families.bride}</div>
        <div style={{ marginTop: '0.5rem' }}>{data.couple.partner2.role} — {data.families.groom}</div>
      </motion.div>
    </section>
  );
}
