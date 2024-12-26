import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Movie } from "@/types/movie";
import SimilarMovies from "@/components/SimilarMovies";

interface Props {
  params: { id: string };
}

async function getMovie(id: string): Promise<Movie | null> {
  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();
  return movie;
}

async function getSimilarMovies(movie: Movie): Promise<Movie[]> {
  const { data: movies } = await supabase
    .from("movies")
    .select("*")
    .contains("genres", [movie.genres[0]])
    .neq("id", movie.id)
    .order("vote_average", { ascending: false })
    .limit(4);
  return movies as Movie[] || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovie(params.id);
  if (!movie) return { title: "Film non trouvé" };

  return {
    title: movie.title_seo,
    description: movie.meta_description_seo,
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  if (!movie) return <div>Film non trouvé</div>;

  const similarMovies = await getSimilarMovies(movie);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": movie.title,
          "description": movie.overview,
          "image": `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          "datePublished": movie.release_date,
          "duration": `PT${movie.runtime}M`,
          "genre": movie.genres,
          "actor": movie.cast.map(actor => ({
            "@type": "Person",
            "name": actor.name
          })),
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": movie.vote_average,
            "bestRating": "10",
            "worstRating": "1",
            "ratingCount": "1000"
          }
        })
      }} />

      <div className="relative">
        <div className="absolute inset-0 h-[50vh]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        </div>

        <div className="container mx-auto px-4 pt-[20vh]">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <div className="relative z-10">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">{movie.title} Streaming gratuit</h1>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  <span className="text-lg">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-white/60" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="text-white/60">
                  {new Date(movie.release_date).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/category/${genre}`}
                    className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full text-sm transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <h2 className="text-2xl font-semibold mb-4">Synopsis {movie.title} streaming gratuit</h2>
              <p className="text-lg text-white/80 mb-8">{movie.overview}</p>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Acteurs principaux</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span
                      key={index}
                      className="bg-white/10 px-3 py-1 rounded-full text-sm"
                    >
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>

              {movie.trailer_url && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                    Bande annonce {movie.title} streaming gratuit
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={movie.trailer_url}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Regarder {movie.title} Streaming gratuit
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/60">Lecteur vidéo à venir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SimilarMovies movies={similarMovies} />
        </div>
      </div>
    </>
  );
}