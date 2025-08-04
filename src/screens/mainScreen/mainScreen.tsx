import React, { useCallback, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { usePlacesSearch } from '../../hooks/usePlacesSearch';
import { usePlaceHistory } from '../../hooks/usePlaceHistory';
import { PlacePrediction } from '../../types';
import { fetchPlaceDetails } from '../../services/placesService';
import HistorySection from '../../components/historySection/historySection';
import MapSection from '../../components/mapSection/mapSection';
import SearchSection from '../../components/searchSection/searchSection';
import { styles } from './styles';

const MainScreen = () => {
  const {
    query,
    setQuery,
    results,
    isLoading,
    error,
  } = usePlacesSearch();

  const {
    history,
    isLoadingHistory,
    addToHistory,
    clearHistory,
  } = usePlaceHistory();

  const [selectedPlace, setSelectedPlace] = useState<PlacePrediction | null>(null);

  const handlePlaceSelect = useCallback(async (place: PlacePrediction) => {
    try {
      const details = await fetchPlaceDetails(place.place_id);
      setSelectedPlace(details);
      addToHistory(details);
      setQuery('');
    } catch (err) {
      console.error('Failed to select place', err);
    }
  }, [addToHistory, setQuery]);

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
    keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <SearchSection
        query={query}
        results={results}
        isLoading={isLoading}
        error={error}
        onChangeQuery={setQuery}
        onSelectPlace={handlePlaceSelect}
      />

      <MapSection
        selectedPlace={selectedPlace}
        fallbackText="Search for locations to see them on the map"
      />

      <HistorySection
        history={history}
        isLoading={isLoadingHistory}
        onSelect={handlePlaceSelect}
        onClear={clearHistory}
        />
   </KeyboardAvoidingView>
  );
};

export default MainScreen;