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
<<<<<<< HEAD
      <Tab.Screen name="Home" component={HomeScreen} />
      {<Tab.Screen name="FavoriteScreen" component={FavoriteScreen}/>}
      {<Tab.Screen name="PerfilScreen" component={PerfilScreen}/>}
      {<Tab.Screen name="Reservas" component={ReservaScreen}/>}
=======
      <Tab.Screen name="Início" component={HomeScreen} />
      {<Tab.Screen name="Favoritos" component={FavoriteScreen}/>}
      {<Tab.Screen name="Perfil" component={PerfilScreen}/>}
>>>>>>> 1965aee964859f935cf92ebef522c67b7b1a5ed3
    </Tab.Navigator>
  );
}
