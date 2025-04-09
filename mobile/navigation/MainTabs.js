import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PerfilScreen from '../screens/PerfilScreen';
// pode adicionar outras telas no futuro, como Estoque, Perfil, etc.

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {<Tab.Screen name="FavoriteScreen" component={FavoriteScreen}/>}
      {<Tab.Screen name="PerfilScreen" component={PerfilScreen}/>}
    </Tab.Navigator>
  );
}
