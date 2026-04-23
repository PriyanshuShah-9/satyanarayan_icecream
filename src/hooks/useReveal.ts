import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates direct children of the ref into view on scroll with a stagger.
 * Add `data-reveal` to children you want animated, or it will pick all direct children.
 */
export function useReveal<T extends HTMLElement>(options?: {
  y?: number;
  stagger?: number;
  duration?: number;
  selector?: string;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = options?.selector
      ? el.querySelectorAll(options.selector)
      : el.querySelectorAll("[data-reveal]");

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: options?.y ?? 60,
        opacity: 0,
        duration: options?.duration ?? 1.1,
        ease: "expo.out",
        stagger: options?.stagger ?? 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.stagger, options?.duration, options?.selector]);

  return ref;
}
