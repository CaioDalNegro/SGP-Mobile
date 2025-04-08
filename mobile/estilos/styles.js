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
  },
  icon: {

    position: "absolute",
    top: 10, // Distância do topo
    right: 10, // Distância da direita
    padding: 8,
    borderRadius: 20,
  },
  voltarBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: 100,
  },
  
  voltarTexto: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333'
  },
  loginScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  
  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  
  icon: {
    marginRight: 5,
  },
  
  eyeIcon: {
    padding: 4,
  },
  
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  
  bottomText: {
    fontSize: 14,
    color: '#999',
  },  
});

export default styles;
