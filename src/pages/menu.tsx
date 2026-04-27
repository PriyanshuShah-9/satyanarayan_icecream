import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "../components/SiteShell";
import story3 from "../assets/story-3.jpeg";

gsap.registerPlugin(ScrollTrigger);

type Item = {
  name: string;
  cat: "Ice Cream" | "Sundae" | "Shakes" | "Lassi";
  notes: string;
};

const items: Item[] = [
  // ICE CREAM
  { name: "Lotus Biscoff", cat: "Ice Cream", notes: "Caramelized biscuit spread, rich and creamy" },
  { name: "Belgian Chocolate", cat: "Ice Cream", notes: "Dark chocolate, smooth and indulgent" },
  { name: "Sp. Anmol Ratan", cat: "Ice Cream", notes: "Kesar, mava, and dryfruit royal blend" },
  { name: "Roasted Dryfruit", cat: "Ice Cream", notes: "Dry fruits roasted in ghee, rich and aromatic" },
  { name: "Mava Malti", cat: "Ice Cream", notes: "Mava, dry fruits, and gulkand blend" },
  { name: "American Dryfruit", cat: "Ice Cream", notes: "Premium mixed nuts, rich and crunchy" },

  // SHAKES
  { name: "Ferrero Rocher Nutella", cat: "Shakes", notes: "Hazelnut chocolate, ultra premium blend" },
  { name: "Kaju Anjeer", cat: "Shakes", notes: "Cashew and fig, royal dry fruit mix" },
  { name: "Brownella", cat: "Shakes", notes: "Chocolate brownie + Nutella fusion" },
  { name: "Oreo Blast", cat: "Shakes", notes: "Cookies and cream, crunchy and smooth" },
  { name: "Choco Brownie", cat: "Shakes", notes: "Rich chocolate shake with brownie chunks" },
  { name: "Cold Cocoa Special", cat: "Shakes", notes: "Cold cocoa with ice cream, chips, and cashew topping" },

  // SUNDAES
  { name: "Triple Sundae", cat: "Sundae", notes: "Three flavors layered, fruity and creamy" },
  { name: "Biscoff Brownie Overload", cat: "Sundae", notes: "Brownie + biscoff, rich dessert combo" },
  { name: "Hot Brownie with Vanilla", cat: "Sundae", notes: "Warm brownie, vanilla, chocolate drizzle" },
  { name: "Double Sundae", cat: "Sundae", notes: "Two flavors, balanced and creamy" },
  { name: "Single Sundae", cat: "Sundae", notes: "Simple classic sundae" },
  { name: "Dryfruit Sundae", cat: "Sundae", notes: "Nutty, rich, and mildly sweet" },

  // LASSI
  { name: "Rajwadi", cat: "Lassi", notes: "Saffron, dry fruits, thick and royal" },
  { name: "Dryfruit", cat: "Lassi", notes: "Loaded with mixed nuts" },
  { name: "Kaju", cat: "Lassi", notes: "Smooth cashew-based richness" },
  { name: "Mango", cat: "Lassi", notes: "Sweet and refreshing fruit lassi" }
];

const cats = ["Ice Cream", "Sundae", "Shakes", "Lassi"] as const;

export default function MenuPage() {
  const [active, setActive] = useState<(typeof cats)[number]>("Ice Cream");
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
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}