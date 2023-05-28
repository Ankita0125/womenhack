import React from 'react';
import { View, StyleSheet, Image,FlatList,TouchableOpacity,SafeAreaView } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAP_APIKEY } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navSlice';
import Food from '../components/Food';
//import Chatbot from '../components/chatbot';
import { useNavigation } from '@react-navigation/native';

// const GOOGLE_MAP_APIKEY = ""
const data=[
    {
    id:"00",
    title:"Camera",
    image:"https://highpayingaffiliateprograms.com/wp-content/uploads/2018/10/chatbot.jpg",
    screen:"chatbot",
    },

  ];

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation=useNavigation();

    return (
        <Screen style={tw`bg-white h-full`}>
            
            <View style={tw`p-1`}>
            
                <Image
                    source={require('../assets/logo2.jpeg')}
                    style={styles.logo}
                />
                <View style={tw`mb-0 border-2 rounded-lg border-pink-200`}>
                    <GooglePlacesAutocomplete 
                        placeholder='Enter Your Location'
                        
                        onPress={(data, details = null) => {
                         dispatch(setOrigin({
                                loaction: details.geometry.location,
                                description: data.description
                            }))
                           dispatch(setDestination(null))
                        }}
                        minLength={2}
                        fetchDetails={true}
                       returnKeyType={"search"}
                       onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={{
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                fontSize: 16
                                
                            }
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        enablePoweredByContainer={false}
                    />
                </View>
                <NavOptions />
                <Food />
                <FlatList
    data={data}
    horizontal
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
        <TouchableOpacity
        onPress={()=> navigation.navigate(item.screen)}
        >
         <SafeAreaView>
                <Image 
                style={{
                    width:82,
                    height:82,
                    resizeMode:"contain",
                    marginLeft:290,
                    marginTop:0,
                }}
                source={{uri:item.image}} />
                
        
            </SafeAreaView>
        </TouchableOpacity>
         )}
    />
            </View>
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 0,



        
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    
})

export default HomeScreen;
