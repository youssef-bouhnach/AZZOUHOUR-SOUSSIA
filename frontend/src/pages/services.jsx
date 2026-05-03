import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: "🌱",
    title: "Planting Service",
    desc: "Our experts come to your home and plant flowers or trees for you.",
    price: "From 150 MAD",
  },
  {
    icon: "🚚",
    title: "Home Delivery",
    desc: "Fast and careful delivery of your orders across Morocco.",
    price: "From 30 MAD",
  },
  {
    icon: "✂️",
    title: "Garden Care",
    desc: "Regular maintenance, trimming and care for your garden.",
    price: "From 200 MAD",
  },
  {
    icon: "🪴",
    title: "Interior Design",
    desc: "We help you decorate your home or office with plants.",
    price: "From 300 MAD",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a140a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a140a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-lg">🌿</div>
            <span className="text-xl font-bold text-green-400 tracking-tight">Flora<span className="text-white">Shop</span></span>
          </div>
          <button onClick={() => navigate("/shop")} className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-lg text-sm font-medium">
            Shop Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Our <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg">
          Professional garden and plant services delivered to your door.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-green-500/30 hover:bg-white/8 transition-all">
            <div className="text-4xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">{s.desc}</p>
            <span className="text-green-400 font-semibold text-sm">{s.price}</span>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <p className="text-white/40 mb-4">Interested in a service?</p>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 hover:bg-green-700 transition px-8 py-3.5 rounded-xl font-semibold"
        >
          Book Now
        </button>
      </section>
    </div>
  );
}
