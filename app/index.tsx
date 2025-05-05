import { Redirect, router, Stack } from "expo-router";
import { Text, Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '@/assets/images/logo.png'
import founders from '@/assets/images/powered_by.png'
import { useEffect } from "react";
// import { io } from "socket.io-client";


import { useState } from "react";
import { fontsizes } from "@/constants";

export default function Index() {
  
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRedirect(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  if (redirect) {
    return <Redirect href="/(auth)/signup" />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center"}}>
      <View style={{display: "flex", alignItems: "center", gap: 5}}>
        <Image source={logo} style={{ width: 230, height: 60 }} resizeMode="contain"/>
        <Text style={{color: "#fff", fontSize: fontsizes.heading2, fontFamily: "Satoshi-Bold"}}>CensusIQ</Text>
        <Text style={{color: "rgba(255,255,255, 0.5)", fontSize: fontsizes.paragraph1, fontFamily: "Satoshi-Medium"}}>Smart Insights from Every Count</Text>
      </View>
      <Image source={founders} style={{ width: 100, height: 60, position: "absolute", bottom: 10, marginBottom: 10 }} resizeMode="contain"/>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}
