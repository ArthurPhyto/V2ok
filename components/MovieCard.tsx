import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-xl transition-transform hover:scale-105"
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={16} />
              <span className="text-white/90">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2 py-1 bg-white/20 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}