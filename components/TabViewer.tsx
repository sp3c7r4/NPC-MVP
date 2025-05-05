import { useState } from 'react';
import { View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
export default function TabViewer() {

  const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#eee' }} />;
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'signup', title: 'Signup' },
    { key: 'signin', title: 'SignIn' },
  ]);
return  (
<TabView
  navigationState={{ index, routes }}
  renderScene={SceneMap({
    signup: FirstRoute,
    signin: SecondRoute,
  })}
  onIndexChange={setIndex}
/>
)
}
