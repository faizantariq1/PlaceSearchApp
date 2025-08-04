import React from 'react';
import { View, Text } from 'react-native';
import { ErrorMessageProps } from './type';
import { styles } from './styles';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

export default ErrorMessage;