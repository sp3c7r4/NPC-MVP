import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { fontsizes } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Header = ({title, message, onPress}: {onPress: () => void, title: string, message: string}) => {
  return (
    <SafeAreaView style={{gap:10 , flexDirection: "row", width: "100%"}}>
      <Pressable onPress={onPress}>
        <Image source={require('@/assets/icon/back.png')} style={{width: 35, height: 35}}/>
      </Pressable>
      <View>
        <Text style={{fontSize: 20, color: "#fff", fontFamily: "Satoshi-Bold" }}>{title ? title : "Enter a title"}</Text>
        <Text style={{fontSize: 11, color: "#fff", opacity: 0.5, fontFamily: "Satoshi-Medium" }}>{message ? message : "Enter a custom message"}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Header