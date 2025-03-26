import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#4CA69A", 
    padding: 40, 
    borderBottomRightRadius: 45
  },
  headerTop: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  headerText: {
    color: "white", 
    fontSize: 20, 
    fontFamily: "Raleway",  
    marginTop: 80, 
    marginBottom: 20
  },
  boldText: {
    fontWeight: "900"
  },
  
  // Estilização da caixa de pesquisa
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center",
    marginTop: 10,
  },
  searchBox: { 
    flex: 1,
    borderWidth: 1, 
    borderColor: "white", 
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchInput: { 
    color: "white"
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
  
  // Seção de hospedagens
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginLeft: 40,
    padding: 10,
  },
  card: {
    margin: 8,
    marginLeft: 40,
    width: 300,  // Ajuste a largura do card
  },
  image: {
    width: "100%",  // Faz a imagem ocupar toda a largura do card
    height: 200,  // Ajuste a altura da imagem conforme necessário
    borderRadius: 8,
    backgroundColor: "gray"
  },
  cardTitle: {
    fontSize: 14, 
    fontWeight: "bold"
  },
  cardSubtitle: {
    fontSize: 12, 
    color: "#666"
  },
  // Estilo do Rodapé
  footer: {
    backgroundColor: "#4CA69A", 
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,  // Ocupa o restante do espaço disponível
  }
});

export default styles;
