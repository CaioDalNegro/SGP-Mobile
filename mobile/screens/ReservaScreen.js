import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { criarReserva, buscarReservas } from '../components/api';
import { UserContext } from "../context/UserContext";
import Toast from 'react-native-toast-message';

export default function TelaReservas() {
  const [dataCheckin, setDataCheckin] = useState(new Date());
  const [dataCheckout, setDataCheckout] = useState(new Date());
  const [quarto, setQuarto] = useState('');
  const { userData } = useContext(UserContext);

  const [showCheckinPicker, setShowCheckinPicker] = useState(false);
  const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);
  const [todasReservas, setTodasReservas] = useState([]);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

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

  const carregarReservas = async () => {
    try {
      const dados = await buscarReservas();
      setTodasReservas(dados || []);
    } catch (erro) {
      console.error("Erro ao carregar reservas:", erro);
    }
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  const verificarConflitoDeReserva = () => {
    const novaEntrada = new Date(dataCheckin);
    const novaSaida = new Date(dataCheckout);

    return todasReservas.some((reserva) => {
      if (reserva.quarto !== quarto) return false;

      const checkinExistente = new Date(reserva.data_checkin);
      const checkoutExistente = new Date(reserva.data_checkout);

      return (
        (novaEntrada >= checkinExistente && novaEntrada < checkoutExistente) ||
        (novaSaida > checkinExistente && novaSaida <= checkoutExistente) ||
        (novaEntrada <= checkinExistente && novaSaida >= checkoutExistente)
      );
    });
  };

  const salvarReserva = async () => {
    if (!quarto) {
      Toast.show({ type: 'error', text1: 'Selecione um quarto', position: 'bottom' });
      return;
    }

    if (dataCheckin < hoje) {
      Toast.show({ type: 'error', text1: 'Data inválida', text2: 'Check-in no passado.', position: 'bottom' });
      return;
    }

    if (dataCheckout <= dataCheckin) {
      Toast.show({ type: 'error', text1: 'Datas inválidas', text2: 'Check-out após check-in.', position: 'bottom' });
      return;
    }

    if (verificarConflitoDeReserva()) {
      Toast.show({ type: 'error', text1: 'Conflito de reserva', text2: 'Já existe uma reserva nesse período.', position: 'bottom' });
      return;
    }

    try {
      await criarReserva({
        nome: userData?.nome || '',
        email: userData?.email || '',
        data_checkin: converterParaAmericano(dataCheckin),
        data_checkout: converterParaAmericano(dataCheckout),
        quarto: quarto
      });

      Toast.show({ type: 'success', text1: 'Reserva criada com sucesso!', position: 'bottom' });

      setDataCheckin(new Date());
      setDataCheckout(new Date());
      setQuarto('');
      carregarReservas();
    } catch (erro) {
      Toast.show({ type: 'error', text1: 'Erro ao criar reserva', text2: 'Tente novamente.', position: 'bottom' });
      console.error('Erro ao salvar reserva:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Reserva</Text>

      {/* Check-in */}
      <TouchableOpacity style={styles.input} onPress={() => setShowCheckinPicker(true)}>
        <Text style={{ color: '#000' }}>{formatarData(dataCheckin)}</Text>
      </TouchableOpacity>
      {showCheckinPicker && (
        <DateTimePicker
          value={dataCheckin}
          mode="date"
          minimumDate={hoje}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowCheckinPicker(false);
            if (selectedDate && selectedDate >= hoje) setDataCheckin(selectedDate);
          }}
        />
      )}

      {/* Check-out */}
      <TouchableOpacity style={styles.input} onPress={() => setShowCheckoutPicker(true)}>
        <Text style={{ color: '#000' }}>{formatarData(dataCheckout)}</Text>
      </TouchableOpacity>
      {showCheckoutPicker && (
        <DateTimePicker
          value={dataCheckout}
          mode="date"
          minimumDate={dataCheckin}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowCheckoutPicker(false);
            if (selectedDate && selectedDate > dataCheckin) setDataCheckout(selectedDate);
          }}
        />
      )}

      {/* Quarto */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo de Quarto:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={quarto}
            onValueChange={(itemValue) => setQuarto(itemValue)}
            style={styles.picker}
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
