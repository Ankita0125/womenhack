import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { selectOrigin } from '../redux/slices/navSlice'
import { useSelector } from 'react-redux'

const data = [
    {
        id: '1224',
        title: 'Female Drivers',
        image: 'https://previews.123rf.com/images/alexwhite/alexwhite1609/alexwhite160904918/62684022-taxi-flat-pink-icon.jpg',
        screen: 'MapScreen'
    },
    {
        id: '4354',
        title: 'Places Near Me',
        image: 'https://cdn.icon-icons.com/icons2/3556/PNG/512/place_navigation_pin_location_map_icon_225011.png',
        screen: 'EatsScreen'
    },
]

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw` bg-white-200 w-125 rounded-lg`}
                    onPress={() => navigation.push(item.screen)}
                    disabled={!origin}
                >
                    <View style={tw`${!origin && 'opacity-30'}`}>
                        <Image 
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                        <View style={tw`flex-row items-center mt-3 `}>
                            <Text style={tw`text-lg font-bold mx-28 mr-0 text-black`}>{item.title}</Text>
                            <Icon 
                                type="antdesign"
                                name="arrowright"
                                color="black"
                                size={22}
                                style={tw`ml-2`}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
           vertical
      />
    )
}

export default NavOptions

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginLeft:120,
        marginTop: 10
        
    }
})
