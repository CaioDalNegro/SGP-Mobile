import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Cabeçalho com texto de boas-vindas */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Seu refúgio perfeito, a apenas um login de distância!
          </Text>
        </View>

        {/* Texto de boas-vindas */}
        <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>

        {/* Caixa de Login - E-mail */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#888"
          />
        </View>

        {/* Caixa de Login - Senha */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Texto de reconectar com a natureza na parte inferior */}
      <SafeAreaView style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Reconecte-se com a Natureza
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
