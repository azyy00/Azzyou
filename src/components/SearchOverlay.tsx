import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { PortraitCard, SkeletonCard } from "./Cards";
import { apiFetch } from "../api";
import type { Anime } from "../types";

export function SearchOverlay({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setQuery("");
      setResults([]);
      return;
    }
    
    // Focus input when opened
    const input = document.getElementById("search-focus-input");
    if (input) input.focus();
  }, [visible]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await apiFetch(`/anime?q=${encodeURIComponent(query)}&sfw=true&limit=12`);
      if (res && res.data) {
        setResults(res.data);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(8,12,15,0.97)] z-[300] flex flex-col pt-24 px-8 overflow-y-auto backdrop-blur-md">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-[var(--color-muted)] hover:text-[var(--color-neon-cyan)] p-2"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-[1000px] mx-auto w-full flex-grow flex flex-col">
        <div className="relative mb-12">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[var(--color-neon-cyan)]" />
          <input
            id="search-focus-input"
            type="text"
            placeholder="Type to search anime..."
            className="w-full bg-transparent border-0 border-b-2 border-[var(--color-border-subtle)] text-[#fff] font-[var(--font-head)] text-[32px] pl-12 pb-4 focus:ring-0 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors placeholder-[var(--color-muted)]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
            {results.map((anime) => (
              <PortraitCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : query.length >= 3 ? (
          <div className="text-center text-[var(--color-muted)] font-[var(--font-ui)] mt-20">
            No results found for "{query}"
          </div>
        ) : null}
      </div>
    </div>
  );
}
