import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    color: '#007AFF',
    fontSize: 16,
  },
  list: {
    backgroundColor: '#fff',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
    fontSize: 14,
  },
});