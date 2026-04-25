import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [, setDrips] = useState<number[]>([]);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = Math.min(1, elapsed / duration);
      const value = 1 - Math.pow(1 - eased, 3);
      setProgress(value * 100);
      if (eased < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLeaving(true), 400);
        setTimeout(() => setHidden(true), 1200);
      }
    };
    raf = requestAnimationFrame(tick);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Spawn drip trails at intervals
    const dripInterval = setInterval(() => {
      setDrips((d) => [...d.slice(-6), Date.now()]);
    }, 380);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      clearInterval(dripInterval);
    };
  }, []);

  useEffect(() => {
    if (hidden) document.body.style.overflow = "";
  }, [hidden]);

  if (hidden) return null;

  const showScoop2 = progress > 45;
  const showScoop3 = progress > 75;
  const showCherry = progress > 88;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Josefin+Sans:wght@100;200;300&display=swap');

        :root {
          --vanilla: #fef3dc;
          --caramel: #c8813a;
          --butterscotch: #e8a84a;
          --chocolate: #3d1c0a;
          --strawberry: #d4556a;
          --mint: #7ab89a;
          --cream: #fdf6ec;
          --shadow-warm: rgba(61, 28, 10, 0.35);
        }

        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--chocolate);
          overflow: hidden;
          transition: opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .preloader-root.leaving {
          opacity: 0;
          pointer-events: none;
        }

        /* Noise grain overlay */
        .preloader-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.18;
          pointer-events: none;
        }

        /* Radial warm glow behind cone */
        .preloader-root::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 129, 58, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .brand-wrap {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 2.4rem;
          color: var(--vanilla);
          letter-spacing: 0.12em;
          line-height: 1;
          margin: 0;
        }

        .brand-sub {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 100;
          font-size: 0.55rem;
          letter-spacing: 0.55em;
          color: var(--butterscotch);
          text-transform: uppercase;
          margin-top: 0.5rem;
          opacity: 0.85;
        }

        .cone-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: coneEntrance 1s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s both;
        }

        .cone-wrap.leaving {
          animation: coneLeave 0.7s cubic-bezier(0.76, 0, 0.24, 1) both;
        }

        /* Decorative ring divider */
        .divider-ring {
          position: relative;
          z-index: 2;
          margin-top: 2.8rem;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          animation: fadeUp 1s 0.5s both;
        }

        .divider-ring span {
          display: block;
          height: 1px;
          width: 60px;
          background: linear-gradient(to right, transparent, rgba(232, 168, 74, 0.4), transparent);
        }

        .divider-ring .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--butterscotch);
          opacity: 0.5;
        }

        /* Loading label */
        .load-label {
          position: relative;
          z-index: 2;
          margin-top: 1.4rem;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 100;
          font-size: 0.6rem;
          letter-spacing: 0.55em;
          color: rgba(254, 243, 220, 0.45);
          text-transform: uppercase;
          animation: pulse-label 2s ease-in-out infinite;
        }

        /* Floating sprinkle dots background */
        .sprinkle {
          position: absolute;
          border-radius: 2px;
          opacity: 0;
          animation: sprinkle-float linear infinite;
        }

        @keyframes sprinkle-float {
          0%   { transform: translateY(0) rotate(var(--r)); opacity: 0; }
          10%  { opacity: var(--o); }
          90%  { opacity: var(--o); }
          100% { transform: translateY(-110vh) rotate(calc(var(--r) + 360deg)); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes coneEntrance {
          from { opacity: 0; transform: translateY(30px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes coneLeave {
          from { transform: scale(1) translateY(0); opacity: 1; }
          to   { transform: scale(0.9) translateY(-20px); opacity: 0; }
        }

        @keyframes scoop-pop {
          0%   { transform: scale(0) translateY(18px); opacity: 0; }
          65%  { transform: scale(1.08) translateY(-3px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes cherry-drop {
          0%   { transform: translateY(-10px) scale(0); opacity: 0; }
          70%  { transform: translateY(2px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes drip-fall {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0.9; }
          80%  { transform: scaleY(1); transform-origin: top; opacity: 0.9; }
          100% { transform: scaleY(1); opacity: 0; }
        }

        @keyframes pulse-label {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.75; }
        }

        .drip-line {
          animation: drip-fall 1.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>

      {/* Floating sprinkles background */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="sprinkle"
          style={{
            left: `${5 + (i * 5.5) % 93}%`,
            bottom: `${-10 + (i * 7) % 20}%`,
            width: `${3 + (i % 3)}px`,
            height: `${8 + (i % 5)}px`,
            background: [
              "#d4556a", "#7ab89a", "#e8a84a", "#c8813a", "#fef3dc",
            ][i % 5],
            animationDuration: `${7 + (i * 1.3) % 9}s`,
            animationDelay: `${(i * 0.6) % 5}s`,
            "--r": `${(i * 47) % 360}deg`,
            "--o": `${0.15 + (i % 4) * 0.07}`,
          } as React.CSSProperties}
        />
      ))}

      <div
        className={`preloader-root${leaving ? " leaving" : ""}`}
        aria-hidden={leaving}
      >
        {/* Brand */}
        <div className="brand-wrap">
          <p className="brand-name">Satyanarayan</p>
          <p className="brand-sub">Artisan Creamery &nbsp;·&nbsp; Est. 1974</p>
        </div>

        {/* Ice cream cone SVG */}
        <div className={`cone-wrap${leaving ? " leaving" : ""}`}>
          <svg
            width="200"
            height="310"
            viewBox="0 0 200 310"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 24px 48px rgba(61,28,10,0.6))" }}
          >
            <defs>
              {/* Vanilla scoop gradient */}
              <radialGradient id="scoop1-grad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#fef6e4" />
                <stop offset="55%" stopColor="#f5d98a" />
                <stop offset="100%" stopColor="#d4a040" />
              </radialGradient>
              {/* Strawberry scoop */}
              <radialGradient id="scoop2-grad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#f9cdd4" />
                <stop offset="55%" stopColor="#e07080" />
                <stop offset="100%" stopColor="#b84058" />
              </radialGradient>
              {/* Pistachio scoop */}
              <radialGradient id="scoop3-grad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#d8eedc" />
                <stop offset="55%" stopColor="#7dba8e" />
                <stop offset="100%" stopColor="#3d8858" />
              </radialGradient>
              {/* Cone waffle */}
              <linearGradient id="cone-grad" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#c97b30" />
                <stop offset="50%" stopColor="#a05520" />
                <stop offset="100%" stopColor="#6b3210" />
              </linearGradient>
              {/* Drizzle */}
              <linearGradient id="drizzle-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8813a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7a3a10" stopOpacity="0.5" />
              </linearGradient>
              {/* Cone shadow at base */}
              <radialGradient id="cone-shadow" cx="50%" cy="0%" r="60%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              {/* Cup inner clip */}
              <clipPath id="scoop1-clip">
                <circle cx="100" cy="200" r="46" />
              </clipPath>
            </defs>

            {/* CONE body — waffle pattern */}
            <path
              d="M62 230 L138 230 L100 305 Z"
              fill="url(#cone-grad)"
            />
            {/* Waffle crosshatch lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`wl${i}`}
                x1={63 + i * 16}
                y1={230}
                x2={100 + (i - 2) * 3}
                y2={305}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}
            {[1, 2, 3, 4].map((i) => (
              <line
                key={`wh${i}`}
                x1={62 + i * 4}
                y1={230 + i * 16}
                x2={138 - i * 4}
                y2={230 + i * 16}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.8"
              />
            ))}
            {/* Cone rim highlight */}
            <ellipse
              cx="100"
              cy="230"
              rx="38"
              ry="5"
              fill="rgba(255,255,255,0.12)"
            />

            {/* SCOOP 1 — Vanilla (base, fills up) */}
            <g>
              {/* Fill animation via clipRect */}
              <clipPath id="fill-clip">
                <rect
                  x="54"
                  y={204 - (progress / 100) * 92}
                  width="92"
                  height="92"
                />
              </clipPath>
              <circle cx="100" cy="200" r="46" fill="rgba(255,255,255,0.04)" />
              <circle
                cx="100"
                cy="200"
                r="46"
                fill="url(#scoop1-grad)"
                clipPath="url(#fill-clip)"
              />
              {/* Scoop surface shimmer */}
              <ellipse
                cx="88"
                cy="172"
                rx="14"
                ry="8"
                fill="rgba(255,255,255,0.22)"
                opacity={progress > 60 ? 1 : 0}
                style={{ transition: "opacity 0.4s" }}
              />
            </g>

            {/* Caramel drizzle drips on scoop 1 */}
            {progress > 50 && (
              <g className="drip-line">
                <path
                  d="M115 190 Q118 205 116 218"
                  stroke="url(#drizzle-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M82 185 Q79 200 80 215"
                  stroke="url(#drizzle-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {/* SCOOP 2 — Strawberry */}
            {showScoop2 && (
              <g
                style={{
                  transformOrigin: "100px 158px",
                  animation: "scoop-pop 0.65s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
              >
                <circle cx="100" cy="158" r="40" fill="url(#scoop2-grad)" />
                <ellipse
                  cx="90"
                  cy="136"
                  rx="11"
                  ry="7"
                  fill="rgba(255,255,255,0.2)"
                />
                {/* Tiny strawberry seed dots */}
                {[[95,148],[108,155],[86,160],[102,164],[92,170]].map(([cx,cy],i) => (
                  <ellipse
                    key={i}
                    cx={cx}
                    cy={cy}
                    rx="1.5"
                    ry="2.2"
                    fill="rgba(180,60,80,0.35)"
                    transform={`rotate(${i*15-15} ${cx} ${cy})`}
                  />
                ))}
              </g>
            )}

            {/* SCOOP 3 — Pistachio */}
            {showScoop3 && (
              <g
                style={{
                  transformOrigin: "100px 118px",
                  animation: "scoop-pop 0.65s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
              >
                <circle cx="100" cy="118" r="34" fill="url(#scoop3-grad)" />
                <ellipse
                  cx="90"
                  cy="100"
                  rx="10"
                  ry="6"
                  fill="rgba(255,255,255,0.22)"
                />
                {/* Pistachio bits */}
                {[[96,112],[108,118],[88,122],[102,126]].map(([cx,cy],i) => (
                  <ellipse
                    key={i}
                    cx={cx}
                    cy={cy}
                    rx="2.5"
                    ry="1.5"
                    fill="rgba(40,100,55,0.4)"
                    transform={`rotate(${i*40} ${cx} ${cy})`}
                  />
                ))}
              </g>
            )}

            {/* CHERRY on top */}
            {showCherry && (
              <g style={{ animation: "cherry-drop 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                {/* Stem */}
                <path
                  d="M100 82 Q106 70 114 68"
                  stroke="#4a7a3a"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Cherry */}
                <circle cx="100" cy="84" r="8" fill="#c0334a" />
                <circle cx="97" cy="81" r="3" fill="rgba(255,255,255,0.3)" />
              </g>
            )}
          </svg>
        </div>

        {/* Ornamental divider */}
        <div className="divider-ring">
          <span />
          <div className="dot" />
          <div className="dot" style={{ opacity: 0.25 }} />
          <div className="dot" />
          <span />
        </div>

        {/* Pulsing text label */}
        <p className="load-label">
          {progress < 40
            ? "Churning the cream"
            : progress < 75
            ? "Layering the scoops"
            : progress < 90
            ? "Adding the toppings"
            : "Almost ready…"}
        </p>
      </div>
    </>
  );
}