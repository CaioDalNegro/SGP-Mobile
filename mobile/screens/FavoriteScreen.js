import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const favoritePlaces = [
  {
    id: "1",
    name: "Domo",
    location: "Laguna-SC",
    image: require("../assets/image/domo_1.jpeg"),
  },
  {
    id: "2",
    name: "Charrua (Bus)",
    location: "Laguna-SC",
    image: require("../assets/image/bus_1.jpeg"),
  },
];

export default function FavoriteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>

      <FlatList
        data={favoritePlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <Ionicons name="heart" size={24} color="#e74c3c" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum favorito ainda!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#aaa",
  },
});
