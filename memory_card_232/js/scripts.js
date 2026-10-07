// ======================================================
// JOGO DA MEMÓRIA
// ======================================================

// Pega todas as cartas do tabuleiro
const cartoes = document.querySelectorAll('.memory-card');

// Variáveis do jogo
let primeiraCarta = null;
let segundaCarta = null;
let podeClicar = true;
let paresEncontrados = 0;

// Total de pares
const totalDePares = cartoes.length / 2;


// ======================================================
// VIRAR CARTA
// ======================================================

function virarCarta() {

    // Se o jogo estiver travado, não deixa clicar
    if (!podeClicar) return;

    // Não deixa clicar duas vezes na mesma carta
    if (this === primeiraCarta) return;

    // Vira a carta
    this.classList.add('flip');

    // Se for a primeira carta
    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    // Se chegou aqui, é a segunda carta
    segundaCarta = this;

    // Verifica se formou um par
    verificarPar();
}


// ======================================================
// VERIFICAR SE AS CARTAS SÃO IGUAIS
// ======================================================

function verificarPar() {

    const cartasIguais =
        primeiraCarta.dataset.framework ===
        segundaCarta.dataset.framework;

    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}


// ======================================================
// QUANDO ENCONTRA UM PAR
// ======================================================

function manterParEncontrado() {

    // Remove o clique das cartas encontradas
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    // Verifica se terminou o jogo
    if (paresEncontrados === totalDePares) {
        fimDeJogo();
    }
}


// ======================================================
// QUANDO AS CARTAS SÃO DIFERENTES
// ======================================================

function desvirarCartas() {

    // Impede novos cliques enquanto espera
    podeClicar = false;

    setTimeout(() => {

        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetarJogada();

    }, 1000);
}


// ======================================================
// RESETAR A JOGADA
// ======================================================

function resetarJogada() {

    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}


// ======================================================
// EMBARALHAR CARTAS
// ======================================================

function embaralharCartas() {

    cartoes.forEach(cartao => {

        const posicaoAleatoria =
            Math.floor(Math.random() * cartoes.length);

        cartao.style.order = posicaoAleatoria;
    });
}


// ======================================================
// FIM DE JOGO
// ======================================================

function fimDeJogo() {

    alert('Parabéns! Você encontrou todos os pares!');

    resetarTabuleiro();
}


// ======================================================
// RESETAR TABULEIRO
// ======================================================

function resetarTabuleiro() {

    paresEncontrados = 0;

    cartoes.forEach(cartao => {

        cartao.classList.remove('flip');

        cartao.addEventListener('click', virarCarta);
    });

    embaralharCartas();
}


// ======================================================
// INICIAR JOGO
// ======================================================

embaralharCartas();

cartoes.forEach(cartao => {
    cartao.addEventListener('click', virarCarta);
});



                     

    
