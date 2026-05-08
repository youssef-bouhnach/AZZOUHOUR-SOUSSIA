import "../styles/plantJourney.css";

const steps = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#2d9e6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pj_icon_svg">
        {/* Soil rows */}
        <line x1="8"  y1="48" x2="56" y2="48" />
        <line x1="12" y1="52" x2="52" y2="52" />
        <line x1="16" y1="56" x2="48" y2="56" />
        {/* Left sprout */}
        <path d="M20 48 C20 36 12 28 12 20" />
        <path d="M12 20 C12 14 18 10 20 16" />
        <path d="M12 20 C8 16 6 10 10 8" />
        {/* Center sprout (taller) */}
        <path d="M32 48 C32 32 24 22 24 12" />
        <path d="M24 12 C24 6 32 2 34 10" />
        <path d="M24 12 C18 8 16 2 22 0" />
        {/* Right sprout */}
        <path d="M44 48 C44 36 52 28 52 20" />
        <path d="M52 20 C52 14 46 10 44 16" />
        <path d="M52 20 C56 16 58 10 54 8" />
      </svg>
    ),
    title: "Find your plant",
    desc: "Browse our curated selection of heirloom trees, wild flowers, lush turf, and living soil — all grown without shortcuts.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#2d9e6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pj_icon_svg">
        {/* Pot body */}
        <path d="M14 22 L18 54 L46 54 L50 22 Z" />
        {/* Rim */}
        <rect x="10" y="16" width="44" height="8" rx="3" />
        {/* Water lines */}
        <path d="M22 34 Q28 30 34 34 Q40 38 46 34" />
        <path d="M22 42 Q28 38 34 42 Q40 46 46 42" />
      </svg>
    ),
    title: "Choose your pot",
    desc: "Pair your plant with the perfect vessel. From terracotta classics to modern ceramics — we have something for every space.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#2d9e6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pj_icon_svg">
        {/* Box */}
        <rect x="10" y="24" width="44" height="32" rx="3" />
        {/* Box top flaps */}
        <path d="M10 24 L20 12 L44 12 L54 24" />
        <line x1="32" y1="12" x2="32" y2="24" />
        {/* Leaf inside box */}
        <path d="M24 44 C24 36 36 32 40 38 C36 44 28 46 24 44 Z" />
        <line x1="24" y1="44" x2="34" y2="36" />
      </svg>
    ),
    title: "Deliver to your home",
    desc: "We pack every order with care and deliver straight to your door. Each plant arrives healthy, guaranteed — or we replace it.",
  },
];

function PlantJourney() {
  return (
    <section className="pj_section">
      <div className="pj_container">

        {/* Header */}
        <div className="pj_header">
          <h2 className="pj_title">
            The Journey to <em className="pj_title_em">Your New Plant</em>
          </h2>
          <p className="pj_subtitle">
            We only work with the very best! Our team of expert plant care
            specialists take great care to make sure your plants are healthy
            and thriving when they arrive at your doorstep.
          </p>
        </div>

        {/* Steps */}
        <div className="pj_steps">
          {steps.map((step, i) => (
            <div key={i} className="pj_step">
              <div className="pj_icon_wrap">{step.icon}</div>
              <h3 className="pj_step_title">{step.title}</h3>
              <p className="pj_step_desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PlantJourney;
