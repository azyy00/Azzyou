import { Play, ExternalLink } from "lucide-react";
import type { Anime } from "../types";

export function Hero({ anime, loading }: { anime: Anime | null; loading: boolean }) {
  if (loading || !anime) {
    return <div className="w-full h-screen skeleton"></div>;
  }

  const bgImage = anime.images?.jpg?.large_image_url;

  return (
    <section className="relative w-full h-screen overflow-hidden flex bg-[var(--color-bg)]">
      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[0, 120, 240, 360, 480].map((left) => (
          <div
            key={left}
            className="absolute top-[-50%] w-[1px] h-[200%] bg-[rgba(0,229,204,0.06)] transform -rotate-[25deg]"
            style={{ left: `calc(30% + ${left}px)` }}
          ></div>
        ))}
        {/* Watermark */}
        <div 
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-[0.035] text-[var(--color-neon-cyan)] font-[var(--font-head)] tracking-wider"
          style={{ fontSize: '320px', writingMode: 'vertical-rl', WebkitUserSelect: 'none' }}
        >
          アズユー
        </div>
      </div>

      <div className="w-full h-full max-w-[1400px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row relative z-20">
        <div className="flex-1 flex flex-col justify-center pr-8 pt-20">
          <div className="text-[var(--color-neon-cyan)] font-[var(--font-ui)] text-xs uppercase tracking-[2px] mb-4">
            [TOP AIRING #1]
          </div>
          <h1 className="font-[var(--font-head)] text-[64px] font-[800] leading-[1.0] mb-4 text-[#fff]">
            {anime.title_english || anime.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[11px] font-[var(--font-ui)] rounded-[var(--radius-card)]">
              ★ {anime.score || "?"}
            </span>
            <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[11px] font-[var(--font-ui)] rounded-[var(--radius-card)]">
              {anime.episodes ? `${anime.episodes} EPS` : `?? EPS`}
            </span>
            {anime.season && anime.year && (
              <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[11px] font-[var(--font-ui)] rounded-[var(--radius-card)] uppercase">
                {anime.season} {anime.year}
              </span>
            )}
            <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[11px] font-[var(--font-ui)] rounded-[var(--radius-card)] uppercase">
              {anime.type}
            </span>
            {anime.rating && (
              <span className="border border-[var(--color-border-subtle)] px-2 py-1 text-[11px] font-[var(--font-ui)] rounded-[var(--radius-card)] uppercase">
                {anime.rating.split(' ')[0]}
              </span>
            )}
          </div>

          <p className="font-[var(--font-ui)] text-[13px] text-[var(--color-muted)] leading-[1.7] max-w-[480px] mb-8">
            {anime.synopsis ? anime.synopsis.substring(0, 180) + '...' : 'No synopsis available.'}
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => anime.trailer?.url && window.open(anime.trailer.url, '_blank')}
              className="bg-[var(--color-neon-cyan)] text-[#000] font-[700] font-[var(--font-ui)] text-[12px] px-[24px] py-[12px] rounded-[var(--radius-btn)] flex items-center gap-2 hover:bg-[#00c2ad] transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              WATCH TRAILER
            </button>
            <a 
              href={anime.url} 
              target="_blank" 
              rel="noreferrer"
              className="border border-[var(--color-border-subtle)] text-[var(--color-ink)] hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] font-bold font-[var(--font-ui)] text-[12px] px-[24px] py-[12px] rounded-[var(--radius-btn)] flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              MAL PAGE
            </a>
          </div>
        </div>

        <div className="flex-1 relative h-full hidden md:block">
          <div 
            className="absolute inset-0"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            {bgImage && (
              <img 
                src={bgImage} 
                alt="Hero banner" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent w-[40%]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
