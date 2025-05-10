import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../estilos/stylesLogin'; // reutiliza os estilos do login

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    const novoUsuario = {
      nome,
      email,
      senha,
    };

    fetch('http://10.110.12.69:1880/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoUsuario),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao cadastrar');
        return response.json();
      })
      .then(() => {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um problema ao cadastrar. Tente novamente.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.loginTitle}>Cadastre-se</Text>
        <Text style={styles.loginSubtitle}>Crie sua conta para continuar</Text>

        {/* Nome */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* E-mail */}
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

        {/* Senha */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Botão de cadastro */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {/* Voltar para login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
