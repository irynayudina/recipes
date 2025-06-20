export interface Recipe {
  id: number;
  title: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: Array<{
    id: number;
    original: string;
    amount: number;
    unit: string;
    name: string;
  }>;
  image?: string;
}
