import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import Button from './button'


const data = [
    {
        id: "Uber-X-123",
        title: "Ankita",
        multiplier: 1,
        pref:"Bike",
        image: "https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
    },
    {
        id: "Uber-XL-456",
        title: "Shiwanshi",
        multiplier: 1.2,
        pref:"Auto",
        image: "https://static.vecteezy.com/system/resources/previews/001/609/644/original/indian-girl-face-avatar-cartoon-free-vector.jpg"
    },
    {
        id: "Uber-LUX-123",
        title: "Jigyasa",
        multiplier: 1.75,
        pref:"Cab",
        image: "https://static.vecteezy.com/system/resources/previews/002/002/297/original/beautiful-woman-avatar-character-icon-free-vector.jpg"
    },
]

const SEARCH_CHARGE_RATE = 1.5


const RideOptionsCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    useEffect(() =>{
        if(!origin || !destination) navigation.push('NavigateCard')
    }, [origin, destination])

    const travelConst = (item) => {
        return ((travelTimeInformation?.duration?.value * SEARCH_CHARGE_RATE * item?.multiplier) / 10).toFixed(2)
    }

    const onChoose = () =>{
        if(!selected) return Alert.alert('Please select a ride option')
        navigation.push('SuccessScreen', { data: {...selected, distance: travelTimeInformation?.distance?.text, time: travelTimeInformation?.duration.text, price: travelConst(selected)} })
    }
    const showAlert = () => {
        Alert.alert(
          'Alert Title',
          'This is the alert message.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ]
        );
      };

    return (
        <Screen style={tailwind`bg-white h-full`}>
            <View style={tailwind`items-center flex-row justify-center mb-3`}>
                <TouchableOpacity
                    style={{ left: 10, position: 'absolute', zIndex: 100 }}
                    onPress={() => navigation.push("NavigateCard")}
                >
                    <Icon
                        type="antdesign"
                        name="arrowleft"
                        color="black"
                        size={23}
                        style={tailwind`p-3`}
                    />
                </TouchableOpacity>
                <Text style={tailwind`text-center text-xl font-bold`}>Select a ride - {travelTimeInformation?.distance?.text}</Text>
            </View>
            <View style={tailwind`flex-1 mt-2`}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={tailwind`flex-row items-center justify-between px-5 ${selected?.id === item.id && 'bg-white-100'}`}
                            onPress={() => {setSelected(item)}}
                           
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                               
                            />
                            <View style={tailwind`flex-row items-center justify-between flex-1`}>
                                <View>
                                    <Text style={tailwind`text-xl font-bold text-black`}>{item.title}</Text>
                                    
                                    <Text style={tailwind`text-black-600`}>{item.pref}</Text>
                                    <Text style={tailwind`text-gray-600`}>{travelTimeInformation?.duration?.text} Travel time</Text>
                                </View>
                                <Text style={tailwind`text-gray-800 text-lg`}>
                                    {/* {new Intl.NumberFormat('en-us', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(
                                        travelConst(item)
                                    )} */}
                                    Rs {travelConst(item)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={tailwind`bg-black py-3 m-3 rounded-lg ${!selected && 'bg-gray-300'}`}
                    disabled={!selected}
                    onPress={onChoose}
                >
                    <Text style={tailwind`text-center text-white text-xl`}>Choose {selected?.pref}</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})
