// Configurações do Player e Obstáculos
let vidas = 5; // Jogador inicia com 5 vidas
let velocidadeCarro = 2; // Valor reduzido para deixar os carros mais lentos (ex: era 5, passou para 2)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const elementoVidas = document.getElementById('vidas');

// Atualiza o painel HTML de vidas
function atualizarHUD() {
  elementoVidas.textContent = vidas;
}

// Exemplo de loop do jogo aplicando a movimentação mais lenta
function moverCarros(carros) {
  carros.forEach(carro => {
    carro.y += velocidadeCarro; // Incremento menor = movimento mais lento
  });
}

// Executa ao carregar
atualizarHUD();
