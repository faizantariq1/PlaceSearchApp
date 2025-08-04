import React, { memo } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapSectionProps } from './type';
import { styles } from './styles';

const MapSection = memo(({ selectedPlace, fallbackText }: MapSectionProps) => {
  const mapRegion = selectedPlace
    ? {
        latitude: selectedPlace?.geometry?.location?.lat,
        longitude: selectedPlace?.geometry?.location?.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 51.509865,
        longitude: -0.118092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View style={styles.container}>
      {mapRegion ? (
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: mapRegion?.latitude,
              longitude: mapRegion?.longitude,
            }}
            title={selectedPlace?.name}
            description={selectedPlace?.formatted_address}
          />
        </MapView>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {fallbackText || 'Search for a location to display on map'}
          </Text>
        </View>
      )}
    </View>
  );
});

export default MapSection;