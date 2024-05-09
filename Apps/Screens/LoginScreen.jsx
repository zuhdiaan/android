import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View>
      <Image source={require("./../../assets/images/login.jpeg")}
        className="w-full h-[550px] object-cover"
      />
      <View className="p-10 bg-white mt-[-20px] rounded-t-3xl">
        <Text className="text-[30px] font-bold">Jiwani</Text>
        <Text className="text-[18px] text-slate-500 mt-2">Everyone Has Their Own Space</Text>
        <TouchableOpacity onPress={()=>console.log("SignIn")} className="p-3 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}