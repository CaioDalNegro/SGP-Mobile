import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';  // A tela principal
import LoginScreen from './screens/LoginScreen'; // A tela de login

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Ypua" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Remover o título da parte superior
        />
        <Tab.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Remover o título da parte superior
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
