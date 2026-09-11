const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const elementoVidas = document.getElementById('vidas');

// Configurações do jogo
let vidas = 5; // Inicia com 5 vidas
let velocidadeCarro = 2; // Velocidade reduzida para carros mais lentos
let gameOver = false;

// Configurações do jogador
const jogador = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 70,
  largura: 40,
  altura: 60,
  velocidade: 5,
  cor: '#3498db'
};

// Controle de teclas
const teclas = {};

window.addEventListener('keydown', (e) => {
  teclas[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  teclas[e.key] = false;
});

// Atualiza o contador no HTML
function atualizarHUD() {
  elementoVidas.textContent = vidas;
}

// Gerenciamento dos carros inimigos
const carros = [];
let tempoUltimoCarro = 0;
const intervaloGeracao = 1200; // Tempo em ms entre a aparição de cada carro

function criarCarro() {
  const largura = 40;
  const altura = 60;
  const x = Math.random() * (canvas.width - largura);
  carros.push({ x, y: -altura, largura, altura, cor: '#e74c3c' });
}

// Movimentação do jogador
function atualizarJogador() {
  if ((teclas['ArrowLeft'] || teclas['a']) && jogador.x > 0) {
    jogador.x -= jogador.velocidade;
  }
  if ((teclas['ArrowRight'] || teclas['d']) && jogador.x + jogador.largura < canvas.width) {
    jogador.x += jogador.velocidade;
  }
}

// Movimentação dos carros e verificação de colisões
function atualizarCarros() {
  for (let i = carros.length - 1; i >= 0; i--) {
    const carro = carros[i];
    
    // Movimento lento do carro
    carro.y += velocidadeCarro;

    // Checagem de colisão simples (AABB)
    if (
      jogador.x < carro.x + carro.largura &&
      jogador.x + jogador.largura > carro.x &&
      jogador.y < carro.y + carro.altura &&
      jogador.y + jogador.altura > carro.y
    ) {
      vidas--;
      atualizarHUD();
      carros.splice(i, 1); // Remove o carro atingido

      if (vidas <= 0) {
        gameOver = true;
      }
      continue;
    }

    // Remove carros que saíram da tela por baixo
    if (carro.y > canvas.height) {
      carros.splice(i, 1);
    }
  }
}

// Renderização gráfica
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o jogador
  ctx.fillStyle = jogador.cor;
  ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);

  // Desenha os carros
  carros.forEach((carro) => {
    ctx.fillStyle = carro.cor;
    ctx.fillRect(carro.x, carro.y, carro.largura, carro.altura);
  });

  // Mensagem de Game Over
  if (gameOver) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  }
}

// Loop principal
function loop(tempoAtual) {
  if (!gameOver) {
    if (tempoAtual - tempoUltimoCarro > intervaloGeracao) {
      criarCarro();
      tempoUltimoCarro = tempoAtual;
    }

    atualizarJogador();
    atualizarCarros();
    desenhar();

    requestAnimationFrame(loop);
  } else {
    desenhar();
  }
}

// Início do jogo
atualizarHUD();
requestAnimationFrame(loop);
