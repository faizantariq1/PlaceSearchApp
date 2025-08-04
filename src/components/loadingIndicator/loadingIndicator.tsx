import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';

const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#007AFF" />
    <Text style={styles.text}>Loading...</Text>
  </View>
);

export default LoadingIndicator;