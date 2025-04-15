import { StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#EDE6DA",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
                 
  loginBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#EDE6DA",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.1,
    shadowRadius: 5,
    elevation: 5,
    opacity: 100,
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  icon: {
    marginRight: 5,
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  bottomText: {
    fontSize: 14,
    color: "#20b2aa ",
    textAlign: "center",
  },
});

export default stylesLogin;
