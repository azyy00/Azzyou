import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export function Navigation({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[60px] z-[200] transition-all duration-300 border-b ${
        scrolled
          ? "bg-[rgba(8,12,15,0.8)] backdrop-blur-[10px] border-[var(--color-border-subtle)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        <div className="font-[var(--font-head)] text-[20px] font-[800] tracking-wider flex items-center">
          <span className="text-[var(--color-neon-cyan)]">AZZ</span>
          <span className="text-[var(--color-ink)]">YOU</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-[var(--font-ui)] text-[11px] uppercase tracking-[1.5px] text-[var(--color-muted)]">
          <a href="#" className="hover:text-[var(--color-ink)] transition-colors">Home</a>
          <a href="#seasonal" className="hover:text-[var(--color-ink)] transition-colors">Seasonal</a>
          <a href="#schedule" className="hover:text-[var(--color-ink)] transition-colors">Schedule</a>
          <a href="#movies" className="hover:text-[var(--color-ink)] transition-colors">Movies</a>
          <a href="#" className="hover:text-[var(--color-ink)] transition-colors">Top 100</a>
        </div>

        <div className="flex items-center gap-4">
          <div 
            className="flex items-center border-b border-[var(--color-border-subtle)] pb-1 px-1 cursor-text w-[140px] text-[10px] font-[var(--font-ui)] text-[#fff] hover:border-[var(--color-ink)] transition-colors uppercase tracking-wider"
            onClick={onSearchOpen}
          >
            <span className="flex-1">SEARCH...</span>
            <Search className="w-3 h-3 ml-2 text-[var(--color-muted)]" />
          </div>
          <button className="hidden sm:block text-[11px] font-[var(--font-ui)] text-[var(--color-ink)] uppercase tracking-wider hover:text-[var(--color-neon-cyan)] px-3 py-2">
            Login
          </button>
          <button className="bg-[var(--color-neon-cyan)] text-[#000] font-[700] text-[12px] font-[var(--font-ui)] px-[16px] py-[8px] rounded-[var(--radius-btn)] tracking-wider hover:bg-[var(--color-ink)] transition-colors">
            WATCH FREE
          </button>
        </div>
      </div>
    </nav>
  );
}
