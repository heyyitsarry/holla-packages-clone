// Holla Americana Navbar — dark transparent nav with logo and nav links
// Design: Expedition Cartography — white text on dark/transparent bg, uppercase spaced links

export default function Navbar() {
  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: "transparent" }}
    >
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-400 shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #1a3a1a 100%)" }}
        >
          {/* SVG badge logo matching original */}
          <svg viewBox="0 0 100 100" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#1B4D1B" stroke="#D4AF37" strokeWidth="3" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* Compass star */}
            <polygon points="50,20 54,44 50,48 46,44" fill="#D4AF37" />
            <polygon points="50,80 54,56 50,52 46,56" fill="#D4AF37" />
            <polygon points="20,50 44,46 48,50 44,54" fill="#D4AF37" />
            <polygon points="80,50 56,46 52,50 56,54" fill="#D4AF37" />
            <circle cx="50" cy="50" r="5" fill="#D4AF37" />
            {/* Text arc top */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="700"
              letterSpacing="2"
            >
              <textPath href="#topArc" startOffset="50%">HOLLA</textPath>
            </text>
            <text
              x="50"
              y="50"
              textAnchor="middle"
              fill="#D4AF37"
              fontSize="6"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="600"
              letterSpacing="1"
            >
              <textPath href="#bottomArc" startOffset="50%">TRAVEL SERVICE</textPath>
            </text>
            <defs>
              <path id="topArc" d="M 18,50 A 32,32 0 0,1 82,50" />
              <path id="bottomArc" d="M 22,58 A 32,32 0 0,0 78,58" />
            </defs>
          </svg>
        </div>
        <div className="leading-tight">
          <div
            className="text-white font-bold tracking-widest text-sm"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.15em" }}
          >
            HOLLA
          </div>
          <div
            className="text-white font-bold tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.15em" }}
          >
            AMERICANA
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {["HOME", "ABOUT", "DESTINATIONS", "CONTACT"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-white text-sm font-medium tracking-widest hover:text-yellow-400 transition-colors duration-200 relative group"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden text-white p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
