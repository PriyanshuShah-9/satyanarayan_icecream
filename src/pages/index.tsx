import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SiteShell } from "../components/SiteShell";
import hero from "../assets/hero.jpg";
import story1 from "../assets/story-1.jpg";
import story3 from "../assets/story-3.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return (
    <SiteShell>
      <Helmet>
        <title>Satyanarayan Ice Cream — Hand-churned since 1974</title>
        <meta
          name="description"
          content="Premium artisanal ice cream and shakes, crafted in small batches with traditional Indian recipes and the finest ingredients."
        />
        <meta property="og:title" content="Satyanarayan Ice Cream" />
        <meta
          property="og:description"
          content="Hand-churned ice cream and kulfi. A heritage of taste since 1974."
        />
        <meta property="og:image" content={hero} />
      </Helmet>

      <Hero />
      <Marquee />
      <Story />
      <Pillars />
      <Featured />
      <CTA />
    </SiteShell>
  );
}

function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-title", { y: 40, opacity: 0, duration: 1 })
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, duration: 0.8 }, "-=0.5");

      gsap.to(".hero-image", {
        yPercent: 25,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -20,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-gradient-hero">
      
      {/* Background Image */}
      <div className="absolute inset-0 hero-image">
        <img src={hero} alt="Ice cream" className="absolute inset-0 w-full h-full object-cover object-center"/>
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 min-h-screen flex flex-col justify-center items-center text-center hero-content">

        <h1 className="hero-title font-display text-5xl md:text-7xl leading-tight tracking-tight">
          Satyanarayan Ice Cream
        </h1>

        <p className="hero-sub mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
          Life is Short - Scoop Your Happiness
        </p>

        <div className="hero-cta mt-10">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
          >
            View Menu →
          </Link>
        </div>

      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Sp. Anmol Ratan", "Belgian Chocolate", "Lotus Biscoff", "Anjeer", "American Dryfruit", "Calcutti Paan", "Mava Cadbury"];

  return (
    <section className="border-y border-border/40 bg-ink py-3 overflow-hidden">
      <div className="flex marquee whitespace-nowrap items-center">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="mx-8 font-display text-sm md:text-base text-foreground/70">
            {it} <span className="text-primary mx-4">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-title span", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.to(".story-img", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".story-body", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".story-body", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 md:col-start-1 relative h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-soft">
          <img
            src={story1}
            alt="Hands churning kulfi in a brass pot"
            className="story-img absolute inset-0 h-[120%] w-full object-cover"
            loading="lazy"
            width={1400}
            height={1750}
          />
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6">
            ◦ The craft
          </p>
          <h2 className="story-title font-display text-5xl md:text-7xl leading-[1.05]">
            <span className="inline-block">Slow.</span>{" "}
            <span className="inline-block">Patient.</span>{" "}
            <span className="inline-block italic text-gradient">Honest.</span>
          </h2>
          <div className="story-body mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              For over fifty years, we have refused shortcuts. Milk prepared slowly, with patience.
              Freshly prepared, never frozen, and always gluten-free.
              Nothing rushed. Nothing artificial.
            </p>
            <p>
              The result is an ice cream that doesn't just cool you down — it
              transports you to a kitchen, a memory, a moment of unhurried joy.
            </p>
          </div>
          <Link
            to="/our-story"
            className="inline-flex items-center gap-3 mt-10 text-sm uppercase tracking-widest text-foreground border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            Read our story
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { n: "01", t: "Single-origin milk", d: "Sourced from a co-operative of fifty family farms in Gujarat." },
    { n: "02", t: "Natural ingredients", d: "Real fruit, real spices, real nuts. Never an essence, never a powder." },
    { n: "03", t: "Hand-churned", d: "Small batches, traditional pots, the rhythm of an unhurried craft." },
  ];
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pillar", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-32 md:py-40 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6">◦ Our pillars</p>
          <h2 className="font-display text-5xl md:text-7xl leading-tight">
            Three things we will <span className="italic text-gradient">never</span> compromise.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((p) => (
            <div
              key={p.n}
              className="pillar group relative rounded-3xl glass p-10 hover-lift cursor-default"
            >
              <span className="font-display text-7xl text-primary/40 group-hover:text-primary transition-colors duration-700">
                {p.n}
              </span>
              <h3 className="mt-6 text-2xl font-display">{p.t}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".featured-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".featured-text > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[110vh] overflow-hidden">
      <img
        src={story3}
        alt="Sp. Anmol Ratan ice cream with kesar and dry fruits"
        className="featured-bg absolute inset-0 h-[130%] w-full object-cover"
        loading="lazy"
        width={1400}
        height={1750}
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-end pb-24 md:pb-32">
        <div className="featured-text max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6">◦ Featured</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Sp. Anmol Ratan
            <span className="italic text-gradient block">Kesar, Mawa & Dry Fruits</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            A rich, slow-prepared ice cream made with kesar, mawa and dry fruits.
            Freshly prepared, gluten-free, and never frozen.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 mt-10 rounded-full bg-cream text-ink px-8 py-4 text-sm font-medium hover:scale-[1.02] transition-transform duration-500 ease-expo"
          >
            Explore the menu
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-8">◦ Visit us</p>
        <h2 className="font-display text-5xl md:text-8xl leading-[1.05]">
          Find a scoop
          <span className="italic text-gradient block">near you.</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/locations"
            className="rounded-full bg-gradient-berry text-primary-foreground px-8 py-4 text-sm font-medium shadow-glow hover:scale-[1.02] transition-transform duration-500 ease-expo"
          >
            See all locations
          </Link>
          <Link
            to="/franchise"
            className="rounded-full border border-border text-foreground px-8 py-4 text-sm hover:bg-secondary transition-colors"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  );
}
