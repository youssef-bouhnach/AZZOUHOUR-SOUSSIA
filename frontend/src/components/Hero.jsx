import { useNavigate } from "react-router-dom";

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+", label: "Plant Varieties" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24h", label: "Delivery Time" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-28 overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-green-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#3a2a1a]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-green-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/40 text-green-400 text-xs font-medium px-4 py-2 rounded-full mb-10">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Free delivery on orders over 200 MAD 🚚
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl">
        <span className="text-white">Bring </span>
        <span className="bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
          nature
        </span>
        <br />
        <span className="text-white">into your </span>
        <span className="bg-gradient-to-r from-[#c8956c] via-[#a07850] to-[#8b6340] bg-clip-text text-transparent">
          life
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-xl text-[#7a6050] max-w-2xl leading-relaxed">
        Fresh flowers, lush plants, quality soil and professional garden services —
        all delivered to your door across Morocco.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        <button
          onClick={() => navigate("/shop")}
          className="bg-green-700 hover:bg-green-600 active:scale-95 transition-all px-9 py-4 rounded-2xl text-base font-bold text-white shadow-2xl shadow-green-900/50"
        >
          🛍️ Shop Now
        </button>
        <button
          onClick={() => navigate("/services")}
          className="border border-[#3a2a1a] hover:border-[#a07850]/60 hover:bg-[#1a1008]/60 transition-all px-9 py-4 rounded-2xl text-base font-bold text-[#a07850]"
        >
          Our Services →
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10 mt-20">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-extrabold text-green-400">{s.value}</div>
            <div className="text-xs text-[#6b5040] mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
