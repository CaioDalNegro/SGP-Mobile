import { StyleSheet } from "react-native";

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente
  },
  header: {
    backgroundColor: "#4CA69A",
    padding: 40,
    borderBottomRightRadius: 45,
    width: "100%",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#388E3C",
    width: "100%",
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginHorizontal: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 280,
  },
  searchInput: {
    color: "white",
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: "#2194FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  card: {
    margin: 8,
    width: 300,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "gray",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#4CA69A",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  footerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
});

export default stylesHome;
