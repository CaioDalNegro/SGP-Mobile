// screens/FavoriteScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  // Confirmar remoção do favorito
  function handleRemove(item) {
    Alert.alert(
      "Remover Favorito",
      `Deseja remover "${item.name}" dos seus favoritos?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => removeFavorite(item.id) },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={favorites.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum favorito ainda!</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Description", { place: item })}
          >
            <View style={styles.imageContainer}>
              {item.image && (
                <Image source={item.image} style={styles.image} resizeMode="cover" />
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.location} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleRemove(item)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="heart"
                size={28}
                color="#e74c3c"
                style={styles.iconHeart}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9f4",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3a3a3a",
    marginBottom: 22,
    textAlign: "center",
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,

    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Sombra Android
    elevation: 8,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    width: 100,
    height: 100,
    marginRight: 20,
    backgroundColor: "#f1f1f1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 6,
  },
  location: {
    fontSize: 16,
    color: "#888",
  },
  iconButton: {
    marginLeft: 12,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  iconHeart: {
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#bbb",
  },
});
