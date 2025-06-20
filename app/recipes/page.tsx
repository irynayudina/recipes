import RecipeCard from '../components/RecipeCard';
import BackButton from '../components/BackButton';
import Link from 'next/link';
import { Suspense } from 'react';
import RecipesLoading from './loading';

interface Recipe {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
}

interface SearchResponse {
  results: Recipe[];
  totalResults: number;
  offset: number;
  number: number;
}

interface SearchParams {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}

async function getRecipes(searchParams: SearchParams): Promise<Recipe[]> {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('Please set your Spoonacular API key in .env.local file');
    return [];
  }

  // Build query parameters
  const params = new URLSearchParams({
    apiKey,
    number: '12',
    addRecipeInformation: 'true'
  });

  if (searchParams.query) {
    params.append('query', searchParams.query);
  }
  if (searchParams.cuisine) {
    params.append('cuisine', searchParams.cuisine);
  }
  if (searchParams.maxReadyTime) {
    params.append('maxReadyTime', searchParams.maxReadyTime);
  }

  // If no search parameters provided, use default values
  if (!searchParams.query && !searchParams.cuisine && !searchParams.maxReadyTime) {
    params.append('query', 'pasta');
    params.append('cuisine', 'italian');
    params.append('maxReadyTime', '30');
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      { 
        next: { revalidate: 60 } // Cache for 1 minute as requested
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const recipes = await getRecipes(searchParams);

  // Build search summary
  const searchSummary = [];
  if (searchParams.query) searchSummary.push(`"${searchParams.query}"`);
  if (searchParams.cuisine) searchSummary.push(`${searchParams.cuisine} cuisine`);
  if (searchParams.maxReadyTime) searchSummary.push(`≤${searchParams.maxReadyTime} minutes`);

  const hasSearchParams = searchParams.query || searchParams.cuisine || searchParams.maxReadyTime;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <BackButton fallbackHref="/">
              Back to Search
            </BackButton>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipes</h1>
          
          {hasSearchParams && searchSummary.length > 0 ? (
            <p className="text-lg text-gray-600">
              Results for: {searchSummary.join(' • ')}
            </p>
          ) : (
            <p className="text-lg text-gray-600">
              Discover delicious recipes from around the world
            </p>
          )}
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Recipes Found</h2>
            <p className="text-gray-600 mb-4">
              {process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY === 'your_api_key_here' 
                ? 'Please set your Spoonacular API key in the .env.local file to view recipes.'
                : hasSearchParams 
                  ? 'No recipes match your search criteria. Try adjusting your search parameters.'
                  : 'Unable to load recipes. Please try again later.'
              }
            </p>
            {process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY === 'your_api_key_here' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">How to get an API key:</h3>
                <ol className="text-blue-800 text-sm space-y-1">
                  <li>1. Sign up for a free account at <a href="https://spoonacular.com/food-api/docs#Authentication" target="_blank" rel="noopener noreferrer" className="underline">Spoonacular API</a></li>
                  <li>2. Get your API key from your account dashboard</li>
                  <li>3. Create a <code className="bg-blue-100 px-1 rounded">.env.local</code> file in the project root</li>
                  <li>4. Add: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here</code></li>
                  <li>5. Restart your development server</li>
                </ol>
              </div>
            )}
            {hasSearchParams && (
              <div className="mt-4">
                <Link 
                  href="/"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Try Different Search
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Suspense fallback={<RecipesLoading />}>
            <RecipeGrid recipes={recipes} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
