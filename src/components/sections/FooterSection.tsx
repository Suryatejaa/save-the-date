import { motion } from 'framer-motion';

interface FooterProps {
  data: {
    footer: {
      quote: string;
      hashtag: string;
    };
    couple: {
      partner1: { name: string };
      partner2: { name: string };
    };
    wedding: { date: string };
  };
}

export default function FooterSection({ data }: FooterProps) {
  return (
    <section className="footer-section section" id="footer" data-section="footer">
      <motion.div
        className="footer-quote"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        "{data.footer.quote}"
      </motion.div>

      <motion.div
        className="footer-hashtag"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {data.footer.hashtag}
      </motion.div>

      <motion.div
        className="footer-names-final"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {data.couple.partner1.name} & {data.couple.partner2.name}
      </motion.div>

      <p className="footer-copy">{data.wedding.date} · With love ♡</p>
    </section>
  );
}
