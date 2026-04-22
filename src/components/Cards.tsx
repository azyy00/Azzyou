import { PlayCircle } from "lucide-react";
import type { Anime } from "../types";
import { FC } from "react";

export const SkeletonCard: FC<{ landscape?: boolean }> = ({ landscape = false }) => {
  return (
    <div
      className={`skeleton rounded-[var(--radius-card)] w-full flex-shrink-0 ${
        landscape ? "h-[140px] aspect-video w-[220px]" : "aspect-[2/3] w-full"
      }`}
    ></div>
  );
};

export const FallbackImage: FC<{ mal_id: number }> = ({ mal_id }) => {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `linear-gradient(to bottom right, hsl(${mal_id % 360}, 40%, 20%), #000)`,
      }}
    ></div>
  );
};

export const PortraitCard: FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <div className="anime-card group relative w-full aspect-[2/3] rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-card)] cursor-pointer">
      {anime.images?.jpg?.large_image_url ? (
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FallbackImage mal_id={anime.mal_id} />
      )}
      <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[var(--color-gold)] font-[var(--font-ui)]">
        ★ {anime.score || "N/A"}
      </div>
      <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-[var(--font-ui)]">
        {anime.type}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
        <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
          <h3 className="font-[var(--font-head)] text-[13px] font-bold leading-tight mb-1 line-clamp-2">
            {anime.title_english || anime.title}
          </h3>
          <p className="text-[10px] text-[var(--color-muted)] font-[var(--font-ui)] truncate">
            {anime.genres?.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export const LandscapeCard: FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <div className="anime-card group relative w-[220px] h-[140px] flex-shrink-0 rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-card)] cursor-pointer">
      {anime.images?.jpg?.large_image_url ? (
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FallbackImage mal_id={anime.mal_id} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080c0f] via-[#080c0f]/60 to-transparent"></div>
      
      <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[var(--color-neon-cyan)] font-[var(--font-ui)]">
        {anime.episodes ? `${anime.episodes} EPS` : `ONGOING`}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <PlayCircle className="w-10 h-10 text-[var(--color-neon-cyan)] drop-shadow-md" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="font-[var(--font-ui)] text-[12px] font-medium leading-tight line-clamp-2 translate-y-1 group-hover:translate-y-0 transition-transform">
          {anime.title_english || anime.title}
        </h3>
      </div>
    </div>
  );
};
