import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Dados de exemplo de locais de hospedagem e tours virtuais
const places = [
  { id: "1", name: "Nome da pousada", location: "Jakarta, Indonesia", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Nome da pousada", location: "Jakarta, Indonesia", image: "https://via.placeholder.com/150" },
];

const virtualTours = [
  { id: "1", name: "Emerald Hotel", location: "Jakarta, Indonesia", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Fransissco Hotel", location: "Jakarta, Indonesia", image: "https://via.placeholder.com/150" },
];

// Componente principal da tela inicial
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {/* Texto e ícone de notificação */}
          <Text style={styles.headerText}>Seu refúgio perfeito a <Text style={styles.boldText}>um clique</Text> de distância!</Text>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
        {/* Caixa de pesquisa */}
        <View style={styles.searchBox}>
          <TextInput placeholder="Pesquisar" style={styles.searchInput} />
          <Ionicons name="search" size={20} color="gray" />
        </View>
      </View>
      
      {/* Seção de hospedagens */}
      <Text style={styles.sectionTitle}>Nossas hospedagens</Text>
      <FlatList
        horizontal
        data={places} // A lista de locais de hospedagem é passada como dados
        keyExtractor={(item) => item.id} // A chave única para cada item
        renderItem={({ item }) => (
          // Renderiza um cartão para cada lugar
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", padding: 16 }, // Estilo da tela principal
  header: { backgroundColor: "#4caf50", padding: 16, borderRadius: 16}, // Estilo do cabeçalho
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, // Alinha texto e ícone
  headerText: { color: "white", fontSize: 20, fontWeight: "regular", fontFamily: "Raleway" }, // Estilo do texto do cabeçalho
  boldText: { fontWeight: "900" }, // Estilo do texto em negrito
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, borderRadius: 12, marginTop: 10 }, // Caixa de pesquisa
  searchInput: { flex: 1, color: "#333" }, // Estilo do campo de texto
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 }, // Título da seção
  card: { margin: 8 }, // Estilo do cartão de hospedagem
  image: { width: 128, height: 80, borderRadius: 8 }, // Estilo da imagem no cartão
  cardTitle: { fontSize: 14, fontWeight: "bold" }, // Título do cartão
  cardSubtitle: { fontSize: 12, color: "#666" }, // Subtítulo do cartão
});
