import React, { useRef, useEffect } from 'react'
import { Alert,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import tailwind from 'tailwind-react-native-classnames'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../redux/slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_APIKEY } from '@env'
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

// const GOOGLE_MAP_APIKEY = ""

const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
        })
    }, [origin, destination])

    useEffect(() => {
        if(!origin || !destination) return;
        getTravelTime()
    }, [origin, destination, GOOGLE_MAP_APIKEY])
    
    const getTravelTime = async () => {
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAP_APIKEY}`
        const data = await fetch(URL).then(response => response.json())
        if(data.status !== 'OK') return alert(data.error_message)
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
    }
    const showAlert = () => {
        Alert.alert(
          'SOS Alert',
          'Emergency services have been notified of your Location. Help is on the way.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ]
        );
      };

    return (
        <View style={tailwind`flex-1 relative`}>
            <TouchableOpacity
                style={[ tailwind`bg-red-600 p-3 rounded-full w-14 h-14 shadow-lg`,{ top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={showAlert}
            >
             <Text style={tailwind`text-white mt-1 font-black text-base`}>SOS</Text>   
            </TouchableOpacity>

            <MapView
                ref={mapRef}
                style={tailwind`flex-1 relative z-10`}
                initialRegion={{
                    latitude: origin?.loaction.lat,
                    longitude: origin?.loaction.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                mapType="mutedStandard"
            >
                {!!origin && !!destination && (
                    <MapViewDirections
                        // origin={{ 
                        //     latitude: origin?.loaction.lat,
                        //     longitude: origin?.loaction.lng,
                        // }}
                        // destination={{ 
                        //     latitude: destination?.loaction.lat,
                        //     longitude: destination?.loaction.lng,
                        // }}
                        origin={origin.description}
                        destination={destination.description}
                        lineDashPattern={[0]}
                        apikey={ GOOGLE_MAP_APIKEY }
                        strokeWidth={3}
                        strokeColor="black"
                        onError={error => console.log("Directions error: ", error)}
                    />
                )}
                {origin?.loaction && (
                    <Marker
                        coordinate={{
                            latitude: origin?.loaction.lat,
                            longitude: origin?.loaction.lng,
                        }}
                        title="Origin"
                        description={origin.description}
                        identifier="origin"
                    >
                        <Image source={require('../assets/custom_pin.png')} style={{ height: 45, width: 45 }} />
                    </Marker>
                )}
                {destination?.loaction && (
                    <Marker
                        coordinate={{
                            latitude: destination?.loaction.lat,
                            longitude: destination?.loaction.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                    >
                        <Image source={require('../assets/custom_pin.png')} style={{ height: 45, width: 45 }} />
                    </Marker>
                )}
            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({})
