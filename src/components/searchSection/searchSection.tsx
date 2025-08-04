import React, { memo, useCallback } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { PlacePrediction } from '../../types';
import PlaceListItem from '../placeListItem/placeListItem';
import LoadingIndicator from '../loadingIndicator/loadingIndicator';
import ErrorMessage from '../errorMessage/errorMessage';
import { SearchSectionProps } from './type';
import { styles } from './styles';

const SearchSection = memo(({
  query,
  results,
  isLoading,
  error,
  onChangeQuery,
  onSelectPlace,
}: SearchSectionProps) => {
  const renderItem = useCallback(
    ({ item }: { item: PlacePrediction }) => (
      <PlaceListItem
        item={item}
        onPress={() => onSelectPlace(item)}
      />
    ),
    [onSelectPlace]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for places..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={onChangeQuery}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}

      {results.length > 0 && (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.place_id}
          style={styles.resultsList}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
});



export default SearchSection;