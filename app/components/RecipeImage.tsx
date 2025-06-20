import { Recipe } from '../types/recipe';

export default function RecipeImage({ recipe }: { recipe: Recipe }) {
  if (!recipe.image) {
    return (
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-64 bg-gray-200">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
} 