import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Instagram, Facebook } from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/satyanarayan_icecream",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1DYw8Qanig/?mibextid=wwXIfr",
    label: "Facebook",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-ink">
      <div className="absolute inset-0 bg-gradient-hero opacity-40" aria-hidden />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt=""
                className="h-12 w-12"
                loading="lazy"
                width={48}
                height={48}
              />
              <span className="font-display text-xl">Satyanarayan</span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Hand-churned in small batches since 1974. A taste of India's most
              beloved kulfi, perfected one scoop at a time.
            </p>
          </div>

          {/* Explore */}
          <FooterCol
            title="Explore"
            links={[
              ["Home", "/"],
              ["Our Story", "/our-story"],
              ["Menu", "/menu"],
            ]}
          />

          {/* Visit */}
          <FooterCol
            title="Visit"
            links={[
              ["Locations", "/locations"],
              ["Franchise", "/franchise"],
            ]}
          />

          {/* Social */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Follow Us
            </h4>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-primary/10 hover:border-primary/30 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-white/80" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Satyanarayan Ice Cream. Crafted with
            patience.
          </p>
          <p className="font-display italic">"शुद्धता हर स्कूप में"</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link
              to={to}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}