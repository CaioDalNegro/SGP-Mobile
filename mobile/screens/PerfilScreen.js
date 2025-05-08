import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../context/UserContext";

const { width } = Dimensions.get("window");

export default function PerfilScreen({ navigation }) {
  const { userData } = useContext(UserContext);

  if (!userData) return null; // ou um loading, caso o usuário não esteja definido ainda

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#3BA7C9", "#58B4B0"]} style={styles.header}>
        <View style={styles.curvedShape} />
        <Image source={require("../assets/image/profile.png")} style={styles.avatar} />
        <Text style={styles.name}>{userData.nome}</Text>
        <Text style={{ color: "#fff", fontSize: 14 }}>{userData.email}</Text>
      </LinearGradient>

      <View style={styles.body}>
        {/* Aqui você pode listar as reservas também */}
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Minhas Reservas:</Text>
        {userData.reservas?.length > 0 ? (
          userData.reservas.map((reserva, index) => (
            <Text key={index} style={{ marginBottom: 5 }}>
              • {reserva.quarto} - {reserva.dataCheckin} até {reserva.dataCheckout}
            </Text>
          ))
        ) : (
          <Text>Nenhuma reserva encontrada.</Text>
        )}

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="person-circle-outline" size={22} color="#3BA7C9" />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="settings-outline" size={22} color="#3BA7C9" />
          <Text style={styles.optionText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, styles.logout]}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-out-outline" size={22} color="#e74c3c" />
          <Text style={[styles.optionText, { color: "#e74c3c" }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5fffb" },
  header: {
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 8,
    backgroundColor: "#eee",
    zIndex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    zIndex: 1,
  },
  body: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  logout: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
});