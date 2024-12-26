"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Movie } from "@/types/movie";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const { data } = await supabase
        .from('movies')
        .select('id, title')
        .ilike('title', `%${query}%`)
        .limit(5);

      setSuggestions(data as Movie[] || []);
      setIsLoading(false);
    };

    const debounce = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-8 relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Rechercher un film..."
          className="w-full bg-white/10 text-white rounded-full px-6 py-2 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-black/90 rounded-xl shadow-xl border border-white/10 overflow-hidden">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors"
              onClick={() => {
                router.push(`/movie/${movie.id}`);
                setQuery("");
                setSuggestions([]);
              }}
            >
              {movie.title}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}