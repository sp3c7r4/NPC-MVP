import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="home"/>
      <Tabs.Screen name="dashboard"/>
    </Tabs>
  )
}

export default _layout