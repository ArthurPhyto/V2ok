import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

export default function SimilarMovies({ movies }: { movies: Movie[] }) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Films de la même catégorie</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}