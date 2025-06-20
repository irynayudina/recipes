# API Setup Guide

## Spoonacular API Key Setup

To use the Recipe Details page, you need to set up your Spoonacular API key:

1. **Get an API Key:**
   - Visit [Spoonacular API](https://spoonacular.com/food-api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure Environment Variables:**
   - Create a `.env.local` file in the root directory of your project
   - Add the following line:
   ```
   NEXT_PUBLIC_SPOONACULAR_API_KEY=your_actual_api_key_here
   ```
   - Replace `your_actual_api_key_here` with your real API key

3. **Restart the Development Server:**
   - Stop your current development server (Ctrl+C)
   - Run `npm run dev` again

## Features Implemented

The Recipe Details page now includes:

- **Recipe Title**: Displayed prominently at the top
- **Recipe Image**: Shows the recipe image if available
- **Preparation Time**: Shows how long the recipe takes to prepare
- **Number of Servings**: Displays the serving size
- **Recipe Summary**: Shows a detailed description of the recipe
- **Ingredients List**: Displays all ingredients with amounts and units

## Error Handling

The page includes proper error handling for:
- Missing API key
- Failed API requests
- Invalid recipe IDs

## Caching

Recipe data is cached for 1 hour to improve performance and reduce API calls. 