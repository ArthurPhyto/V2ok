import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { Movie } from '@/types/movie';

interface Props {
  params: { name: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Films ${params.name} - StreamFlix`,
    description: `Découvrez notre sélection de films ${params.name} en streaming`,
  };
}

async function getMoviesByCategory(category: string, page: number = 1) {
  const limit = 30;
  const offset = (page - 1) * limit;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .contains('genres', [category])
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  return { 
    movies: movies as Movie[] || [], 
    totalPages: Math.ceil((count || 0) / limit) 
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const { movies, totalPages } = await getMoviesByCategory(params.name, currentPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Films {params.name}</h1>
      <MovieGrid movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/category/${params.name}`}
      />
    </div>
  );
}