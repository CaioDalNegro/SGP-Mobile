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

const places = [
  {
    id: "1",
    name: "Domo",
    location: "Laguna-SC",
    /*image: require("/"),*/
  },
  {
    id: "2",
    name: "Charrua (Bus)",
    location: "Laguna-SC",
    /*image: require("/"),*/
  },
  {
    id: "3",
    name: "Suíte com cozinha",
    location: "Laguna-SC",
    /*image: require("/"),*/
  },
];

export default function HomeScreen({ navigation }) {
  const [footerVisible, setFooterVisible] = useState(false);

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    setFooterVisible(contentHeight - contentOffsetY <= layoutHeight + 20);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerText}>
            Seu refúgio perfeito a <Text style={styles.boldText}>um clique</Text> de distância!
          </Text>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

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

      <FlatList
        style={{ flex: 1 }}
        data={places}
        keyExtractor={(item) => item.id}
        numColumns={1}
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Description", { place: item })}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Ionicons name="heart" size={24} style={styles.icon} />
            </View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
