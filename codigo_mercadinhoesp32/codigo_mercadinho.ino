#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "linksys";
const char* password = "";

WebServer server(80);

// Pinos dos LEDs
const int ledMercadoAberto = 18; // LED Verde
const int ledCompra = 19;        // LED Azul

// Função para adicionar cabeçalhos CORS
void adicionarCORS() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "*");
}

// Rota para pré-verificação CORS
void handleOptions() {
  adicionarCORS();
  server.send(204); // Resposta vazia com sucesso
}

void handleAbrirMercado() {
  digitalWrite(ledMercadoAberto, HIGH);
  Serial.println("Mercado aberto!");
  adicionarCORS();
  server.send(200, "text/plain", "Mercado aberto!");
}

void handleFecharMercado() {
  digitalWrite(ledMercadoAberto, LOW);
  Serial.println("Mercado fechado.");
  adicionarCORS();
  server.send(200, "text/plain", "Mercado fechado.");
}

void handleComprarProduto() {
  String produto = server.arg("produto");
  Serial.println("Produto comprado: " + produto);

  digitalWrite(ledCompra, HIGH);
  delay(1000);
  digitalWrite(ledCompra, LOW);

  adicionarCORS();
  server.send(200, "text/plain", "Compra confirmada: " + produto);
}

void handleCompraFinalizada() {
  Serial.println("Compra finalizada!");

  // Pisca o LED azul 3 vezes como confirmação
  for (int i = 0; i < 3; i++) {
    digitalWrite(ledCompra, HIGH);
    delay(300);
    digitalWrite(ledCompra, LOW);
    delay(300);
  }

  adicionarCORS();
  server.send(200, "text/plain", "Compra final recebida.");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  pinMode(ledMercadoAberto, OUTPUT);
  pinMode(ledCompra, OUTPUT);
  digitalWrite(ledMercadoAberto, LOW);
  digitalWrite(ledCompra, LOW);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado no IP: ");
  Serial.println(WiFi.localIP());

  // Rotas
  server.on("/abrir", HTTP_GET, handleAbrirMercado);
  server.on("/fechar", HTTP_GET, handleFecharMercado);
  server.on("/comprar", HTTP_GET, handleComprarProduto);
  server.on("/compraFinalizada", HTTP_POST, handleCompraFinalizada);

  // Rotas OPTIONS (CORS preflight)
  server.on("/abrir", HTTP_OPTIONS, handleOptions);
  server.on("/fechar", HTTP_OPTIONS, handleOptions);
  server.on("/comprar", HTTP_OPTIONS, handleOptions);
  server.on("/compraFinalizada", HTTP_OPTIONS, handleOptions);

  server.begin();
}

void loop() {
  server.handleClient();
}