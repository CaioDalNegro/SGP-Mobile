// screens/DescriptionScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DescriptionScreen({ route, navigation }) {
  const { place } = route.params;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Botão voltar fixo */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>

      {/* View que envolve todo o conteúdo rolável */}
      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageWrapper}>
            <Image source={place.image} style={styles.image} resizeMode="cover" />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.title}>{place.name}</Text>

            <View style={styles.rowCenter}>
              <Ionicons name="location-sharp" size={18} color="#777" />
              <Text style={styles.location}>{place.location}</Text>
            </View>

            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={20}
                  color={i <= (place.rating || 4) ? "#FFC107" : "#DDD"}
                  style={{ marginRight: 4 }}
                />
              ))}
              <Text style={styles.ratingText}>{(place.rating || 4).toFixed(1)}</Text>
            </View>

            <Text style={styles.description}>
              {place.description ||
                `Desfrute do conforto da pousada "${place.name}" com comodidades exclusivas, atendimento acolhedor e uma localização privilegiada. Perfeita para sua estadia relaxante.`}
            </Text>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Comodidades</Text>
            <View style={styles.amenitiesList}>
              <Amenity icon="wifi" label="Wi-Fi" />
              <Amenity icon="car" label="Estacionamento" />
              <Amenity icon="restaurant" label="Café da manhã" />
              <Amenity icon="bed" label="Camas confortáveis" />
              <Amenity icon="airplane" label="Transfer Aeroporto" />
              <Amenity icon="tv" label="TV a cabo" />
            </View>
          </View>

          {/* Botão Reserva com estilo original */}
          <TouchableOpacity
            style={styles.reserveButtonOriginal}
            onPress={() =>
              navigation.navigate("Main", {
                screen: "Reservas",
                params: { place },
              })
            }
            activeOpacity={0.85}
          >
            <Text style={styles.reserveButtonTextOriginal}>Reservar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const Amenity = ({ icon, label }) => (
  <View style={styles.amenityItem}>
    <Ionicons name={icon} size={22} color="#4CAF50" />
    <Text style={styles.amenityLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 20,
    zIndex: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  contentWrapper: {
    flex: 1,
    marginTop: 0,
  },
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 7,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoSection: {
    width: "100%",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    textAlign: "justify",
  },
  amenitiesSection: {
    width: "100%",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 16,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    marginBottom: 12,
  },
  amenityLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },

  // Estilo original do botão reserva
  reserveButtonOriginal: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  reserveButtonTextOriginal: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
