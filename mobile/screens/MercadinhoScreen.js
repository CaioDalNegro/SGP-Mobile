import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ESP32_IP = 'http://10.110.12.93';

const produtos = [
  { nome: 'Água Mineral', rota: 'agua', preco: 2.5, imagem: require('../assets/image/produtos/agua.png') },
  { nome: 'Refrigerante', rota: 'refrigerante', preco: 5.0, imagem: require('../assets/image/produtos/refrigerante.png') },
  { nome: 'Chocolate', rota: 'chocolate', preco: 3.0, imagem: require('../assets/image/produtos/chocolate.png') },
  { nome: 'Biscoito', rota: 'biscoito', preco: 2.0, imagem: require('../assets/image/produtos/biscoito.png') },
  { nome: 'Pipoca', rota: 'pipoca', preco: 4.0, imagem: require('../assets/image/produtos/pipoca.png') },
];

const SENHA_CORRETA = '1234';

export default function Mercadinho() {
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [senha, setSenha] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setAcessoLiberado(false);
      setSenha('');
      setCarrinho([]);
      setQuantidades({});
    }, [])
  );

  const enviarComando = async (rota, mensagemSucesso) => {
    try {
      const response = await fetch(`${ESP32_IP}/${rota}`);
      const texto = await response.text();
      Alert.alert(mensagemSucesso, texto);
    } catch (error) {
      Alert.alert('Erro', 'ESP32 não encontrado.');
    }
  };

  const validarSenha = async () => {
    if (senha === SENHA_CORRETA) {
      setAcessoLiberado(true);
      await enviarComando('abrir', 'Mercado aberto!');
      setSenha('');
    } else {
      Alert.alert('Senha incorreta', 'Tente novamente.');
      setSenha('');
    }
  };

  const cancelarSenha = () => {
    navigation.goBack();
  };

  const sairDoMercado = async () => {
    await enviarComando('fechar', 'Mercado fechado.');
    setAcessoLiberado(false);
    setCarrinho([]);
    setQuantidades({});
  };

  const adicionarAoCarrinho = (produto) => {
    const qtd = parseInt(quantidades[produto.rota], 10) || 0;
    if (qtd <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida.');
      return;
    }

    const itemExistente = carrinho.find(item => item.rota === produto.rota);
    let novoCarrinho;

    if (itemExistente) {
      novoCarrinho = carrinho.map(item =>
        item.rota === produto.rota
          ? { ...item, quantidade: item.quantidade + qtd }
          : item
      );
    } else {
      novoCarrinho = [...carrinho, { ...produto, quantidade: qtd }];
    }

    setCarrinho(novoCarrinho);
    setQuantidades(prev => ({ ...prev, [produto.rota]: '' }));
    Alert.alert('Adicionado', `${qtd}x ${produto.nome} adicionado(s) ao carrinho.`);
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.quantidade * item.preco, 0).toFixed(2);
  };

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar.');
      return;
    }

    const detalhes = carrinho.map(item => `${item.quantidade}x ${item.nome}`).join(', ');
    const total = calcularTotal();

    try {
      const response = await fetch(`${ESP32_IP}/compraFinalizada`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itens: carrinho, total }),
      });

      if (response.ok) {
        Alert.alert(
          'Pedido Concluído',
          `Seu pedido foi finalizado com sucesso!\n\nItens: ${detalhes}\nTotal: R$ ${total}\n\n✅ O valor será adicionado à conta do quarto.`
        );
        setCarrinho([]);
        setQuantidades({});
      } else {
        Alert.alert('Erro', 'Erro ao finalizar pedido no servidor.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível finalizar a compra.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!acessoLiberado && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.overlayContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>🔐 Digite a senha</Text>
            <TextInput
              style={styles.inputSenha}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={validarSenha}
              autoFocus
            />

            <View style={styles.botaoLinha}>
              <TouchableOpacity style={[styles.botao, { flex: 1, marginRight: 10 }]} onPress={validarSenha}>
                <Text style={styles.botaoTexto}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.botaoCancelar, { flex: 1 }]} onPress={cancelarSenha}>
                <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {acessoLiberado && (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>🛒 Mercadinho 24H</Text>

          <TouchableOpacity style={[styles.botao, styles.botaoSair]} onPress={sairDoMercado}>
            <Text style={styles.botaoTexto}>Sair do Mercado</Text>
          </TouchableOpacity>

          <Text style={styles.subtitulo}>Produtos:</Text>
          {produtos.map((produto, index) => (
            <View key={index} style={styles.cardProduto}>
              <Image source={produto.imagem} style={styles.imagemProduto} />
              <Text style={styles.nomeProduto}>{produto.nome}</Text>
              <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
              <View style={styles.linhaProduto}>
                <TextInput
                  style={styles.inputQtd}
                  keyboardType="numeric"
                  placeholder="Qtd"
                  value={quantidades[produto.rota] || ''}
                  onChangeText={text =>
                    setQuantidades(prev => ({ ...prev, [produto.rota]: text }))
                  }
                />
                <TouchableOpacity
                  style={styles.botaoPequeno}
                  onPress={() => adicionarAoCarrinho(produto)}
                >
                  <Text style={styles.botaoTexto}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.subtitulo}>Carrinho:</Text>
          {carrinho.length === 0 ? (
            <Text style={styles.vazio}>🧺 Seu carrinho está vazio.</Text>
          ) : (
            carrinho.map((item, i) => (
              <Text key={i} style={styles.carrinhoItem}>
                {item.quantidade}x {item.nome} = R$ {(item.quantidade * item.preco).toFixed(2)}
              </Text>
            ))
          )}

          <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>

          <TouchableOpacity style={[styles.botao, styles.botaoFinalizar]} onPress={finalizarCompra}>
            <Text style={styles.botaoTexto}>Finalizar Compra</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2f3640',
  },
  subtitulo: {
    fontSize: 20,
    marginVertical: 12,
    fontWeight: '600',
    color: '#353b48',
  },
  cardProduto: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    alignItems: 'center',
  },
  imagemProduto: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  preco: {
    fontSize: 16,
    marginBottom: 8,
    color: '#636e72',
  },
  linhaProduto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputQtd: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 70,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  botaoPequeno: {
    backgroundColor: '#44bd32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  botaoSair: {
    backgroundColor: '#e84118',
    marginBottom: 25,
  },
  botaoFinalizar: {
    backgroundColor: '#273c75',
    marginTop: 20,
    marginBottom: 40,
  },
  carrinhoItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#192a56',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
    color: '#2d3436',
  },
  vazio: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7f8fa6',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '80%',
    padding: 12,
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  botaoLinha: {
    flexDirection: 'row',
    marginTop: 25,
    width: '80%',
    justifyContent: 'center',
  },
  botao: {
    backgroundColor: '#44bd32',
    paddingVertical: 12,
    borderRadius: 10,
  },
  botaoCancelar: {
    backgroundColor: '#e84118',
    paddingVertical: 12,
    borderRadius: 10,
  },
  botaoCancelarTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});