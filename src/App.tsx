import { useState, useEffect, useRef } from 'react';
import './index.css';

import IntroOverlay from './components/IntroOverlay';
import DesktopBarrier from './components/DesktopBarrier';
import HeroSection from './components/sections/HeroSection';
import CoupleSection from './components/sections/CoupleSection';
import EventSection from './components/sections/EventSection';
import ScheduleSection from './components/sections/ScheduleSection';
import GallerySection from './components/sections/GallerySection';
import RSVPSection from './components/sections/RSVPSection';
import FooterSection from './components/sections/FooterSection';

type WeddingData = {
  couple: {
    partner1: { name: string; fullName: string; role: string };
    partner2: { name: string; fullName: string; role: string };
    tagline: string;
    story: string;
  };
  wedding: {
    date: string;
    dateISO: string;
    day: string;
    time: string;
    venue: { name: string; address: string; city: string; mapUrl: string };
  };
  schedule: Array<{ time: string; event: string; description: string }>;
  gallery: {
    caption: string;
    images: Array<{ id: number; alt: string }>;
  };
  rsvp: {
    message: string;
    deadline: string;
    whatsapp: string;
    contactName: string;
  };
  families: { bride: string; groom: string };
  footer: { quote: string; hashtag: string };
};

export default function App() {
  const [data, setData] = useState<WeddingData | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/wedding-details.json')
      .then(res => res.json())
      .then((json: WeddingData) => setData(json))
      .catch(err => console.error('Failed to load wedding details:', err));
  }, []);

  useEffect(() => {
    // Initialize audio once
    const audio = new Audio('/music/bgm.mp3');
    audio.loop = true;
    audioRef.current = audio;

    const attemptPlay = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.play()
          .then(() => {
            // Once playing, we can remove the global interaction listeners
            document.removeEventListener('click', attemptPlay);
            document.removeEventListener('touchstart', attemptPlay);
            document.removeEventListener('scroll', attemptPlay);
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.log('Autoplay waiting for interaction:', err);
            }
          });
      }
    };

    // Attach interaction listeners
    document.addEventListener('click', attemptPlay, { once: true });
    document.addEventListener('touchstart', attemptPlay, { once: true });
    document.addEventListener('scroll', attemptPlay, { once: true });

    // Initial attempt
    attemptPlay();

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('touchstart', attemptPlay);
      document.removeEventListener('scroll', attemptPlay);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        if (err.name !== 'NotAllowedError') {
          console.error('Play failed:', err);
        }
      });
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  if (!data) {
    return (
      <div style={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        fontStyle: 'italic',
        color: 'var(--text-dark)',
        background: 'var(--cream)',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <DesktopBarrier />

      {!introComplete && (
        <IntroOverlay onComplete={() => setIntroComplete(true)} />
      )}

      {/* Music Toggle Button */}
      {introComplete && (
        <button 
          className={`music-toggle ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v4.5a3.5 3.5 0 1 0 3 3V12l7-2"></path>
              <path d="M12 12l5.1-1.45"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          )}
        </button>
      )}

      <div id="app-wrapper">
        <HeroSection data={data} />
        <CoupleSection data={data} />
        <EventSection data={data} />
        <ScheduleSection data={data} />
        <GallerySection data={data} />
        <RSVPSection data={data} />
        <FooterSection data={data} />
      </div>
    </>
  );
}
