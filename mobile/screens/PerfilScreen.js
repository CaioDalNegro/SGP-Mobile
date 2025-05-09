import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function PerfilScreen({ navigation }) {
  const { userData } = useContext(UserContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.email) {
      axios
        .get(`http://10.110.12.57:1880/reservas?email=${userData.email}`)
        .then((res) => {
          setReservas(res.data || []);
        })
        .catch((err) => {
          console.error("Erro ao buscar reservas:", err);
          setReservas([]);
        })
        .finally(() => setLoading(false));
    }
  }, [userData?.email]);

  // Função para formatar data no formato brasileiro (DD/MM/AAAA)
  const formatarData = (data) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(data).toLocaleDateString("pt-BR", options);
  };

  if (!userData) return null;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#3BA7C9", "#58B4B0"]} style={styles.header}>
        <View style={styles.curvedShape} />
        <Image source={require("../assets/image/profile.png")} style={styles.avatar} />
        <Text style={styles.name}>{userData.nome}</Text>
        <Text style={{ color: "#fff", fontSize: 14 }}>{userData.email}</Text>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Minhas Reservas:</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#3BA7C9" />
        ) : reservas.length > 0 ? (
          reservas.map((reserva, index) => (
            <Text key={index} style={{ marginBottom: 5 }}>
              • {reserva.quarto} - {formatarData(reserva.data_checkin)} até {formatarData(reserva.data_checkout)}
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
