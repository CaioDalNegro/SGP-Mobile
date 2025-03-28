import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';  // A tela principal
import LoginScreen from './screens/LoginScreen'; // A tela de login

const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ypua" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
