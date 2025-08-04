import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { PlaceListItemProps } from './type';
import { styles } from './styles';

const PlaceListItem: React.FC<PlaceListItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.title} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.address} numberOfLines={1}>
      {item.formatted_address}
    </Text>
    <View style={styles.divider} />
  </TouchableOpacity>
);

export default memo(PlaceListItem);