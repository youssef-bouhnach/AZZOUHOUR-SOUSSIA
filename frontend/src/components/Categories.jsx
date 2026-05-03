import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: "🌹",
    title: "Flowers",
    desc: "Roses, lilies, tulips & more",
    bg: "bg-gradient-to-br from-[#2a0d0d] to-[#1a0808]",
    border: "border-[#7a2020]/40",
    iconBg: "bg-[#3a1010]",
    accent: "text-rose-400",
    link: "/shop?category=flowers",
  },
  {
    icon: "🌿",
    title: "Grass & Plants",
    desc: "Indoor & outdoor green plants",
    bg: "bg-gradient-to-br from-[#0d2a0d] to-[#081a08]",
    border: "border-[#2a7a2a]/40",
    iconBg: "bg-[#103010]",
    accent: "text-green-400",
    link: "/shop?category=grass",
  },
  {
    icon: "🪨",
    title: "Soil & Pots",
    desc: "Premium soil mixes & ceramic pots",
    bg: "bg-gradient-to-br from-[#2a1a08] to-[#1a1005]",
    border: "border-[#7a5020]/40",
    iconBg: "bg-[#3a2010]",
    accent: "text-amber-400",
    link: "/shop?category=soil",
  },
  {
    icon: "🛠️",
    title: "Services",
    desc: "Planting, delivery & garden care",
    bg: "bg-gradient-to-br from-[#0d1a2a] to-[#08101a]",
    border: "border-[#205a7a]/40",
    iconBg: "bg-[#102030]",
    accent: "text-sky-400",
    link: "/services",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Browse by <span className="text-green-400">Category</span>
        </h2>
        <p className="text-[#6b5040] mt-3 text-sm">Find exactly what you're looking for</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.title}
            onClick={() => navigate(cat.link)}
            className={`${cat.bg} border ${cat.border} rounded-2xl p-6 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 group`}
          >
            <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-200`}>
              {cat.icon}
            </div>
            <h3 className={`font-bold text-lg ${cat.accent} mb-1`}>{cat.title}</h3>
            <p className="text-sm text-[#6b5040] leading-relaxed mb-4">{cat.desc}</p>
            <div className="text-xs text-[#4a3828] group-hover:text-[#a07850] transition-colors font-medium">
              Browse →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
