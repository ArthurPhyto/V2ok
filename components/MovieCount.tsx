import { supabase } from '@/lib/supabase';

async function getMovieCount(): Promise<number> {
  const { count } = await supabase
    .from('movies')
    .select('*', { count: 'exact', head: true });
  return count || 0;
}

export default async function MovieCount() {
  const count = await getMovieCount();
  
  return (
    <div className="text-lg text-white/80 mb-8">
      <span className="font-bold text-white">{count}</span> films disponibles en streaming
    </div>
  );
}