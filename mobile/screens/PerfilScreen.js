import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function PerfilScreen({ navigation }) {
  const user = {
    name: "Caio Dal Negro",
    photo: require("../assets/image/profile.png"), // coloque sua imagem aqui
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#3BA7C9", "#58B4B0"]}
        style={styles.header}
      >
        <View style={styles.curvedShape} />
        <Image source={user.photo} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </LinearGradient>

      <View style={styles.body}>
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
