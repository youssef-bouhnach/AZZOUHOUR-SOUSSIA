const features = [
  { icon: "🚚", title: "Fast Delivery", desc: "Same-day delivery available in your city" },
  { icon: "🌱", title: "100% Fresh", desc: "Naturally grown & handpicked daily" },
  { icon: "💳", title: "Easy Ordering", desc: "Order online in just a few clicks" },
  { icon: "⭐", title: "Top Quality", desc: "Curated by our expert florists" },
];

export default function Features() {
  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Why <span className="text-[#c8956c]">FloraShop</span>?
        </h2>
        <p className="text-[#6b5040] mt-3 text-sm">We care about your experience</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-[#0f0a06] border border-[#3a2a1a]/60 rounded-2xl p-6 text-center hover:border-green-700/50 hover:bg-[#141008] transition-all group"
          >
            <div className="w-14 h-14 bg-[#1a1008] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-[#6b5040] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
