import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCKsMoncrAfHJlkl-XPGzH_Z3Kj46QdeCU'; // Replace with your Google Maps API key
const RADIUS = 1000; // Radius in meters to search for nearby places

const EatsScreen = () => {
  const [markers, setMarkers] = React.useState([]);
  const [markersP, setMarkersP] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [routeCoordinates, setRouteCoordinates] = React.useState([]);

  React.useEffect(() => {
    if (selectedLocation && selectedMarker) {
      fetchRouteCoordinates(selectedLocation, selectedMarker);
    }
  }, [selectedLocation, selectedMarker]);

  const fetchToilets = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${RADIUS}&keyword=toilet&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      setMarkers(data.results);
    } catch (error) {
      console.error('Error fetching nearby toilets:', error);
    }
  };

  const fetchPharmacy = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${RADIUS}&keyword=pharmacy&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      setMarkersP(data.results);
    } catch (error) {
      console.error('Error fetching nearby pharmacy:', error);
    }
  };

  const fetchRouteCoordinates = async (source, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${source.latitude},${source.longitude}&destination=${destination.geometry.location.lat},${destination.geometry.location.lng}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      const points = data.routes[0].overview_polyline.points;
      const decodedCoordinates = decode(points);
      const coordinates = decodedCoordinates.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error('Error fetching route coordinates:', error);
    }
  };

  const handleSelectLocation = (data, details) => {
    const selectedLocation = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setSelectedLocation(selectedLocation);
    setSelectedMarker(null);
    fetchToilets(selectedLocation);
    fetchPharmacy(selectedLocation);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <View style={{ flex: 1, marginTop: 32 }}>
      <GooglePlacesAutocomplete
        placeholder="Where from?"
        styles={{
          container: {
            flex: 0,
            borderWidth: 3,
            borderRadius: 5,
            backgroundColor: 'pink',
          },
          textInput: {
            fontSize: 15,
            color: 'black',
            backgroundColor: 'pink',
          },
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        returnKeyType={'search'}
        onPress={(data, details) => {
          handleSelectLocation(data, details);
        }}
      />
      {selectedLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={selectedLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title="Selected Location"
              pinColor="green" // Change the color as per your preference
            />
          )}

          {selectedMarker && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={2}
              strokeColor="blue"
            />
          )}

          {markers.map((marker) => (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
              pinColor="red"
              onPress={() => handleMarkerPress(marker)}
            />
          ))}

          {markersP.map((marker) => (
            <Marker
              key={marker.place_id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
              pinColor="blue"
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default EatsScreen;
