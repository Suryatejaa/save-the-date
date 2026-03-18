import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  vars: gsap.TweenVars = {},
  triggerVars: ScrollTrigger.Vars = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        ...vars,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          ...triggerVars,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  stagger = 0.12,
  vars: gsap.TweenVars = {}
) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.querySelectorAll(selector), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
}

export function useTimelineDraw(lineRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);
}
