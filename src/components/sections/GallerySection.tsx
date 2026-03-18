import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from '../../images';

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  data: {
    gallery: {
      caption: string;
      images: Array<{ id: number; alt: string }>;
    };
  };
}

export default function GallerySection({ data }: GalleryProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(gridRef.current!.querySelectorAll('.gallery-item'), {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: {
          amount: 0.8,
          from: 'random',
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-section section" id="gallery" data-section="gallery">
      <div className="gallery-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Moments
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <em>Captured</em> in time
        </motion.h2>
        <motion.p
          className="section-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '0.8rem' }}
        >
          {data.gallery.caption}
        </motion.p>
      </div>

      <div className="gallery-grid" ref={gridRef}>
        {data.gallery.images.map((img, i) => (
          <motion.div
            className="gallery-item"
            key={img.id}
            whileTap={{ scale: 1.04 }}
          >
            <img
              src={images.gallery[i] || '/images/placeholder.jpg'}
              alt={img.alt}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
