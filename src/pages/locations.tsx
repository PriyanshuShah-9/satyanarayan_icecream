import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "../components/SiteShell";

gsap.registerPlugin(ScrollTrigger);

type Loc = {
  city: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  map: string;
};

const locations: Loc[] = [
  {
    city: "Nadiad",
    area: "Radhe Icon, Piplag Road",
    address: "Radhe Icon, Piplag Road, Nadiad",
    hours: "12:00 — 24:00 daily",
    phone: "+91 9825322117",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5307100363234!2d72.8581738750808!3d22.671279379421556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b005f96c82f%3A0x9e4efa3d693dee96!2sSatyanarayan%20Ice%20Cream!5e0!3m2!1sen!2sin!4v1776702850251!5m2!1sen!2sin",
  },
  {
    city: "Nadiad",
    area: "Opposite Nadiad Bus Station",
    address: "Opp. Nadiad Bus Station, Nadiad",
    hours: "11:00 — 23:30 daily",
    phone: "+91 9428436003",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9455910998527!2d72.85752767508149!3d22.693069279406018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b0f0eaa9e4b%3A0xb8fffa9f16a65bfd!2sShree%20Satyanarayan%20ice%20cream!5e0!3m2!1sen!2sin!4v1776702894504!5m2!1sen!2sin",
  },
  {
    city: "Nadiad",
    area: "Ghodia Bazaar",
    address: "Station Rd, Ghodia Bazaar, Nadiad",
    hours: "11:00 — 23:00 daily",
    phone: "+91 9428436404",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9137499426683!2d72.85728657508159!3d22.694254479405277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b0efdac0c3b%3A0x6661921bc9f21bd3!2s338%2C%20Station%20Rd%2C%20Ghodia%20Bazar%2C%20Junaraopura%2C%20Nadiad%2C%20Gujarat%20387001!5e0!3m2!1sen!2sin!4v1776702921195!5m2!1sen!2sin",
  },
];

export default function LocationsPage() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".loc-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".loc-list",
          start: "top 85%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SiteShell>
      <Helmet>
        <title>Locations — Satyanarayan Ice Cream</title>
      </Helmet>

      {/* Hero */}
      <section className="pt-44 pb-16 md:pt-56 bg-gradient-hero grain">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6">
            ◦ Locations
          </p>

          <h1 className="font-display text-6xl md:text-8xl leading-[0.95]">
            10+ parlours,
            <span className="italic text-gradient block">
              one obsession.
            </span>
          </h1>
        </div>
      </section>

      {/* Locations */}
      <section ref={root} className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: Location Cards */}
          <div className="loc-list w-full min-w-[320px] space-y-4 lg:max-h-[80vh] lg:overflow-y-auto pr-2 bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10">

            {locations.map((l, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`loc-card w-full text-left rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${
                  active === i
                    ? "bg-linear-to-br from-[#C6A85B] via-[#E8D9A8] to-[#FFF8E7] text-white shadow-xl scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex justify-between text-xs uppercase opacity-70">
                  <span>{l.area}</span>
                  <span>0{i + 1}</span>
                </div>

                <h3 className="text-2xl mt-2 font-semibold">{l.city}</h3>

                <p className="text-sm mt-2 opacity-80">{l.address}</p>

                <div className="text-xs mt-3 flex gap-4 opacity-70">
                  <span>{l.hours}</span>
                  <span>{l.phone}</span>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT: Map */}
          <div className="relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-md h-125 lg:h-[80vh] shadow-lg">

            <iframe
              key={active}
              title={`Map of ${locations[active].city}`}
              src={locations[active].map}
              className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition duration-500"
              loading="lazy"
            />

            <div className="absolute bottom-5 left-5 right-5 bg-black/50 backdrop-blur-md p-4 rounded-xl text-white">
              <p className="text-xs text-saffron uppercase">Now showing</p>
              <p className="text-lg font-semibold">
                {locations[active].city} — {locations[active].area}
              </p>
            </div>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}