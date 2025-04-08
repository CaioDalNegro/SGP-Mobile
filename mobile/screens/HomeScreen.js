import React, { useState } from "react";
import {
  View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../estilos/styles"; // Ajuste o caminho se necessário

const places = [
  { id: "1", name: "Domo", location: "Laguna-SC", image: require("../assets/image/domo_1.jpeg") },
  { id: "2", name: "Charrua (Bus)", location: "Laguna-SC", image: require("../assets/image/bus_1.jpeg") },
  { id: "3", name: "Suíte com cozinha", location: "Laguna-SC", image: require("../assets/image/Suite.jpg") }
];

export default function HomeScreen({ navigation }) {
  const [footerVisible, setFooterVisible] = useState(false);

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    setFooterVisible(contentHeight - contentOffsetY <= layoutHeight);
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBotao}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

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
        scrollEventThrottle={16}
      >
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Ionicons name="heart" size={24} style={styles.icon} />
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
