import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "../components/SiteShell";
import story3 from "../assets/story-3.jpg";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  name: string;
  cat: "Ice cream" | "Sundae" | "Shakes" | "Lassi";
  notes: string;
};

const items: Item[] = [
  { name: "Kesar Pista", cat: "Ice cream", notes: "Saffron, pistachio, cardamom" },
  { name: "Lotus Biscoff", cat: "Ice cream", notes: "Reduced milk, slow churned" },
  { name: "Belgian Chocolate", cat: "Ice cream", notes: "Fig, almond, honey" },
  { name: "Calcutti Paan", cat: "Ice cream", notes: "Betel leaf, gulkand, fennel" },
  { name: "Mango Alphonso", cat: "Ice cream", notes: "Single-origin Ratnagiri mango" },
  { name: "Choco Brownie", cat: "Shakes", notes: "Custard apple, hand-pulped" },
  { name: "Kaju Anjeer", cat: "Shakes", notes: "70% cocoa, Madagascan vanilla" },
  { name: "Oreo Blast", cat: "Shakes", notes: "Mahabaleshwar berries" },
  { name: "Rose Lassi", cat: "Lassi", notes: "Rose syrup, basil seed, vermicelli" },
  { name: "Rajwadi Lassi", cat: "Lassi", notes: "Saffron, dry fruits, kulfi" },
  { name: "Hot Brownie w. Vanilla", cat: "Sundae", notes: "Warm brownie, vanilla, chocolate" },
  { name: "Triple Sundae", cat: "Sundae", notes: "Mango, passionfruit, coconut" },
];

const cats = ["Ice cream", "Sundae", "Shakes", "Lassi"] as const;

export default function MenuPage() {
  const [active, setActive] = useState<(typeof cats)[number]>("Ice cream");
  const [hovered, setHovered] = useState<string | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => items.filter((i) => i.cat === active),
    [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
      });
    }, grid);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <SiteShell>
      <Helmet>
        <title>Menu — Satyanarayan Ice Cream</title>
        <meta
          name="description"
          content="Explore our seasonal selection of hand-churned ice cream, shakes and sundaes."
        />
        <meta property="og:image" content={story3} />
      </Helmet>

      {/* Hero */}
      <section className="pt-44 pb-12 md:pt-56 bg-gradient-hero grain">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[#E6C27A] mb-6">
            ◦ The menu
          </p>

          <h1 className="font-display text-6xl md:text-8xl leading-[0.95]">
            Our Best Selling Flavours,
            <span className="italic text-gradient block">
              loved by many.
            </span>
          </h1>
        </div>
      </section>

      {/* Categories (FIXED) */}
      <section
        className="sticky top-20 z-30 py-6
        bg-[#1a0f0f]/95 backdrop-blur-md
        border-b border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
      >
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-6 py-3 rounded-full text-sm font-medium
              transition-all duration-300
              border backdrop-blur-md
              ${
                active === c
                  ? "bg-linear-to-br from-[#C6A85B] via-[#E8D9A8] to-[#FFF8E7] text-black shadow-lg scale-105"
                  : "border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section ref={grid} className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.name}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`menu-card group relative rounded-3xl p-8 overflow-hidden 
              transition-all duration-500
              bg-linear-to-br from-white/10 via-white/5 to-white/10
              backdrop-blur-md border border-white/15
              hover:border-white/30
              hover:-translate-y-2
              hover:shadow-xl
              ${hovered === item.name ? "scale-[1.02]" : ""}`}
            >
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#E6C27A]">
                {item.cat}
              </span>

              <h3 className="font-display text-3xl md:text-4xl mt-5 leading-tight">
                {item.name}
              </h3>

              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {item.notes}
              </p>

              <div className="mt-8 text-xs uppercase tracking-widest text-white/60">
                Single scoop
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}