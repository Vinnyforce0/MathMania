// ===============================
// ESTADO DO JOGO
// ===============================

let timeLeft = 70;
let score = 0;
let questionCount = 0;
let difficulty = 2; // dificuldade inicial
let currentAnswer = 0;
let freeze = false;
let timerInterval = null;

// ===============================
// ELEMENTOS
// ===============================

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("scoreDisplay");
const questionCountEl = document.getElementById("questionCount");
const questionEl = document.getElementById("question");
const inputEl = document.getElementById("answerInput");

// ===============================
// PESOS DOS OPERADORES
// ===============================

const operadores = [
    { simbolo: "+", peso: 2 },
    { simbolo: "-", peso: 3 },
    { simbolo: "*", peso: 8 },
    { simbolo: "/", peso: 10 },
    { simbolo: "**", peso: 20 },
    { simbolo: "√", peso: 30 }
];

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    updateHUD();
    generateQuestion();
    startTimer();
    inputEl.focus();

    inputEl.addEventListener("keydown", e => {
        if (e.key === "Enter" && !freeze) {
            checkAnswer();
        }
    });
});

// ===============================
// TIMER
// ===============================

function startTimer() {
    timerInterval = setInterval(() => {
        if (!freeze) {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0) endGame();
        }
    }, 1000);
}

// ===============================
// VERIFICAR RESPOSTA
// ===============================

function checkAnswer() {
    const userAnswer = Number(inputEl.value);

    if (userAnswer === currentAnswer) handleCorrect();
    else handleWrong();

    inputEl.value = "";
}

// ===============================
// ACERTO
// ===============================

function handleCorrect() {
    timeLeft += 10;
    addScore();
    difficulty++;
    questionCount++;
    generateQuestion();
    updateHUD();
}

// ===============================
// ERRO
// ===============================

function handleWrong() {
    timeLeft -= 10;
    freeze = true;
    inputEl.disabled = true;
    difficulty++;
    questionCount++;
    generateQuestion();
    updateHUD();

    setTimeout(() => {
        freeze = false;
        inputEl.disabled = false;
        inputEl.focus();
    }, 3000);
}

// ===============================
// PONTUAÇÃO
// ===============================

function addScore() {
    const value = Math.log(Math.max(timeLeft, 1)) * ((difficulty / 5) + 1);
    score += Math.floor(value);
}

// ===============================
// GERADOR DE PERGUNTAS
// ===============================

function generateQuestion() {
    let dificuldadeRestante = difficulty;
    let expressao = "";
    let primeiraParte = true;

    while (dificuldadeRestante >= 0) {
        // operadores possíveis que cabem na dificuldade restante
        const possiveis = operadores.filter(o => o.peso <= dificuldadeRestante);
        if (possiveis.length === 0) break;

        const op = possiveis[rand(0, possiveis.length - 1)];
        dificuldadeRestante -= op.peso;

        let parte = "";

        switch (op.simbolo) {

            case "+":
                const a1 = rand(1, 20);
                const b1 = rand(1, 20);
                parte = `${a1} + ${b1}`;
                break;

            case "-":
                const a2 = rand(5, 30);
                const b2 = rand(1, a2);
                parte = `${a2} - ${b2}`;
                break;

            case "*":
                const a3 = rand(1, 12);
                const b3 = rand(1, 12);
                parte = `${a3} × ${b3}`;
                break;

            case "/":
                const divisor = rand(1, 12);
                const resultado = rand(1, 12);
                const numerador = divisor * resultado;
                parte = `${numerador} ÷ ${divisor}`;
                break;

            case "**":
                const base = rand(2, 5);
                const expoente = rand(2, 3);
                parte = `${base}<sup>${expoente}</sup>`;
                break;

            case "√":
                const raiz = rand(2, 12);
                const quadrado = raiz * raiz;
                parte = `√${quadrado}`;
                break;
        }

        if (primeiraParte) {
            expressao += parte;
            primeiraParte = false;
        } else {
            expressao += " + " + parte; // conectando blocos
        }
    }

    questionEl.innerHTML = expressao;

    // calcular resposta
    try {
        let exprJS = expressao
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/<sup>(.*?)<\/sup>/g, "**$1")
            .replace(/√(\d+)/g, "Math.sqrt($1)");

        currentAnswer = Math.floor(eval(exprJS));
    } catch {
        currentAnswer = 0;
    }
}

// ===============================
// UTIL
// ===============================

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===============================
// HUD
// ===============================

function updateTimer() {
    timerEl.textContent = `⏱ ${timeLeft}`;
}

function updateHUD() {
    updateTimer();
    scoreEl.textContent = `⭐ ${difficulty}`;
    questionCountEl.textContent = `📊 ${questionCount}`;
}

// ===============================
// FIM DE JOGO
// ===============================

function endGame() {
    clearInterval(timerInterval);
    inputEl.disabled = true;
    questionEl.textContent = "Fim de jogo!";
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Falha no registro do SW', err));
    });
}
