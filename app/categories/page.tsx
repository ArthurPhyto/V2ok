import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/movie';

export const metadata: Metadata = {
  title: 'Catégories de films - StreamFlix',
  description: 'Découvrez toutes les catégories de films disponibles sur StreamFlix',
};

async function getAllCategories(): Promise<Category[]> {
  const { data: categories } = await supabase
    .from('categorie')
    .select('*')
    .order('name');
  return categories as Category[] || [];
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12">Toutes les catégories</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/category/${category.name}`}
            className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}