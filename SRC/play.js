// ===============================
// ESTADO DO JOGO
// ===============================

let timeLeft = 70;
let difficulty = 20;
let score = 0;
let questionCount = 0;
let currentAnswer = 0;
let freeze = false;
let timerInterval = null;

// ===============================
// ELEMENTOS
// ===============================

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("scoreDisplay");
const difficultyEl = document.getElementById("difficulty");
const questionCountEl = document.getElementById("questionCount");
const questionEl = document.getElementById("question");
const inputEl = document.getElementById("answerInput");

// ===============================
// COMBINAÇÕES DE OPERADORES POR DIFICULDADE
// ===============================

// Estrutura: { minDifficulty, combinations: [ { ops: ["+", "-"], weight: 25 }, ... ] }
const OPERATOR_COMBINATIONS = [
    {
        minDifficulty: 1,
        combinations: [
            { ops: ["+"], weight: 100 }
        ]
    },
    {
        minDifficulty: 5,
        combinations: [
            { ops: ["+"], weight: 25 },
            { ops: ["-"], weight: 25 },
            { ops: ["+", "-"], weight: 25 },
            { ops: ["-", "+"], weight: 25 }
        ]
    },
    {
        minDifficulty: 10,
        combinations: [
            { ops: ["+"], weight: 12.5 },
            { ops: ["-"], weight: 12.5 },
            { ops: ["+", "-"], weight: 12.5 },
            { ops: ["-", "+"], weight: 12.5 },
            { ops: ["×"], weight: 25 },
            { ops: ["/"], weight: 25 }
        ]
    },
    {
        minDifficulty: 15,
        combinations: [
            { ops: ["+"], weight: 0 },
            { ops: ["-"], weight: 0 },
            { ops: ["+", "-"], weight: 0 },
            { ops: ["-", "+"], weight: 0 },
            { ops: ["×"], weight: 10 },
            { ops: ["/"], weight: 10 },
            { ops: ["×", "+"], weight: 10 },
            { ops: ["+", "+", "+"], weight: 20 },
            { ops: ["×", "-"], weight: 10 },
            { ops: ["-", "×"], weight: 20 },
            { ops: ["/", "+"], weight: 10 },
            { ops: ["/", "-"], weight: 10 }
        ]
    },
    {
        minDifficulty: 20,
        combinations: [
            { ops: ["×"], weight: 0 },
            { ops: ["/"], weight: 0 },
            { ops: ["×", "+"], weight: 0 },
            { ops: ["+", "+", "+"], weight: 0 },
            { ops: ["×", "-"], weight: 0 },
            { ops: ["-", "×"], weight: 0 },
            { ops: ["/", "+", "-"], weight: 0 },
            { ops: ["^"], weight: 20 },
            { ops: ["√"], weight: 20 },
            { ops: ["^", "+"], weight: 15 },
            { ops: ["^", "-"], weight: 15 },
            { ops: ["√", "+"], weight: 15 },
            { ops: ["√", "-"], weight: 15 },
        ]
    },
    {
        minDifficulty: 25,
        combinations: [
            { ops: ["^"], weight: 0 },
            { ops: ["√"], weight: 0 },
            { ops: ["^", "+"], weight: 0 },
            { ops: ["+", "^"], weight: 0 },
            { ops: ["√", "+"], weight: 0 },
            { ops: ["+", "√"], weight: 0 },
            { ops: ["√", "+", "√"], weight: 25 },
            { ops: ["√", "-", "√"], weight: 25 },
            { ops: ["^", "+", "^"], weight: 25 },
            { ops: ["^", "-", "^"], weight: 25 },
        ]
    },
];

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    updateHUD();
    generateQuestion();
    startTimer();
    inputEl.focus();

    inputEl.addEventListener("keydown", (e) => {
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

            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// ===============================
// VERIFICAR RESPOSTA
// ===============================

function checkAnswer() {
    const userAnswer = Number(inputEl.value);

    if (userAnswer === currentAnswer) {
        handleCorrect();
    } else {
        handleWrong();
    }

    inputEl.value = "";
}

// ===============================
// ACERTO
// ===============================

function handleCorrect() {
    timeLeft += 10;
    addScore();
    questionCount++;
    difficulty++;
    generateQuestion();
    updateHUD();
}

// ===============================
// ERRO
// ===============================

function handleWrong() {
    timeLeft -= 10;
    updateTimer();
    freeze = true;
    inputEl.disabled = true;

    questionCount++;
    difficulty++;
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

    const combination = pickCombination(difficulty);
    const ops = combination.ops;

    let displayExpr = "";
    let evalExpr = "";

    // Número inicial
    let start = rand(1, 10);
    displayExpr = "" + start;
    evalExpr = "" + start;

    for (let i = 0; i < ops.length; i++) {

        let op = ops[i];

        // ===============================
        // POTÊNCIA CONTROLADA
        // ===============================
        if (op === "^") {

            const base = rand(1, 5);      // base até 5
            const exponent = rand(2, 4);  // expoente até 4

            displayExpr = `${base}<sup>${exponent}</sup>`;
            evalExpr = `${base}**${exponent}`;
            continue;
        }

        // ===============================
        // RAIZ CONTROLADA
        // ===============================
        if (op === "√") {

            const rootBase = rand(1, 15); // controla dificuldade aqui
            const perfectSquare = rootBase * rootBase;

            displayExpr = `√(${perfectSquare})`;
            evalExpr = `${rootBase}`;
            continue;
        }

        // ===============================
        // DIVISÃO LIMPA (respeita padrão)
        // ===============================
        // ===============================
        // DIVISÃO 100% SEGURA
        // ===============================
        if (op === "/") {

            const currentValue = Function("return " + evalExpr)();

            // Se não for inteiro, não permite divisão
            if (!Number.isInteger(currentValue)) {
                continue; // pula essa operação
            }

            let divisorOptions = [];

            for (let i = 1; i <= 10; i++) {
                if (currentValue % i === 0) {
                    divisorOptions.push(i);
                }
            }

            if (divisorOptions.length === 0) {
                continue; // não existe divisor válido
            }

            const divisor = divisorOptions[rand(0, divisorOptions.length - 1)];

            displayExpr += ` / ${divisor}`;
            evalExpr += ` / ${divisor}`;
            continue;
        }

        // ===============================
        // MULTIPLICAÇÃO
        // ===============================
        if (op === "×") {
            op = "*";
        }

        const nextNumber = rand(1, 10);

        displayExpr += ` ${ops[i]} ${nextNumber}`;
        evalExpr += ` ${op} ${nextNumber}`;
    }

    try {
        currentAnswer = Math.floor(Function("return " + evalExpr)());
    } catch {
        currentAnswer = 0;
    }

    questionEl.innerHTML = displayExpr;
}

// ===============================
// PICK COMBINATION BASED ON DIFFICULTY
// ===============================

function pickCombination(difficulty) {

    // Encontra o bloco correto (o maior minDifficulty <= difficulty)
    let selectedBlock = OPERATOR_COMBINATIONS[0];

    for (let i = 0; i < OPERATOR_COMBINATIONS.length; i++) {
        if (difficulty >= OPERATOR_COMBINATIONS[i].minDifficulty) {
            selectedBlock = OPERATOR_COMBINATIONS[i];
        }
    }

    const available = selectedBlock.combinations;

    // Sorteio baseado em peso
    const totalWeight = available.reduce((acc, c) => acc + c.weight, 0);
    let r = Math.random() * totalWeight;

    for (let i = 0; i < available.length; i++) {
        if (r < available[i].weight) return available[i];
        r -= available[i].weight;
    }

    return available[0];
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
    scoreEl.textContent = `⭐ ${currentAnswer}`;
    questionCountEl.textContent = `📊 ${difficulty}`;
}

// ===============================
// FIM DE JOGO
// ===============================

function endGame() {
    clearInterval(timerInterval);
    inputEl.disabled = true;
    questionEl.textContent = "Fim de jogo!";
}