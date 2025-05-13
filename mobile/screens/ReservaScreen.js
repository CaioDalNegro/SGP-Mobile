import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { criarReserva, buscarReservas } from '../components/api';

export default function TelaReservas() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCheckin, setDataCheckin] = useState(new Date());
  const [dataCheckout, setDataCheckout] = useState(new Date());
  const [quarto, setQuarto] = useState('');

  const [showCheckinPicker, setShowCheckinPicker] = useState(false);
  const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);

  const formatarData = (data) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const converterParaAmericano = (data) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const salvarReserva = async () => {
    await criarReserva({
      nome: nome,
      email: email,
      data_checkin: converterParaAmericano(dataCheckin),
      data_checkout: converterParaAmericano(dataCheckout),
      quarto: quarto
    });

    setNome('');
    setEmail('');
    setDataCheckin(new Date());
    setDataCheckout(new Date());
    setQuarto('');
    carregarReservas();
  };

  const carregarReservas = async () => {
    try {
      const dados = await buscarReservas();
      // setReservas(dados); // Remover ou implementar conforme necessário
    } catch (erro) {
      console.error("Erro ao carregar reservas:", erro);
    }
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

      {/* CHECK-IN */}
      <TouchableOpacity style={styles.input} onPress={() => setShowCheckinPicker(true)}>
        <Text style={{ color: dataCheckin ? '#000' : '#999' }}>
          {formatarData(dataCheckin)}
        </Text>
      </TouchableOpacity>
      {showCheckinPicker && (
        <DateTimePicker
          value={dataCheckin}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowCheckinPicker(false);
            if (selectedDate) setDataCheckin(selectedDate);
          }}
        />
      )}

      {/* CHECK-OUT */}
      <TouchableOpacity style={styles.input} onPress={() => setShowCheckoutPicker(true)}>
        <Text style={{ color: dataCheckout ? '#000' : '#999' }}>
          {formatarData(dataCheckout)}
        </Text>
      </TouchableOpacity>
      {showCheckoutPicker && (
        <DateTimePicker
          value={dataCheckout}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowCheckoutPicker(false);
            if (selectedDate) setDataCheckout(selectedDate);
          }}
        />
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo de Quarto:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={quarto}
            onValueChange={(itemValue) => setQuarto(itemValue)}
            style={styles.picker}
            dropdownIconColor="#4CAF50"
          >
            <Picker.Item label="Selecione o quarto" value="" />
            <Picker.Item label="Domo" value="Domo" />
            <Picker.Item label="Charrua" value="Charrua" />
            <Picker.Item label="Cabana" value="Cabana" />
            <Picker.Item label="Chalé" value="Chalé" />
            <Picker.Item label="Suíte" value="Suíte" />
          </Picker>
        </View>
      </View>

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
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
