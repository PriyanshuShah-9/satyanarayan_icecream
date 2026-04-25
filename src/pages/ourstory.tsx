import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "../components/SiteShell";
import story2 from "../assets/story-2.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function StoryPage() {
  return (
    <SiteShell>
      <Helmet>
        <title>Our Story — Satyanarayan Ice Cream</title>
        <meta
          name="description"
          content="From a single shop in 1974 to three generations of artisans — the story of Satyanarayan Ice Cream."
        />
        <meta property="og:title" content="Our Story — Satyanarayan Ice Cream" />
        <meta
          property="og:description"
          content="Three generations of artisans. One uncompromising craft."
        />
        <meta property="og:image" content={story2} />
      </Helmet>

      <StoryHero />
      <Timeline />
      <Quote />
    </SiteShell>
  );
}

function StoryHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sh-line", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="pt-44 pb-24 md:pt-56 md:pb-40 bg-gradient-hero relative grain"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-8">
          ◦ Our story
        </p>

        <h1 className="font-display text-[12vw] md:text-[7vw] leading-[0.95]">
          <span className="block reveal-line">
            <span className="sh-line block">Fifty years</span>
          </span>
          <span className="block reveal-line">
            <span className="sh-line block italic text-gradient">
              of patience.
            </span>
          </span>
          <span className="block reveal-line">
            <span className="sh-line block">One recipe.</span>
          </span>
        </h1>
      </div>
    </section>
  );
}

function Quote() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current?.querySelectorAll(".q-word");
      if (!words) return;

      gsap.from(words, {
        opacity: 0.15,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const quote =
    "If you cannot taste the milk, the saffron, the time we spent — then we have not done our job.";

  return (
    <section
      ref={ref}
      className="py-32 md:py-56 bg-ink relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-10">
          — A note from the kitchen
        </p>

        <p className="font-display text-3xl md:text-5xl leading-[1.3] italic">
          {quote.split(" ").map((w, i) => (
            <span key={i} className="q-word inline-block mr-[0.25em]">
              {w}
            </span>
          ))}
        </p>

        <p className="mt-10 text-sm uppercase tracking-widest text-muted-foreground">
          Shivprasad Nuwal, Master Churner
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      gsap.from(".timeline-progress", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-wrapper",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      year: "1974",
      title: "The Beginning",
      text: "Three brothers — Shivprasad Nuwal, Late Mishrilalji Nuwal, and Jagdishji Nuwal — started a small ice-cream lorry in Nadiad, Gujarat.",
    },
    {
      year: "1989",
      title: "Expansion to Mehsana",
      text: "Late Mishrilalji Nuwal moved to Mehsana, Gujarat, marking the brand's first expansion.",
    },
    {
      year: "1995",
      title: "Anand Chapter Begins",
      text: "Jagdishji Nuwal moved to Anand, Gujarat, continuing the family's growth.",
    },
    {
      year: "2026",
      title: "Three Generations Strong",
      text: "Now 10+ stores across Gujarat, still rooted in tradition and hand-crafted quality.",
    },
  ];

  return (
    <section ref={ref} className="py-32 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">

        <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6 text-center">
          ◦ Timeline
        </p>

        <h2 className="font-display text-5xl md:text-7xl mb-32 text-center">
          Our Journey
        </h2>

        <div className="timeline-wrapper relative">

          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 md:-translate-x-1/2 h-full w-px bg-border/40">
            <div className="timeline-progress absolute top-0 left-0 w-full h-full bg-primary" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {items.map((item, i) => (
              <div
                key={item.year}
                className="timeline-card relative md:grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Content */}
                <div
                  className={`
                    pl-12 md:pl-0
                    ${
                      i % 2 === 0
                        ? "md:text-right md:pr-16"
                        : "md:col-start-2 md:pl-16"
                    }
                  `}
                >
                  <span className="text-primary font-display text-2xl md:text-4xl">
                    {item.year}
                  </span>

                  <h3 className="font-display text-2xl md:text-4xl mt-2 md:mt-3">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mt-2 md:mt-3 max-w-md">
                    {item.text}
                  </p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 h-3 w-3 md:h-4 md:w-4 rounded-full bg-primary shadow-glow" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
