import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import React from 'react'
import Menu from './Menu'

export default function Homepage() {
  const navigation = useNavigation()

  const goToNextScreen = () => {
    navigation.navigate(Menu)
  }

  return (
    <View className="bg-black">
      <Image source={require("./../../assets/images/homepage.jpg")}
        className="w-full h-[600px] object-cover"
      />
      <View className="p-10 bg-white mt-[-15px] rounded-t-3xl">
        <Text className="text-[30px] font-bold">Jiwani</Text>
        <Text className="text-[18px] text-slate-500 mt-2">Everyone Has Their Own Space</Text>
        <TouchableOpacity onPress={() => {goToNextScreen()}}
        className="p-3 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}