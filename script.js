"use strict";
// Variáveis dos Botões
const botaoRollDice = document.querySelector(".btn--roll");
const botaoHold = document.querySelector(".btn--hold");
const botaoNewGame = document.querySelector(".btn--new");

// Variável da Imagem do Dado
const diceElement = document.querySelector(".dice");

// Variáveis dos Scores Players
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");

// Variaveis de estilização dos players
const player0ActiveOrNot = document.querySelector(".player--0");
const player1ActiveOrNot = document.querySelector(".player--1");

// Váriaveis
let scores, currentScore, activePlayer, playing;

// Função Novo Jogo
const newGame = () => {
  // Zera as váriaveis
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  // Habilita os botões
  playing = true;
  // Zera os números da tela
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  // Volta as classes para a condição original
  player0ActiveOrNot.classList.add("player--active");
  player0ActiveOrNot.classList.remove("player--winner");
  player1ActiveOrNot.classList.remove("player--winner");
};

// Função que zera e inicia o game
newGame();

// Função para mudar o jogador
const trocaPlayer = () => {
  // Zera o display interativamente
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Zera a váriavel
  currentScore = 0;
  // Faz a alteração de qual player está ativo
  activePlayer = activePlayer === 0 ? 1 : 0;
  //(Toggle) Se a classe especificada não está presente no elemento, ele a adiciona.
  //Se a classe especificada já está presente, ele a remove.
  player0ActiveOrNot.classList.toggle("player--active");
  player1ActiveOrNot.classList.toggle("player--active");
};

// Função Roll Dice
const jogarDado = () => {
  if (playing) {
    // Gera o valor de 1 à 6
    let dado = Math.trunc(Math.random() * 6) + 1;
    // Remove a classe Hidden da imagem do dado
    diceElement.classList.remove("hidden");
    // Muda o SRC dinamicamente
    diceElement.src = `img/dice-${dado}.png`;
    //  Condição
    if (dado !== 1) {
      // A váriavle vai acumulando o valor gerado pelo Dado
      currentScore += dado;
      // Mostra no display interativamente
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Chama a função para trocar o player
      trocaPlayer();
    }
  }
};

const hold = () => {
  if (playing) {
    // Adiciona o Score atual à variável
    // scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Checa se o Score do atual player é >= 100
    if (scores[activePlayer] >= 100) {
      // Acaba o jogo
      // Bloqueia os botoões
      playing = false;
      // Oculta o Dado da tela
      diceElement.classList.add("hidden");
      // Adiciona a classe/estilização na classe vencedora (dinamicamente)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // Remove a classe/estilização da classe vencedora (dinamicamente)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Chama a função para trocar o player
      trocaPlayer();
    }
  }
};

// Chamada dos botões
botaoRollDice.addEventListener("click", jogarDado);
botaoHold.addEventListener("click", hold);
botaoNewGame.addEventListener("click", newGame);
