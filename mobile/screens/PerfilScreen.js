import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function PerfilScreen({ navigation }) {
  const { userData } = useContext(UserContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarReservas = () => {
    setLoading(true);
    axios
      .get(`http://10.110.12.61:1880/reservas?email=${userData.email}`)
      .then((res) => {
        setReservas(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar reservas:", err);
        setReservas([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userData?.email) {
      carregarReservas();
    }
  }, [userData?.email]);

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
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

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Minhas Reservas:</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#3BA7C9" />
        ) : reservas.length > 0 ? (
          reservas.map((reserva, index) => (
            <View key={index} style={styles.cardReserva}>
              <Text style={styles.cardTitulo}>{reserva.quarto}</Text>
              <Text style={styles.cardData}>
                {formatarData(reserva.data_checkin)} até {formatarData(reserva.data_checkout)}
              </Text>
            </View>
          ))
        ) : (
          <Text>Nenhuma reserva encontrada.</Text>
        )}

        <TouchableOpacity onPress={carregarReservas} style={styles.refreshButton}>
          <Ionicons name="refresh-outline" size={20} color="#3BA7C9" />
          <Text style={styles.optionText}>Atualizar Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, styles.logout]}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-out-outline" size={22} color="#e74c3c" />
          <Text style={[styles.optionText, { color: "#e74c3c" }]}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 100,
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
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
    cardReserva: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#3BA7C9",
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardData: {
    fontSize: 14,
    color: "#666",
  },

});
