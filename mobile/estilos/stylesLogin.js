import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#EDE6DA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  loginBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },

  loginSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },

  loginButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingIndicator: {
    marginTop: 10,
  },
  linkText: {
    marginTop: 15,
    color: '#007AFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
