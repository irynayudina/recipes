import { Recipe } from '../types/recipe';

export default function RecipeContent({ recipe }: { recipe: Recipe }) {
  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>{recipe.title}</h1>

      {/* Recipe Info */}
      <div className='flex flex-wrap gap-6 mb-6 text-sm text-gray-600'>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
        <div className='flex items-center'>
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      {/* Recipe Summary */}
      {recipe.summary && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-3'>
            About this recipe
          </h2>
          <div
            className='text-gray-700 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </div>
      )}

      {/* Ingredients */}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Ingredients
        </h2>
        <div className='grid gap-3'>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient.id}-${index}`}
              className='flex items-center p-3 bg-gray-50 rounded-lg'
            >
              <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
              <span className='text-gray-800'>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
