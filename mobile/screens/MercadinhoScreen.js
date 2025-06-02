import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';

const ESP32_IP = 'http://10.110.12.93';

const produtos = [
  { nome: 'Água Mineral', rota: 'agua', preco: 2.50, imagem: require('../assets/image/produtos/agua.png') },
  { nome: 'Refrigerante', rota: 'refrigerante', preco: 5.00, imagem: require('../assets/image/produtos/refrigerante.png') },
  { nome: 'Chocolate', rota: 'chocolate', preco: 3.00, imagem: require('../assets/image/produtos/chocolate.png') },
  { nome: 'Biscoito', rota: 'biscoito', preco: 2.00, imagem: require('../assets/image/produtos/biscoito.png') },
  { nome: 'Pipoca', rota: 'pipoca', preco: 4.00, imagem: require('../assets/image/produtos/pipoca.png') },
];

const SENHA_CORRETA = '1234';

export default function Mercadinho() {
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [carrinho, setCarrinho] = useState([]);
  const [quantidades, setQuantidades] = useState({});

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
      setModalVisible(false);
      setAcessoLiberado(true);
      await enviarComando('abrir', 'Mercado aberto!');
      setSenha('');
    } else {
      Alert.alert('Senha incorreta', 'Tente novamente.');
      setSenha('');
    }
  };

  const sairDoMercado = async () => {
    await enviarComando('fechar', 'Mercado fechado.');
    setAcessoLiberado(false);
    setCarrinho([]);
    setQuantidades({});
    setModalVisible(true);
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
    <View style={{ flex: 1 }}>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>🔐 Digite a senha</Text>
            <TextInput
              style={styles.inputSenha}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.botao} onPress={validarSenha}>
              <Text style={styles.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {acessoLiberado && (
        <ScrollView contentContainerStyle={styles.container}>
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
    </View>
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
    gap: 10, // No Android, gap não funciona, pode substituir por marginRight no input
  },
  inputQtd: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 80,
    borderRadius: 8,
    marginRight: 10,
    textAlign: 'center',
  },
  botaoPequeno: {
    backgroundColor: '#00a8ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: '#273c75',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botaoFinalizar: {
    backgroundColor: '#44bd32',
  },
  botaoSair: {
    backgroundColor: '#e84118',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  carrinhoItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  vazio: {
    fontStyle: 'italic',
    color: '#888',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
    color: '#2d3436',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
    elevation: 10,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    width: '100%',
    marginBottom: 20,
    fontSize: 18,
    borderRadius: 10,
    textAlign: 'center',
  },
});
