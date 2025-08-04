import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlacePrediction } from '../types';

const HISTORY_KEY = 'placesHistory';

export const usePlaceHistory = () => {
  const [history, setHistory] = useState<PlacePrediction[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
        setHistory(storedHistory ? JSON.parse(storedHistory) : []);
      } catch (err) {
        console.error('Failed to load history', err);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, []);

  const addToHistory = async (place: PlacePrediction) => {
    if (history.some(item => item.place_id === place.place_id)) return;

    const newHistory = [place, ...history.slice(0, 9)]; 
    setHistory(newHistory);

    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (err) {
      console.error('Failed to save history', err);
    }
  };

  const clearHistory = async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.error('Failed to clear history', err);
    }
  };

  return {
    history,
    isLoadingHistory,
    addToHistory,
    clearHistory,
  };
};