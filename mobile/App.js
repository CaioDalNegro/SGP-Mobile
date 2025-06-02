import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import MainTabs from './navigation/MainTabs';
import DescriptionScreen from './screens/DescriptionScreen';
import EditarPerfilScreen from './screens/EditarPerfilScreen';
import ConfiguracaoScreen from './screens/ConfiguracaoScreen';
import NotificacaoScreen from './screens/NotificacaoScreen';
import MercadinhoScreen from './screens/MercadinhoScreen';  


import { FavoritesProvider } from './context/FavoritesContext'; 
import { UserProvider } from './context/UserContext';

// Importa o Toast
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Description" component={DescriptionScreen} />
            <Stack.Screen name="Config" component={ConfiguracaoScreen} />
            <Stack.Screen name="Edit" component={EditarPerfilScreen} />
            <Stack.Screen name="Notificação" component={NotificacaoScreen} />
            <Stack.Screen name="Mercadinho" component={MercadinhoScreen} />
          </Stack.Navigator>
        </NavigationContainer>

        {/* Toast component */}
        <Toast />
      </FavoritesProvider>
    </UserProvider>
  );
}
