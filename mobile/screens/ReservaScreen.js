import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { criarReserva, buscarReservas } from '../components/api';

export default function TelaReservas() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');
  const [quarto, setQuarto] = useState('');

  const carregarReservas = async () => {
    const dados = await buscarReservas();
    // setReservas(dados); // seu código ainda não tem essa parte visível
  };

  // Função para converter de "DD/MM/AAAA" para "AAAA-MM-DD"
  const converterDataParaFormatoAmericano = (dataBR) => {
    const partes = dataBR.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }
    return dataBR; // Se o formato for inválido, retorna como está
  };

  const salvarReserva = async () => {
    const dataCheckinAmericana = converterDataParaFormatoAmericano(dataCheckin);
    const dataCheckoutAmericana = converterDataParaFormatoAmericano(dataCheckout);

    await criarReserva({
      nome: nome,
      email: email,
      data_checkin: dataCheckinAmericana,
      data_checkout: dataCheckoutAmericana,
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

      <TextInput 
        placeholder="Nome do Cliente" 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <TextInput 
        placeholder="Email do Cliente" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <TextInput 
        placeholder="Data Check-in (DD/MM/AAAA)" 
        value={dataCheckin} 
        onChangeText={setDataCheckin} 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <TextInput 
        placeholder="Data Check-out (DD/MM/AAAA)" 
        value={dataCheckout} 
        onChangeText={setDataCheckout} 
        style={styles.input} 
        placeholderTextColor="#999"
      />
      <TextInput 
        placeholder="Quarto" 
        value={quarto} 
        onChangeText={setQuarto} 
        style={styles.input} 
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarReserva}>
        <Text style={styles.botaoTexto}>Criar Reserva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDE6DA',
    justifyContent: 'center'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
