import { useState, useEffect, useCallback } from 'react';
import { fetchPlaces } from '../services/placesService';
import { useDebounce } from './useDebounce';
import { cache } from '../utils/cache';
import { PlacePrediction } from '../types';
import { Keyboard } from 'react-native';

export const usePlacesSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 500);

  const searchPlaces = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      Keyboard.dismiss();
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cacheKey = `places_search_${searchQuery}`;
      const cachedResults = await cache.get<PlacePrediction[]>(cacheKey);

      if (cachedResults) {
        setResults(cachedResults);
        return;
      }

      const apiResults = await fetchPlaces(searchQuery);
      setResults(apiResults);
      await cache.set(cacheKey, apiResults, 60 * 60 * 1000); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchPlaces(debouncedQuery);
  }, [debouncedQuery, searchPlaces]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
};