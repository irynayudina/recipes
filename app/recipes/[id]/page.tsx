import { Suspense } from 'react';

import BackButton from '../../components/BackButton';
import RecipeContent from '../../components/RecipeContent';
import RecipeImage from '../../components/RecipeImage';
import { Recipe } from '../../types/recipe';

import RecipeDetailLoading from './loading';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getRecipeDetails(id: string): Promise<Recipe | null> {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('Please set your Spoonacular API key in .env.local file');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export default async function RecipePage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getRecipeDetails(id);

  if (!recipe) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-md p-8'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Recipe Not Found
            </h1>
            <p className='text-gray-600'>
              {'Unable to load recipe details. Please try again later.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Back Button */}
        <div className='mb-6'>
          <BackButton fallbackHref='/recipes'>Back to Results</BackButton>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <Suspense fallback={<RecipeDetailLoading />}>
            {/* Recipe Header */}
            <div className='relative'>
              <RecipeImage recipe={recipe} />
              <RecipeContent recipe={recipe} />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
