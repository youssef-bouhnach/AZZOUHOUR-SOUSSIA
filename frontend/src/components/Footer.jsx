import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#080808] border-t border-[#3a2a1a]/50">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-green-700 to-green-900 rounded-xl flex items-center justify-center text-lg">
              🌿
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-green-400 tracking-tight">Flora</span>
              <span className="text-[10px] text-[#a07850] font-medium tracking-widest uppercase">Shop</span>
            </div>
          </div>
          <p className="text-[#6b5040] text-sm leading-relaxed">
            Fresh flowers & plants delivered to your door across Morocco. 🇲🇦
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[#a07850] font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2.5 text-sm text-[#6b5040]">
            {["Flowers 🌹", "Grass & Plants 🌿", "Soil & Pots 🪨", "Services 🛠️"].map((item) => (
              <li
                key={item}
                className="hover:text-green-400 cursor-pointer transition-colors"
                onClick={() => navigate("/shop")}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-[#a07850] font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
          <ul className="space-y-2.5 text-sm text-[#6b5040]">
            {[
              { label: "Login", path: "/login" },
              { label: "Register", path: "/register" },
              { label: "My Orders", path: "/dashboard" },
            ].map((item) => (
              <li
                key={item.label}
                className="hover:text-green-400 cursor-pointer transition-colors"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#a07850] font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2.5 text-sm text-[#6b5040]">
            <li>📍 Casablanca, Morocco</li>
            <li>📞 +212 6XX-XXXXXX</li>
            <li>✉️ hello@florashop.ma</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3a2a1a]/40 text-center py-5 text-[#4a3828] text-xs">
        © 2026 FloraShop. All rights reserved. Made with ❤️ in Morocco 🇲🇦
      </div>
    </footer>
  );
}
