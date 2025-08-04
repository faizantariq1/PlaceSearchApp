import { Config } from '../config';
import { cache } from '../utils/cache';
import { PlacePrediction } from '../types';

export const fetchPlaces = async (query: string): Promise<PlacePrediction[]> => {
  const cacheKey = `places_${query}`;
  const cached = await cache.get<PlacePrediction[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&key=${Config.GOOGLE_PLACES_API_KEY}&types=establishment`
    );

    const data = await response.json();

    if (data.status === 'OK') {
      const results = data.predictions.map((prediction: any) => ({
        place_id: prediction?.place_id,
        name: prediction?.structured_formatting?.main_text,
        formatted_address: prediction?.description,
      }));

      await cache.set(cacheKey, results);
      return results;
    }

    throw new Error(data.error_message || 'Failed to fetch places');
  } catch (error) {
    console.error('Places API error:', error);
    throw error;
  }
};

export const fetchPlaceDetails = async (placeId: string): Promise<PlacePrediction> => {
  const cacheKey = `place_details_${placeId}`;
  const cached = await cache.get<PlacePrediction>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry&key=${Config.GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (data.status === 'OK') {
      const place = {
        place_id: placeId,
        name: data?.result?.name,
        formatted_address: data?.result?.formatted_address,
        geometry: data?.result?.geometry,
      };

      await cache.set(cacheKey, place);
      return place;
    }

    throw new Error(data?.error_message || 'Failed to fetch place details');
  } catch (error) {
    console.error('Place details error:', error);
    throw error;
  }
};
