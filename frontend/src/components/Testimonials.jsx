const testimonials = [
  {
    name: "Sara M.",
    role: "Regular Customer",
    text: "Best flowers I've ever ordered! Super fresh and delivered so fast. My living room smells amazing 🌸",
    avatar: "S",
    color: "bg-rose-800",
    stars: 5,
  },
  {
    name: "Youssef K.",
    role: "Garden Owner",
    text: "The garden service team was incredible. My backyard looks like a paradise now. Highly recommend!",
    avatar: "Y",
    color: "bg-green-800",
    stars: 5,
  },
  {
    name: "Nadia R.",
    role: "Plant Lover",
    text: "Love the variety of plants and the quality is unmatched. Will definitely keep ordering 🌿",
    avatar: "N",
    color: "bg-amber-800",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          What our <span className="text-green-400">customers</span> say
        </h2>
        <p className="text-[#6b5040] mt-3 text-sm">Real reviews from real people</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-[#0f0a06] border border-[#3a2a1a]/60 rounded-2xl p-7 hover:border-[#a07850]/30 transition-all"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>

            <p className="text-[#8a7060] text-sm leading-relaxed mb-6">"{t.text}"</p>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold text-white`}>
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-[#6b5040]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
