import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MercadinhoScreen() {
  const [status, setStatus] = useState("Aguardando interação...");

  // Função para acionar o LED no ESP32
  const acionarLED = async (cor) => {
    try {
      const res = await fetch("http://10.110.12.99/led", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: cor })  // Envia o tipo de cor como JSON
      });

      if (res.ok) {
        const json = await res.json();
        setStatus(json.status);  // Atualiza o status com a resposta do ESP32
      } else {
        setStatus("Erro ao acionar a ação.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Falha na comunicação com ESP32.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mercadinho do Condomínio</Text>

      {/* Botão para acionar o LED verde (Finalizar Pedido) */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#34D399" }]}  // Verde
        onPress={() => acionarLED("verde")}
      >
        <Text style={styles.buttonText}>Finalizar Pedido ✅</Text>
      </TouchableOpacity>

      {/* Botão para acionar o LED azul (Confirmar Pedido) */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#60A5FA" }]}  // Azul
        onPress={() => acionarLED("azul")}
      >
        <Text style={styles.buttonText}>Confirmar Pedido 📦</Text>
      </TouchableOpacity>

      {/* Exibe o status após a interação */}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

// Estilos para a tela Mercadinho
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9FAFB"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center"
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  status: {
    marginTop: 30,
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center"
  }
});
