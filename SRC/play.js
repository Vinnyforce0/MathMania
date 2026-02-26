// ===============================
// ESTADO DO JOGO
// ===============================

let timeLeft = 70;
let difficulty = 1;
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
            { ops: ["×", "+"], weight: 20 },
            { ops: ["+", "+", "+"], weight: 20 },
            { ops: ["×", "-"], weight: 20 },
            { ops: ["-", "×"], weight: 20 },
            { ops: ["/", "+", "-"], weight: 20 }
        ]
    }
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

    let numbers = [];
    let questionStr = "";

    for (let i = 0; i <= ops.length; i++) {
        numbers.push(rand(1, 20));
    }

    // Ajuste para divisões inteiras
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "/") {
            const divisor = numbers[i + 1];
            const dividend = divisor * rand(1, 10);
            numbers[i] = dividend;
        }
    }

    // Monta pergunta como string
    questionStr = "" + numbers[0];
    currentAnswer = numbers[0];

    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const num = numbers[i + 1];
        questionStr += ` ${op} ${num}`;

        // Calcula resposta
        switch (op) {
            case "+": currentAnswer += num; break;
            case "-": currentAnswer -= num; break;
            case "×": currentAnswer *= num; break;
            case "/": currentAnswer = Math.floor(currentAnswer / num); break;
        }
    }

    questionEl.textContent = questionStr;
}

// ===============================
// PICK COMBINATION BASED ON DIFFICULTY
// ===============================

function pickCombination(difficulty) {
    let available = [];

    for (let i = 0; i < OPERATOR_COMBINATIONS.length; i++) {
        if (difficulty >= OPERATOR_COMBINATIONS[i].minDifficulty) {
            available = available.concat(OPERATOR_COMBINATIONS[i].combinations);
        }
    }

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
    scoreEl.textContent = `⭐ ${score}`;
    difficultyEl.textContent = difficulty;
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