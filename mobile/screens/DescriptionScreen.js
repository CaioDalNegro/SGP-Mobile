// screens/DescriptionScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DescriptionScreen({ route, navigation }) {
  const { place } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Imagem e informações */}
      <Image source={place.image} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.description}>
        Aqui vai uma descrição completa da pousada "{place.name}". Você pode incluir
        comodidades, localização, avaliações, etc.
      </Text>

      {/* Botão de Reservar */}
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => navigation.navigate("Main", {
            screen: "Reservas",
            params: { place },
          })
        }
      >
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 40, // Deixa espaço para o botão
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 24,
  },
  reserveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
