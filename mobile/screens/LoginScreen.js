import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../estilos/stylesLogin';
import { adminCredentials } from '../config/admin'; // credenciais fixas
import { UserContext } from '../context/UserContext'; // Importando o contexto

export default function LoginScreen({ navigation }) {
  const [mensagemErro, setMensagemErro] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext); // Obtendo o setUserData do contexto

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de continuar.');
      return;
    }

    setLoading(true);

    // Verificando se é login fixo (admin)
    if (email === adminCredentials.email && senha === adminCredentials.senha) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }], // Redireciona para a tela principal (ou outra desejada)
      });
      setLoading(false);
      return;
    }

    // Caso contrário, tenta validar no banco
    try {
      const { data } = await axios.post('http://10.110.12.61:1880/login', { email, senha });

          if (!data.sucesso) {
      setMensagemErro(data.erro); // mostra erro abaixo do botão
    } else {
      setMensagemErro('');
      setUserData(data.usuario);
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }


    } catch (error) {
      console.error(error);
      Alert.alert('Erro de login', 'Erro ao se conectar com o servidor.');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Conecte-se com a Natureza</Text>
        <Text style={styles.loginSubtitle}>Faça login para continuar</Text>

        {/* Campo de e-mail */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
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
          <TouchableOpacity onPress={() => setPasswordVisible(v => !v)}>
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Botão de login */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

              {mensagemErro !== '' && (
        <Text style={{ color: 'red', marginTop: 15, textAlign: 'center' }}>
          {mensagemErro}
        </Text>
      )}

        
      </View>
    </SafeAreaView>
  );
}
