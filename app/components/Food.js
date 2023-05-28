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
        title: 'Homely  Meals',
        image: 'https://icones.pro/wp-content/uploads/2021/04/icone-de-nourriture-rose-symbole-png.png',
        screen: 'foodScreen'
    }
    
]

const Food= () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

    return (
        <FlatList
          
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw`bg--200 w-125 rounded-lg`}
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
            horizontal
      />
    )
}

export default Food

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginLeft:120,
        marginTop: 10
    }
})
