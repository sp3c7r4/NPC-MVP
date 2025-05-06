import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import ModalView from '@/components/Modal'
import AddData from '@/components/AddData'

function Header() {
  return (
    <View style={{width: "100%"}}>
      <View>
        <Text style={{color: "#fff", fontSize: 25, fontFamily: "Satoshi-Bold"}}>Welcome <Text style={{color: colors.light.primary}}>Satar {"😊"}</Text></Text>
        <Text style={{color: "rgba(255,255,255, 0.3)", fontFamily: "Satoshi-Regular"}}>Welcome to the home dashboard</Text>
      </View>
    </View>
  )
}

function AddInfo({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{borderColor: "rgba(255,255,255,0.5)", borderWidth: 1, height: 150, width: 150, borderRadius: 12, alignItems: "center", justifyContent: "center",}}>
        <View style={{width: "30%", height: "30%", backgroundColor: colors.light.primary, borderRadius: 8, alignItems: "center", justifyContent: "center"}}>
          <Image source={require("@/assets/icon/plus.png")} style={{width: 25, height: 25}} resizeMode='contain'/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const home = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <SafeAreaView style={{backgroundColor: colors.light.background_black, flex: 1, alignItems: "center", paddingHorizontal: 16, justifyContent: "space-between"}}>
      {/* <View style={{justifyContent: "center", position: "absolute", alignItems: "center", flex: 1, backgroundColor: "#fff"}}> */}
      {/* </View> */}
      <Header/>
      <Text>Create census data</Text>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <AddInfo onPress={() => setShowModal(true)}/>
      </View>
      <StatusBar style="auto"/>
      { showModal && <AddData onClose={() => setShowModal(false)}/>}
    </SafeAreaView>
  )
}

export default home