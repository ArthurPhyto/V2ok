import Link from 'next/link';
import { Category } from '@/types/movie';

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.name}`}
          className="bg-red-600 hover:bg-red-700 transition-colors rounded-lg p-6 text-center"
        >
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}