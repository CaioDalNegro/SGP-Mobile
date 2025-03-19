import React, { useState } from "react";
import { 
  View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Dados de exemplo de locais de hospedagem e tours virtuais
const places = [
  { id: "1", name: "Domo", location: "Laguna-SC", image: "./assets/image/domo_1.jpeg" },
  { id: "2", name: "Charrua (Bus)", location: "Laguna-SC", image: "./assets/image/bus_1.jpeg" },
  { id: "3", name: "Suíte com cozinha", location: "Laguna-SC", image: "./assets/image/casa_praia.jpeg" },
  { id: "4", name: "Chalé família", location: "Laguna-SC", image: "./assets/image/cabana.jpeg" },
  { id: "5", name: "Cabana", location: "Laguna-SC", image: "./assets/image/suite.jpeg" },
  { id: "6", name: "Estacionamento para overlanders", location: "Laguna-SC", image: "./assets/image/chale.jpeg" },
];

// Componente principal da tela inicial
export default function HomeScreen() {
  const [footerVisible, setFooterVisible] = useState(false);

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Quando o usuário chega ao final da tela
    if (contentHeight - contentOffsetY <= layoutHeight) {
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
  };

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
      
      <ScrollView 
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}  // Para melhorar a performance do onScroll
      >
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          numColumns={1} // Define 2 colunas por linha
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Centralizando apenas a imagem */}
              <View style={styles.imageContainer}>
                <Image source= {item.image} style={styles.image} />
              </View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Rodapé */}
      {footerVisible && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Seu App. Todos os direitos reservados.</Text>
        </View>
      )}
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
    width: 300,  // Ajuste a largura do card
  },
  image: {
    width: '100%',  // Faz a imagem ocupar toda a largura do card
    height: 200,  // Ajuste a altura da imagem conforme necessário
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
  },
  // Estilo do Rodapé
  footer: {
    backgroundColor: "#4CA69A", 
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: "white",
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,  // Ocupa o restante do espaço disponível
  }
});
