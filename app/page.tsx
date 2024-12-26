import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import CategoryList from '@/components/CategoryList';
import MovieCount from '@/components/MovieCount';
import { Movie, Category } from '@/types/movie';

export const metadata: Metadata = {
  title: 'StreamFlix - Votre plateforme de streaming',
  description: 'Découvrez les derniers films en streaming sur StreamFlix',
};

async function getLatestMovies(): Promise<Movie[]> {
  const { data: movies } = await supabase
    .from('movies')
    .select('*')
    .order('release_date', { ascending: false })
    .limit(12);
  return movies as Movie[] || [];
}

async function getCategories(): Promise<Category[]> {
  const { data: categories } = await supabase
    .from('categorie')
    .select('*');
  return categories as Category[] || [];
}

export default async function Home() {
  const [movies, categories] = await Promise.all([
    getLatestMovies(),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section>
        <h1 className="text-4xl font-bold mb-8">Les dernières sorties</h1>
        <MovieCount />
        <MovieGrid movies={movies} />
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Catégories populaires</h2>
        <CategoryList categories={categories} />
      </section>
    </main>
  );
}