import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { SiteShell } from "../components/SiteShell";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { t: "Trusted local brand", d: "Well-known in the community with a loyal, repeat customer base built over the years." },
  { t: "Consistent quality", d: "Recognized for delivering high-quality ice cream and maintaining customer satisfaction." },
  { t: "Established operations", d: "Fully set up outlet with proven daily operations and supplier network in place." },
  { t: "Growth potential", d: "Strong foundation with opportunities to expand menu, delivery, and reach." },
];

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd9LlIgLNf-wGtC7W_pVR_WgAzsVPw4Udn_TZLjXIhfCKpqXA/viewform";

const contacts = [
  {
  icon: Phone,
  label: "Call us",
  value: "+91 98253 22117 / +91 94284 36003",
  href: "tel:+919825322117",
  },
  {
    icon: Mail,
    label: "Write to us",
    value: "franchise@satyanarayan.com",
    href: "mailto:shreesatyanarayanmix@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@satyanarayan_icecream",
    href: "https://www.instagram.com/satyanarayan_icecream",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Satyanarayan Ice Cream",
    href: "https://www.facebook.com",
  },
];

export default function FranchisePage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".f-line", {
        y: 100,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.from(".f-benefit", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".f-benefits",
          start: "top 75%",
        },
      });

      gsap.from(".f-cta", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".f-cta",
          start: "top 80%",
        },
      });

      gsap.from(".f-contact", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".f-contacts",
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SiteShell>
      <Helmet>
        <title>Franchise — Satyanarayan Ice Cream</title>
        <meta
          name="description"
          content="Partner with a fifty-year-old heritage brand. Apply to open a Satyanarayan parlour in your city."
        />
        <meta property="og:title" content="Franchise — Satyanarayan Ice Cream" />
        <meta
          property="og:description"
          content="Partner with a fifty-year-old heritage brand."
        />
      </Helmet>

      <div ref={root}>
        
        {/* Hero Section */}
        <section className="pt-44 pb-20 md:pt-56 md:pb-32 bg-gradient-hero grain relative">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-6">
                ◦ Franchise
              </p>

              <h1 className="font-display text-[12vw] md:text-[7vw] leading-[0.95]">
                <span className="block">
                  <span className="f-line block">Bring the</span>
                </span>

                <span className="block">
                  <span className="f-line block italic text-gradient">
                    heritage
                  </span>
                </span>

                <span className="block">
                  <span className="f-line block">to your city.</span>
                </span>
              </h1>
            </div>

            <div className="md:col-span-4">
              <p className="f-line text-lg text-muted-foreground leading-relaxed">
                We open one or two new parlours each year. Each is a careful
                partnership — never a transaction.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="f-benefits py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-4xl md:text-6xl mb-16 max-w-2xl">
              What partnership{" "}
              <span className="italic text-gradient">looks like.</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div
                  key={b.t}
                  className="f-benefit rounded-3xl glass p-8 hover-lift"
                >
                  <span className="font-display text-4xl text-primary/40">
                    0{i + 1}
                  </span>

                  <h3 className="mt-6 font-display text-xl">{b.t}</h3>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="f-cta rounded-3xl glass p-8 md:p-16 shadow-soft text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-saffron mb-4">
                ◦ Apply to partner
              </p>
              <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
                Tell us about <span className="italic text-gradient">your city.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                Share your details through our application form. We respond to every
                applicant within 7 business days.
              </p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-saffron text-ink px-8 py-4 font-medium transition-transform hover:scale-[1.02] shadow-soft"
              >
                Open application form
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-6 text-xs text-muted-foreground">
                Opens Google Forms in a new tab.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="f-contacts py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="f-contact rounded-3xl glass p-8 block"
                >
                  <Icon className="w-5 h-5 mb-4" />
                  <p className="text-xs uppercase">{label}</p>
                  <p className="font-display text-lg">{value}</p>
                </a>
              ))}
            </div>

          </div>
        </section>

      </div>
    </SiteShell>
  );
}