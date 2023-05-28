import React, { useState } from 'react';
import { View, Button, Alert, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width } = Dimensions.get('window');
const MAP_HEIGHT = width * 0.75;

const EatsScreen = () => {
  const [toilets, setToilets] = useState([]);
  const [region, setRegion] = useState(null);

  const handleSearch = async (data, details) => {
    if (!details) {
      Alert.alert('Error', 'Failed to get the location details');
      return;
    }

    const { lat, lng } = await getLatLng(details);
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    fetchNearbyToilets(lat, lng);
  };

  const getLatLng = details => {
    return new Promise((resolve, reject) => {
      const { location } = details.geometry;

      if (location) {
        resolve(location);
      } else {
        reject(new Error('Failed to get the location coordinates'));
      }
    });
  };

  const fetchNearbyToilets = (latitude, longitude) => {
    // Replace API_KEY with your Google Places API key
    const API_KEY = 'AIzaSyCKsMoncrAfHJlkl-XPGzH_Z3Kj46QdeCU';
    const API_ENDPOINT = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=resturant&key=${API_KEY}`;

    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setToilets(data.results);
        } else {
          Alert.alert('Error', 'Unable to fetch nearby toilets');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'An error occurred while fetching nearby toilets');
      });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Enter your location"
        onPress={handleSearch}
        query={{
          key: 'AIzaSyCKsMoncrAfHJlkl-XPGzH_Z3Kj46QdeCU',
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        debounce={400}
      />
      <Button title="Search" onPress={handleSearch} />
      <View style={styles.mapContainer}>
        {region && (
          <MapView style={styles.map} region={region}>
            {toilets.map(toilet => (
              <Marker
                key={toilet.place_id}
                coordinate={{
                  latitude: toilet.geometry.location.lat,
                  longitude: toilet.geometry.location.lng,
                }}
                title={toilet.name}
                description={toilet.vicinity}
              />
            ))}
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: MAP_HEIGHT,
  },
});

export default EatsScreen;
