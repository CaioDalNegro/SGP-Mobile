// telas/Sucesso.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Sucesso = ({ route, navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sucesso!</Text>
      <Text style={styles.mensagem}>{'Reserva concluída!'}</Text>

      <Button
        title="Voltar à Home"
        onPress={() => navigation.navigate('Main')}
        color="#4CAF50"
      />
    </View>
  );
};

export default Sucesso;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  mensagem: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#388e3c',
  }
});
