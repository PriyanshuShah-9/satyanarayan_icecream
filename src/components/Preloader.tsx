import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = Math.min(1, elapsed / duration);
      // ease-out cubic
      const value = 1 - Math.pow(1 - eased, 3);
      setProgress(value * 100);
      if (eased < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // start exit
        setTimeout(() => setLeaving(true), 250);
        setTimeout(() => setHidden(true), 1100);
      }
    };
    raf = requestAnimationFrame(tick);

    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
    }
  }, [hidden]);

  if (hidden) return null;

  // Fill mask: as progress grows, the cream rises inside the cup
  const fillY = 100 - progress; // top of fill (in percent of cup height)

  return (
    <div
      aria-hidden={leaving}
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-gradient-hero grain transition-opacity duration-700 ease-expo ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Brand mark */}
      <div className="mb-10 text-center">
        <p className="font-display text-2xl tracking-[0.3em] text-cream/80 uppercase">
          Satyanarayan
        </p>
        <p className="mt-1 text-[10px] tracking-[0.5em] text-saffron/70 uppercase">
          Est. 1974
        </p>
      </div>

      {/* Cup illustration */}
      <div className="relative">
        <svg
          width="180"
          height="220"
          viewBox="0 0 180 220"
          fill="none"
          className={`drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-expo ${
            leaving ? "-translate-y-7.5 scale-95" : ""
          }`}
        >
          <defs>
            <linearGradient id="cream-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.96 0.04 85)" />
              <stop offset="60%" stopColor="oklch(0.78 0.16 70)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 12)" />
            </linearGradient>
            <linearGradient id="cup-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0 / 0.12)" />
              <stop offset="100%" stopColor="oklch(1 0 0 / 0.04)" />
            </linearGradient>
            {/* Clip path shaped like the inside of the cup */}
            <clipPath id="cup-clip">
              <path d="M44 70 L136 70 L124 198 Q90 206 56 198 Z" />
            </clipPath>
          </defs>

          {/* Cup body (glass) */}
          <path
            d="M40 66 L140 66 L126 200 Q90 210 54 200 Z"
            fill="url(#cup-grad)"
            stroke="oklch(1 0 0 / 0.25)"
            strokeWidth="1.5"
          />

          {/* Cream fill */}
          <g clipPath="url(#cup-clip)">
            <rect
              x="40"
              y={70 + (fillY / 100) * 130}
              width="100"
              height="200"
              fill="url(#cream-grad)"
            />
            {/* Wavy surface */}
            <path
              d={`M40 ${70 + (fillY / 100) * 130} 
                  Q 65 ${66 + (fillY / 100) * 130} 90 ${70 + (fillY / 100) * 130}
                  T 140 ${70 + (fillY / 100) * 130}
                  L 140 ${72 + (fillY / 100) * 130}
                  L 40 ${72 + (fillY / 100) * 130} Z`}
              fill="oklch(0.96 0.04 85)"
              opacity="0.9"
            >
              <animate
                attributeName="d"
                dur="2s"
                repeatCount="indefinite"
                values={`
                  M40 ${70 + (fillY / 100) * 130} Q 65 ${66 + (fillY / 100) * 130} 90 ${70 + (fillY / 100) * 130} T 140 ${70 + (fillY / 100) * 130} L 140 ${72 + (fillY / 100) * 130} L 40 ${72 + (fillY / 100) * 130} Z;
                  M40 ${70 + (fillY / 100) * 130} Q 65 ${74 + (fillY / 100) * 130} 90 ${70 + (fillY / 100) * 130} T 140 ${70 + (fillY / 100) * 130} L 140 ${72 + (fillY / 100) * 130} L 40 ${72 + (fillY / 100) * 130} Z;
                  M40 ${70 + (fillY / 100) * 130} Q 65 ${66 + (fillY / 100) * 130} 90 ${70 + (fillY / 100) * 130} T 140 ${70 + (fillY / 100) * 130} L 140 ${72 + (fillY / 100) * 130} L 40 ${72 + (fillY / 100) * 130} Z
                `}
              />
            </path>
          </g>

          {/* Scoop on top — appears when nearly full */}
          {progress > 80 && (
            <g
              style={{
                transformOrigin: "90px 60px",
                animation: "scoop-pop 0.6s var(--ease-out-expo) both",
              }}
            >
              <circle cx="90" cy="56" r="26" fill="url(#cream-grad)" />
              <circle cx="82" cy="50" r="6" fill="oklch(1 0 0 / 0.35)" />
              {/* Cherry */}
              <circle cx="90" cy="28" r="6" fill="oklch(0.55 0.22 15)" />
              <path
                d="M90 22 Q 96 12 104 14"
                stroke="oklch(0.5 0.15 140)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Drizzle drop */}
          <circle
            cx="90"
            cy={20 + (progress / 100) * 40}
            r={progress < 80 ? 3 : 0}
            fill="oklch(0.72 0.18 12)"
            opacity="0.8"
          />

          {/* Cup rim highlight */}
          <ellipse
            cx="90"
            cy="66"
            rx="50"
            ry="4"
            fill="none"
            stroke="oklch(1 0 0 / 0.3)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Progress bar + label */}
      <div className="mt-12 w-55">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-cream/10">
          <div
            className="h-full bg-gradient-warm transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.3em] text-cream/60 uppercase font-body">
          <span>Churning</span>
          <span className="tabular-nums">{Math.floor(progress)}%</span>
        </div>
      </div>

      <style>{`
        @keyframes scoop-pop {
          0% { transform: scale(0) translateY(20px); opacity: 0; }
          60% { transform: scale(1.1) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
