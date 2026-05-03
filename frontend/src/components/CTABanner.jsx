import { useNavigate } from "react-router-dom";

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <section className="mx-6 mb-24 max-w-5xl md:mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-[#3a2a1a]/60">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a0d] via-[#1a1008] to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1a4a1a40,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#3a2a1a30,_transparent_60%)]" />

        {/* Content */}
        <div className="relative px-10 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/30 text-green-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            🌱 Join our community
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Ready to green up your space?
          </h2>
          <p className="text-[#7a6050] mb-10 max-w-md mx-auto">
            Join hundreds of happy customers across Morocco and bring nature into your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-green-700 hover:bg-green-600 transition-all px-9 py-4 rounded-2xl font-bold text-white shadow-xl shadow-green-900/40"
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="border border-[#3a2a1a] hover:border-[#a07850]/50 hover:bg-[#1a1008]/60 transition-all px-9 py-4 rounded-2xl font-bold text-[#a07850]"
            >
              Browse Shop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
