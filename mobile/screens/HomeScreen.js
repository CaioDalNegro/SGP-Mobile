// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../estilos/stylesHome";
import { useFavorites } from "../context/FavoritesContext";

const places = [
  {
    id: "1",
    name: "Domo",
    location: "Laguna-SC",
    // se tiver imagem local, descomente:
    image: require("../assets/image/domo/domo_noite.jpg"),
  },
  {
    id: "2",
    name: "Charrua (Bus)",
    location: "Laguna-SC",
    image: require("../assets/image/charrua (bus)/bus_main.jpg"),
  },
  {
    id: "3",
    name: "Suíte com cozinha",
    location: "Laguna-SC",
    image: require("../assets/image/suite com cozinha/suite_main.jpg"),
  },
];

export default function HomeScreen({ navigation }) {
  const [footerVisible, setFooterVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleScroll = (e) => {
    const { contentSize, contentOffset, layoutMeasurement } = e.nativeEvent;
    setFooterVisible(
      contentSize.height - contentOffset.y <= layoutMeasurement.height + 20
    );
  };

  const handleSearch = () => {
    const filtered = places.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  const handleToggleFavorite = (item) => {
    isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDE6DA" }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Seu refúgio perfeito a{" "}
            <Text style={styles.boldText}>um clique</Text> de distância!
          </Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor="white"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* List of Places */}
      <FlatList
        style={{ flex: 1 }}
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>Nossas hospedagens</Text>
        )}
        ListFooterComponent={() =>
          footerVisible && (
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2025 Seu App. Todos os direitos reservados.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => {
          const favorited = isFavorite(item.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Description", { place: item })
              }
            >
              <View style={styles.imageContainer}>
                {item.image ? (
                  <Image source={item.image} style={styles.image} />
                ) : (
                  <View
                    style={[
                      styles.image,
                      { backgroundColor: "#e0e0e0", justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Ionicons name="image-outline" size={40} color="#aaa" />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => handleToggleFavorite(item)}
                >
                  <Ionicons
                    name={favorited ? "heart" : "heart-outline"}
                    size={28}
                    color={favorited ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
