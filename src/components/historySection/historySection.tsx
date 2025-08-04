import React, { memo } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import PlaceListItem from '../placeListItem/placeListItem';
import LoadingIndicator from '../loadingIndicator/loadingIndicator';
import { PlacePrediction } from '../../types';
import { HistorySectionProps } from './type';
import { styles } from './styles';

const HistorySection = memo(({
  history,
  isLoading,
  onSelect,
  onClear,
}: HistorySectionProps) => {
  const renderItem = ({ item }: { item: PlacePrediction }) => (
    <PlaceListItem
      item={item}
      onPress={() => onSelect(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Search History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <LoadingIndicator />
      ) : history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item?.place_id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.emptyMessage}>No search history yet</Text>
      )}
    </View>
  );
});


export default HistorySection;