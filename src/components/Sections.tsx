import { useState } from "react";
import { LandscapeCard, PortraitCard, SkeletonCard } from "./Cards";
import type { Anime, Genre } from "../types";

export function SectionHeader({ label, titlePrefix, titleHighlight }: { label: string, titlePrefix: string, titleHighlight: string }) {
  return (
    <div className="mb-8 border-l-[3px] border-[var(--color-neon-cyan)] pl-[14px]">
      <div className="section-label mb-1">// {label}</div>
      <h2 className="section-title">
        {titlePrefix} <span className="text-[var(--color-neon-cyan)]">{titleHighlight}</span>
      </h2>
    </div>
  );
}

export function RecentDrops({ animes, loading }: { animes: Anime[]; loading: boolean }) {
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-16 py-11 md:py-[72px]" id="seasonal">
      <SectionHeader label="RECENT DROPS" titlePrefix="Latest" titleHighlight="Episodes" />
      <div className="flex gap-[12px] overflow-x-auto pb-6 snap-x">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} landscape />)
        ) : (
          animes.map(anime => (
            <div key={anime.mal_id} className="snap-start">
              <LandscapeCard anime={anime} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function BrowseGrid({ 
  genres, 
  activeGenre, 
  onGenreChange, 
  animes, 
  loading 
}: { 
  genres: Genre[]; 
  activeGenre: number | null; 
  onGenreChange: (id: number | null) => void;
  animes: Anime[];
  loading: boolean;
}) {
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-16 py-11 md:py-[72px]">
      <SectionHeader label="EXPLORE" titlePrefix="Discover" titleHighlight="Anime" />
      
      {/* Genre Tags */}
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 max-h-[120px] overflow-y-auto pr-4 custom-scrollbar">
          <button 
            onClick={() => onGenreChange(null)}
            className={`px-3 py-1.5 text-xs font-[var(--font-ui)] border rounded-[var(--radius-btn)] transition-colors ${
              activeGenre === null 
                ? "bg-[var(--color-neon-cyan)] text-black border-[var(--color-neon-cyan)] font-bold" 
                : "border-[var(--color-border-subtle)] text-[var(--color-muted)] hover:border-[var(--color-neon-cyan)] hover:text-white"
            }`}
          >
            ALL
          </button>
          {genres.map(genre => (
            <button 
              key={genre.mal_id}
              onClick={() => onGenreChange(genre.mal_id)}
              className={`px-3 py-1.5 text-xs font-[var(--font-ui)] border rounded-[var(--radius-btn)] transition-colors ${
                activeGenre === genre.mal_id 
                  ? "bg-[var(--color-neon-cyan)] text-black border-[var(--color-neon-cyan)] font-bold" 
                  : "border-[var(--color-border-subtle)] text-[var(--color-muted)] hover:border-[var(--color-neon-cyan)] hover:text-white"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[14px]">
        {loading ? (
          Array.from({ length: 18 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          animes.map(anime => <PortraitCard key={anime.mal_id} anime={anime} />)
        )}
      </div>
    </section>
  );
}

export function Upcoming({ animes, loading }: { animes: Anime[]; loading: boolean }) {
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-16 py-11 md:py-[72px] bg-[var(--color-surface)]">
      <SectionHeader label="UPCOMING SEASON" titlePrefix="Coming" titleHighlight="Soon" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-[14px]">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          animes.map(anime => <PortraitCard key={anime.mal_id} anime={anime} />)
        )}
      </div>
    </section>
  );
}

export function MoviesRow({ animes, loading }: { animes: Anime[]; loading: boolean }) {
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-16 py-11 md:py-[72px]" id="movies">
      <SectionHeader label="FILMS" titlePrefix="Top" titleHighlight="Movies" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px]">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <div key={i} className="flex justify-center"><SkeletonCard landscape /></div>)
        ) : (
          animes.map(anime => (
             <div key={anime.mal_id} className="w-full flex justify-center">
                 <LandscapeCard anime={anime} />
             </div>
          ))
        )}
      </div>
    </section>
  );
}
