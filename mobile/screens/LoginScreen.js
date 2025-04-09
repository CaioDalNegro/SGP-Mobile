import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../estilos/stylesLogin";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const adminEmail = 'admin@ypua.com';
  const adminSenha = '123456';

  const handleLogin = () => {
    if (email === adminEmail && senha === adminSenha) {
      navigation.navigate('Main');
    } else {
      Alert.alert('Erro de login', 'E-mail ou senha incorretos!');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Bem-vindo de volta!</Text>
        <Text style={styles.loginSubtitle}>Faça login para continuar</Text>

        {/* Campo de e-mail */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo de senha */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
            value={senha}
            onChangeText={setSenha}
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

        {/* Botão de login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <SafeAreaView style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Reconecte-se com a Natureza</Text>
      </SafeAreaView>
    </View>
  );
}
