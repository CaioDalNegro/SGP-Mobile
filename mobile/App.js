import React from "react";
import { 
  View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Dados de exemplo de locais de hospedagem e tours virtuais
const places = [
  { id: "1", name: "Domo", location: "Laguna-SC", image: "./assets/image/domo_1.jpeg" },
  { id: "2", name: "Charrua (Bus)", location: "Laguna-SC", image: "./assets/image/bus_1.jpeg" },
];

// Componente principal da tela inicial
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>
            Seu refúgio perfeito a <Text style={styles.boldText}>um clique</Text> de distância!
          </Text>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
        
        {/* Caixa de pesquisa */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TextInput 
              placeholder="Pesquisar" 
              placeholderTextColor="white" 
              style={styles.searchInput} 
            />
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Seção de hospedagens */}
      <Text style={styles.sectionTitle}>Nossas hospedagens</Text>
      <FlatList
        horizontal
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
  container: {
    flex: 1, 
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#4CA69A", 
    padding: 40, 
    borderBottomRightRadius: 45
  },
  headerTop: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  headerText: {
    color: "white", 
    fontSize: 20, 
    fontWeight: "regular", 
    fontFamily: "Raleway",  
    marginTop: 80, 
    marginBottom: 20
  },
  boldText: {
    fontWeight: "900"
  },
  
  // Estilização da caixa de pesquisa
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    marginTop: 10,
  },
  searchBox: { 
    flex: 1,
    borderWidth: 1, 
    borderColor: "white", 
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchInput: { 
    color: "white"
  },
  searchButton: { 
    width: 48, 
    height: 48, 
    backgroundColor: "#2194FF", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 8,
  },
  
  // Seção de hospedagens
  sectionTitle: {
    fontSize: 18, 
    fontWeight: "bold", 
    //marginTop: 20,
    marginLeft:40,
    padding: 10,
  },
  card: {
    margin: 8,
    marginLeft:40,
  },
  image: {
    width: 128, 
    height: 80, 
    borderRadius: 8,
    backgroundColor: "gray"
  },
  cardTitle: {
    fontSize: 14, 
    fontWeight: "bold"
  },
  cardSubtitle: {
    fontSize: 12, 
    color: "#666"
  }
});
