import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import type { Anime, Genre } from "./types";

import { Navigation } from "./components/Navigation";
import { SearchOverlay } from "./components/SearchOverlay";
import { Hero } from "./components/Hero";
import { RecentDrops, BrowseGrid, Upcoming, MoviesRow } from "./components/Sections";
import { WeeklySchedule } from "./components/Schedule";
import { Footer } from "./components/Footer";

export default function App() {
  const [heroAnime, setHeroAnime] = useState<Anime | null>(null);
  const [recentDrops, setRecentDrops] = useState<Anime[]>([]);
  
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenre, setActiveGenre] = useState<number | null>(null);
  const [browseAnimes, setBrowseAnimes] = useState<Anime[]>([]);
  const [browsePage, setBrowsePage] = useState(1);
  
  const [upcoming, setUpcoming] = useState<Anime[]>([]);
  const [movies, setMovies] = useState<Anime[]>([]);
  
  const [schedule, setSchedule] = useState<{ [key: string]: Anime[] }>({});
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    hero: true,
    recent: true,
    browse: true,
    upcoming: true,
    movies: true,
    schedule: true,
  });

  const [tickerAnimes, setTickerAnimes] = useState<string[]>([]);

  useEffect(() => {
    // 1. Initial Load (Fast UI parts)
    const initLefts = async () => {
      // Hero
      try {
        const topAir = await apiFetch("/top/anime?limit=1&filter=airing");
        if (topAir?.data?.[0]) setHeroAnime(topAir.data[0]);
      } finally {
        setLoadingStates((p) => ({ ...p, hero: false }));
      }

      // Recent Drops & Ticker
      try {
        const recent = await apiFetch("/seasons/now?limit=12&sfw=true");
        if (recent?.data) {
          setRecentDrops(recent.data);
          setTickerAnimes(recent.data.map((a: Anime) => a.title_english || a.title));
        }
      } finally {
        setLoadingStates((p) => ({ ...p, recent: false }));
      }

      // Genres
      try {
        const gen = await apiFetch("/genres/anime");
        if (gen?.data) setGenres(gen.data);
      } catch (e) {
        console.error(e);
      }
    };

    initLefts();
  }, []);

  // Browse Grid Hook
  useEffect(() => {
    const loadBrowse = async () => {
      setLoadingStates((p) => ({ ...p, browse: true }));
      try {
        let endpoint = `/top/anime?limit=18&filter=airing&page=${browsePage}`;
        if (activeGenre) {
          endpoint = `/anime?genres=${activeGenre}&sfw=true&limit=18&page=${browsePage}`;
        }
        const browseData = await apiFetch(endpoint);
        if (browseData?.data) {
          // Add fallback behavior for genre filtering since it might return 0 top airing if queried wrong
          setBrowseAnimes(browseData.data);
        }
      } finally {
        setLoadingStates((p) => ({ ...p, browse: false }));
      }
    };
    loadBrowse();
  }, [activeGenre, browsePage]);

  // Queue background loads
  useEffect(() => {
    const loadBackgrounds = async () => {
      // Upcoming
      try {
        const up = await apiFetch("/seasons/upcoming?limit=8&sfw=true");
        if (up?.data) setUpcoming(up.data);
      } finally {
        setLoadingStates((p) => ({ ...p, upcoming: false }));
      }

      // Movies
      try {
        const mov = await apiFetch("/top/anime?limit=8&type=movie");
        if (mov?.data) setMovies(mov.data);
      } finally {
        setLoadingStates((p) => ({ ...p, movies: false }));
      }

      // Schedule (7 consecutive calls)
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const scheduleMap: { [key: string]: Anime[] } = {};
      for (const day of days) {
        try {
          const res = await apiFetch(`/schedules?filter=${day}&limit=8`);
          if (res?.data) scheduleMap[day] = res.data;
        } catch (e) {
          scheduleMap[day] = [];
        }
        setSchedule({ ...scheduleMap }); // update incrementally
      }
      setLoadingStates((p) => ({ ...p, schedule: false }));
    };

    // delay slightly to let primary loads finish
    setTimeout(loadBackgrounds, 1000);
  }, []);

  return (
    <>
      <Navigation onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay visible={searchOpen} onClose={() => setSearchOpen(false)} />
      
      <main className="min-h-screen">
        <Hero anime={heroAnime} loading={loadingStates.hero} />
        
        {/* Ticker */}
        {!loadingStates.hero && tickerAnimes.length > 0 && (
           <div className="w-full bg-[var(--color-neon-cyan)] text-black py-1 overflow-hidden border-y border-[var(--color-ink)]">
             <div className="ticker-inner font-[var(--font-ui)] text-[10px] uppercase font-bold tracking-[2px] flex gap-8">
               {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="flex gap-8">
                    {tickerAnimes.map((title, j) => (
                      <span key={j}>🌸 {title}</span>
                    ))}
                  </span>
               ))}
             </div>
           </div>
        )}

        <RecentDrops animes={recentDrops} loading={loadingStates.recent} />
        
        <BrowseGrid 
          genres={genres} 
          activeGenre={activeGenre} 
          onGenreChange={(id) => { setActiveGenre(id); setBrowsePage(1); }} 
          animes={browseAnimes} 
          loading={loadingStates.browse} 
        />

        {/* Pagination below browse grid */}
        {!loadingStates.browse && browseAnimes.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pb-12 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setBrowsePage(p)}
                className={`w-8 h-8 rounded border flex items-center justify-center font-[var(--font-ui)] text-xs transition-colors ${
                  browsePage === p 
                    ? "bg-[var(--color-neon-cyan)] text-black border-[var(--color-neon-cyan)]"
                    : "border-[var(--color-border-subtle)] text-[#fff] hover:border-[var(--color-neon-cyan)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <Upcoming animes={upcoming} loading={loadingStates.upcoming} />
        
        <MoviesRow animes={movies} loading={loadingStates.movies} />

        <WeeklySchedule scheduleData={schedule} loading={loadingStates.schedule} />
      </main>

      <Footer />
    </>
  );
}
