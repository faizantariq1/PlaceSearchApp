import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheItem<T> {
  value: T;
  expiry: number;
}

export const cache = {
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const itemStr = await AsyncStorage.getItem(key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (err) {
      console.error('Cache get error', err);
      return null;
    }
  },

  set: async <T>(key: string, value: T, ttl: number = 60 * 60 * 1000): Promise<void> => {
    try {
      const item: CacheItem<T> = {
        value,
        expiry: Date.now() + ttl,
      };
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.error('Cache set error', err);
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error('Cache remove error', err);
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.error('Cache clear error', err);
    }
  },
};