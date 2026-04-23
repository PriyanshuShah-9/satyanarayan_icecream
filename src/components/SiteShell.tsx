import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export function SiteShell({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
