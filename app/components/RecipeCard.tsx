'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeImage({ recipe }: { recipe: Recipe }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (imageError || !recipe.image) {
    return (
      <div className='w-full h-full flex items-center justify-center bg-gray-100'>
        <svg
          className='w-12 h-12 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      {imageLoading && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}
      <img
        src={recipe.image}
        alt={recipe.title}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageLoading(false);
          setImageError(true);
        }}
      />
    </>
  );
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className='block'>
      <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
        <div className='relative h-48 bg-gray-200'>
          <Suspense
            fallback={
              <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                <div className='w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin'></div>
              </div>
            }
          >
            <RecipeImage recipe={recipe} />
          </Suspense>
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
            {recipe.title}
          </h3>
          <div className='flex items-center text-sm text-gray-600 space-x-4'>
            {recipe.readyInMinutes && (
              <div className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-1'
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
                <span>{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className='flex items-center'>
                <svg
                  className='w-4 h-4 mr-1'
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
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RecipesPage() {
  const sampleRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
    },
    {
      id: 2,
      title: 'Chicken Stir Fry',
      image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
    },
    {
      id: 3,
      title: 'Caesar Salad',
      image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
    },
  ];

  return (
    <div className='recipes-page'>
      <h1>Recipes</h1>
      <div className='recipes-grid'>
        {sampleRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
