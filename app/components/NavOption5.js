import { FlatList, Text, TouchableOpacity, View,Image,StyleSheet } from 'react-native'
import React, { useState } from 'react'

import tw from 'tailwind-react-native-classnames';
//import { Icon } from '@rneui/themed';
import { GOOGLE_MAP_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {selectOrigin} from '../redux/slices/navSlice'
import { selectDestination, setDestination } from '../redux/slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { selectTravelTimeInformation } from '../redux/slices/navSlice';
import MapView, { Marker } from 'react-native-maps'




const data = [{
        id: "111",
        title: "Kitchen 1",
        latitude: 12.970069322496375, 
        longitude:  77.59743696746472
        
    },
    {
        id: "222",
        title: "Kitchen 2",
        latitude: 12.975011323394945, 
        longitude: 77.60086899597296,
    },
    {
        id: "333",
        title: "Kitchen 3",
        latitude:12.973432666716018, 
        longitude: 77.77361124930775
    },
    {
        id: "444",
        title: "Kitchen 4",
        latitude: 12.980090161369366,
        longitude: 77.64411347515825

    },
    {
        id:"555",
        title:"Kitchen 5",
        latitude:13.0507671208075, 
        longitude:77.54752346976379
    }

];
const NavOption5 = () => {
  const origin=useSelector(selectOrigin)
    const [lat,setLat]=useState(0)
    const [long,setLong]=useState(0)
   const[location,setLocation]=useState(null)
  
    useEffect(() => {
       
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    return (
        <View>
              <View style={tw`h-2/3`}>
   <MapView
   
   style={tw`flex-1`}
   mapType="mutedStandard"
   initialRegion={{
    latitude: origin?.loaction.lat,
    longitude: origin?.loaction.lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
   }}
>

   {lat&&long?<Marker
   coordinate={{
       latitude:lat,
       longitude:long,
    }}
   />:<Marker
   coordinate={{
   
    latitude: origin?.loaction.lat,
    longitude: origin?.loaction.lng
                    
   }}
   
   />
    
    }
       <Marker
     coordinate={{
     
        latitude: origin?.loaction.lat,
        longitude: origin?.loaction.lng
        
     }}
     pinColor={'green'}
     />
     
     {lat&&long?  
  
     
     
     <MapViewDirections
    origin={{latitude:lat,longitude:long}}
    destination={{latitude: origin?.loaction.lat,
        longitude: origin?.loaction.lng}}
    apikey={GOOGLE_MAP_APIKEY}
    strokeWidth={4}
    strokeColor="blue"
  />:<Marker
   coordinate={{
   
    latitude: origin?.loaction.lat,
        longitude: origin?.loaction.lng
   }}
   pinColor={'green'}
   />
    
    }


   
   </MapView>
   </View>
        <View style={tw`h-1/3 bg-red-200`}>
      <FlatList
      
      data={data}
      vertical
      
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
    
          <TouchableOpacity 
            onPress={() => {
           setLat(item.latitude)
           setLong(item.longitude)
             }
            
            }
            style={tw`p-2 pl-6   bg-white-200 m-2 w-120`}>
              <View style={tw`bg-red-400 rounded-xl border-2 h-12`}>
                  <Text style={tw`mt-2 text-center text-lg font-semibold`}>Proceed to: {item.title}</Text>
                
              </View>
          </TouchableOpacity>
      )}
      
      />
      
      
      
      </View>
       
     
      </View>
    );
  };

                export default NavOption5

                const styles = StyleSheet.create({})