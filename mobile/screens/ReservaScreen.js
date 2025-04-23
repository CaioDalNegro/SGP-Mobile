import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { criarReserva, buscarReservas } from '../components/api';

export default function TelaReservas() {
  const [reservas, setReservas] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');
  const [quarto, setQuarto] = useState('');

  const carregarReservas = async () => {
    const dados = await buscarReservas();
    setReservas(dados);
  };

  const salvarReserva = async () => {
    await criarReserva({
      nome: nome,
      email: email,
      data_checkin: dataCheckin,
      data_checkout: dataCheckout,
      quarto: quarto
    });
    setNome('');
    setEmail('');
    setDataCheckin('');
    setDataCheckout('');
    setQuarto('');
    carregarReservas();
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Reserva</Text>
      <TextInput placeholder="Nome do Cliente" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email do Cliente" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Data Check-in (AAAA-MM-DD)" value={dataCheckin} onChangeText={setDataCheckin} style={styles.input} />
      <TextInput placeholder="Data Check-out (AAAA-MM-DD)" value={dataCheckout} onChangeText={setDataCheckout} style={styles.input} />
      <TextInput placeholder="Quarto" value={quarto} onChangeText={setQuarto} style={styles.input} />
      <Button title="Criar Reserva" onPress={salvarReserva} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 6
  },
  item: {
    paddingVertical: 6
  }
});
