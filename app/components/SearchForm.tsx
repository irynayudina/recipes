'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';

const cuisines = [
  { value: '', label: 'Select Cuisine' },
  { value: 'african', label: 'African' },
  { value: 'american', label: 'American' },
  { value: 'asian', label: 'Asian' },
  { value: 'british', label: 'British' },
  { value: 'cajun', label: 'Cajun' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'eastern european', label: 'Eastern European' },
  { value: 'european', label: 'European' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'greek', label: 'Greek' },
  { value: 'indian', label: 'Indian' },
  { value: 'irish', label: 'Irish' },
  { value: 'italian', label: 'Italian' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'jewish', label: 'Jewish' },
  { value: 'korean', label: 'Korean' },
  { value: 'latin american', label: 'Latin American' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'middle eastern', label: 'Middle Eastern' },
  { value: 'nordic', label: 'Nordic' },
  { value: 'southern', label: 'Southern' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'thai', label: 'Thai' },
  { value: 'vietnamese', label: 'Vietnamese' },
];

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [prepTime, setPrepTime] = useState('');

  const isFormValid =
    query.trim() !== '' || cuisine !== '' || prepTime.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) {
      params.append('query', query.trim());
    }
    if (cuisine) {
      params.append('cuisine', cuisine);
    }
    if (prepTime.trim()) {
      params.append('maxReadyTime', prepTime.trim());
    }

    const queryString = params.toString();
    router.push(`/recipes${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-4'>
      {/* Recipe Query Input */}
      <div className='space-y-1'>
        <Label htmlFor='query'>What would you like to cook?</Label>
        <Input
          type='text'
          id='query'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='e.g., pasta, chicken, salad...'
        />
      </div>

      {/* Cuisine Dropdown */}
      <div className='space-y-1'>
        <Label htmlFor='cuisine'>Cuisine Type</Label>
        <Select
          id='cuisine'
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
        >
          {cuisines.map(cuisineOption => (
            <option key={cuisineOption.value} value={cuisineOption.value}>
              {cuisineOption.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Preparation Time Input */}
      <div className='space-y-1'>
        <Label htmlFor='prepTime'>Maximum Preparation Time (minutes)</Label>
        <Input
          type='number'
          id='prepTime'
          value={prepTime}
          onChange={e => setPrepTime(e.target.value)}
          placeholder='e.g., 30'
          min='1'
          max='300'
        />
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={!isFormValid}
        className='w-full'
        variant={isFormValid ? 'default' : 'secondary'}
      >
        Find Recipes
      </Button>
    </form>
  );
}
