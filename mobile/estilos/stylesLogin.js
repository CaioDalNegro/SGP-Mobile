import { StyleSheet } from "react-native";

const stylesLogin = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
                 
  loginBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    backgroundColor: "#007AFF",
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
    color: "#999",
    textAlign: "center",
  },
});

export default stylesLogin;
