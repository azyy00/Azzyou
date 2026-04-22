export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-12">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="font-[var(--font-head)] text-[24px] font-[800] tracking-wider mb-4 flex items-center">
              <span className="mr-2 text-[var(--color-sakura)]">🌸</span>
              <span className="text-[var(--color-neon-cyan)]">AZZ</span>
              <span className="text-[var(--color-ink)]">YOU</span>
            </div>
            <p className="font-[var(--font-ui)] text-xs text-[var(--color-muted)] leading-relaxed mb-6">
              Real anime data via MyAnimeList / Jikan API v4.
              No illegal streaming occurs here.
            </p>
            <div className="flex gap-4">
               {/* Placeholders for socials */}
               <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-neon-cyan)] hover:text-black cursor-pointer transition-colors text-xs">X</div>
               <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-neon-cyan)] hover:text-black cursor-pointer transition-colors text-xs">IG</div>
               <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-neon-cyan)] hover:text-black cursor-pointer transition-colors text-xs">DC</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 font-[var(--font-ui)] text-[12px] text-[var(--color-muted)]">
            <h4 className="text-[var(--color-ink)] font-[700] mb-2 text-sm uppercase tracking-wider font-[var(--font-head)]">Browse</h4>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Top Airing</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Seasonal</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Release Schedule</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Movies & OVAs</a>
          </div>

          <div className="flex flex-col gap-3 font-[var(--font-ui)] text-[12px] text-[var(--color-muted)]">
            <h4 className="text-[var(--color-ink)] font-[700] mb-2 text-sm uppercase tracking-wider font-[var(--font-head)]">Account</h4>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Watchlist</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">History</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Settings</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Premium</a>
          </div>

          <div className="flex flex-col gap-3 font-[var(--font-ui)] text-[12px] text-[var(--color-muted)]">
            <h4 className="text-[var(--color-ink)] font-[700] mb-2 text-sm uppercase tracking-wider font-[var(--font-head)]">Info</h4>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">About AZZYOU</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">API Documentation</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Contact Us</a>
            <a href="#" className="hover:text-[var(--color-neon-cyan)]">Status</a>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-[var(--font-ui)] text-[11px] text-[var(--color-muted)]">
            © 2026 AZZYOU
          </div>
          <div className="font-[var(--font-ui)] text-[11px] text-[var(--color-muted)] flex gap-4">
            <a href="#" className="hover:text-white">DMCA</a>
            <span>·</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
