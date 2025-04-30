import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ReservaScreen from '../screens/ReservaScreen';
// pode adicionar outras telas no futuro, como Estoque, Perfil, etc.

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Início" component={HomeScreen} />
      {<Tab.Screen name="Favoritos" component={FavoriteScreen}/>}
      {<Tab.Screen name="Perfil" component={PerfilScreen}/>}
      {<Tab.Screen name="Reservas" component={ReservaScreen}/>}
    </Tab.Navigator>
  );
}
