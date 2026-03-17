// ===============================
// ESTADO DO JOGO
// ===============================
let timeLeft = 50;
let difficulty = 1;
let score = 0;
let questionCount = 1;
let currentAnswer = 0;
let correctAnswers = 0;
let freeze = false;
let timerInterval = null;
let currentOperatorsUsed = [];

let checkpoint = parseInt(localStorage.getItem("checkpoint")) || 0;
if (checkpoint != 0) {
    questionCount = checkpoint;
    difficulty = checkpoint;
}

// ===============================
// ELEMENTOS
// ===============================

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("scoreDisplay");
const difficultyEl = document.getElementById("difficulty");
const questionCountEl = document.getElementById("questionCount");
const correctCountEl = document.getElementById("correctCount");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer-area");
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
            { ops: ["×"], weight: 20 },
            { ops: ["/"], weight: 20 },
            { ops: ["×", "+"], weight: 10 },
            { ops: ["+", "+", "+"], weight: 10 },
            { ops: ["×", "-"], weight: 10 },
            { ops: ["-", "×"], weight: 10 },
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
            { ops: ["√", "-"], weight: 15 }
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
            { ops: ["^-^"], weight: 25 },
            { ops: ["^+^"], weight: 25 },
            { ops: ["√-√"], weight: 25 },
            { ops: ["√+√"], weight: 25 }
        ]
    },
    {
        minDifficulty: 30,
        combinations: [
            { ops: ["√", "+", "√"], weight: 0 },
            { ops: ["√", "-", "√"], weight: 0 },
            { ops: ["^", "+", "^"], weight: 0 },
            { ops: ["^", "-", "^"], weight: 0 },
            { ops: ["#"], weight: 100 }
        ]
    },
    {
        minDifficulty: 35,
        combinations: [
            { ops: ["#"], weight: 0 },
            { ops: ["#", "+"], weight: 50 },
            { ops: ["#", "-"], weight: 50 }
        ]
    },
    {
        minDifficulty: 40,
        combinations: [
            { ops: ["#", "+"], weight: 0 },
            { ops: ["#", "-"], weight: 0 },
            { ops: ["!"], weight: 100 }
        ]
    },
    {
        minDifficulty: 45,
        combinations: [
            { ops: ["!"], weight: 0 },
            { ops: ["!", "+"], weight: 50 },
            { ops: ["!", "-"], weight: 50 }
        ]
    },
    {
        minDifficulty: 50,
        combinations: [
            { ops: ["!", "+"], weight: 0 },
            { ops: ["!", "-"], weight: 0 },
            { ops: ["Σ"], weight: 100 }
        ]
    },
    {
        minDifficulty: 55,
        combinations: [
            { ops: ["Σ"], weight: 0 },
            { ops: ["∏"], weight: 100 }
        ]
    },
    {
        minDifficulty: 60,
        combinations: [
            { ops: ["∏"], weight: 0 },
            { ops: ["∫"], weight: 100 }
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
    setTimeout(() => {
        inputEl.classList.remove("input-correct");
        inputEl.classList.remove("input-wrong");
    }, 1000);
    inputEl.value = "";
    atualizarProgresso(questionCount)
}

// ===============================
// ACERTO
// ===============================

function handleCorrect() {
    timeLeft += Math.floor(2.5 * (1 + Math.floor(Math.log2(questionCount))));
    addScore();
    inputEl.classList.add("input-correct");
    questionCount++;
    difficulty++;
    correctAnswers++;
    generateQuestion();
    updateHUD();
    inputEl.textContent = "";
    extrairOperadoresValidos(currentOperatorsUsed).forEach(op => {
        desbloquearOperadorNoJogo(op);
    });
    registrarOperacao(currentOperatorsUsed)
}

// ===============================
// ERRO
// ===============================

function handleWrong() {
    timeLeft -= 10;
    updateTimer();
    freeze = true;
    inputEl.disabled = true;
    inputEl.classList.add("input-wrong");
    questionCount++;
    difficulty++;
    generateQuestion();
    updateHUD();

    setTimeout(() => {
        freeze = false;
        inputEl.disabled = false;
        inputEl.focus();
    }, 1000);
    extrairOperadoresValidos(currentOperatorsUsed).forEach(op => {
        desbloquearOperadorNoJogo(op);
    });
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

function factorial(n) {
    if (n < 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function termial(n) {
    if (n < 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result += i;
    }
    return result;
}

function gerarSomatorio() {

    const inicio = rand(1, 3);
    const fim = rand(4, 6);

    const termosPossiveis = ["X", "2X", "3X", "4X"];
    const termo = termosPossiveis[rand(0, termosPossiveis.length - 1)];

    // Soma simples de a até b
    const soma = ((fim * (fim + 1)) / 2) - (((inicio - 1) * inicio) / 2);

    let resultado = 0;

    switch (termo) {
        case "X":
            resultado = soma;
            break;
        case "2X":
            resultado = 2 * soma;
            break;
        case "3X":
            resultado = 3 * soma;
            break;
        case "4X":
            resultado = 4 * soma;
            break;
    }

    currentAnswer = resultado;

    renderSomatorio(inicio, fim, termo);
}

function renderSomatorio(inicio, fim, termo) {
    questionEl.innerHTML = `
      <div class="somatorio">
        <div class="limite">${fim}</div>
        <div class="sigma-termo">
          <span class="sigma">Σ</span>
          <span class="termo">  ${termo}</span>
        </div>
        <div class="limite">X = ${inicio}</div>
      </div>
    `;
}

function gerarProdutorio() {

    const inicio = rand(1, 3);
    const fim = rand(3, 5);

    const termosPossiveis = ["X", "2X", "3X"];
    const termo = termosPossiveis[rand(0, termosPossiveis.length - 1)];

    let resultado = 1;

    for (let x = inicio; x <= fim; x++) {

        switch (termo) {
            case "X":
                resultado *= x;
                break;

            case "2X":
                resultado *= (2 * x);
                break;

            case "3X":
                resultado *= (3 * x);
                break;
        }

    }

    currentAnswer = resultado;

    renderProdutorio(inicio, fim, termo);
}

function renderProdutorio(inicio, fim, termo) {
    questionEl.innerHTML = `
      <div class="somatorio">
        <div class="limite-p">${fim}</div>
        <div class="sigma-termo">
          <span class="produtorio">∏</span>
          <span class="termo"> ${termo}</span>
        </div>
        <div class="limite-p">X = ${inicio}</div>
      </div>
    `;
}

function gerarIntegral() {

    const inicio = rand(1, 4);
    let fim = 0;

    if (inicio % 2 === 0) {
        fim = (rand(1, 3) * 2);
    } else {
        fim = (rand(1, 3) * 2) + 3;
    }

    const termosPossiveis = ["X", "2X", "3X", "4X"];
    const termo = termosPossiveis[rand(0, termosPossiveis.length - 1)];

    let k = 1;

    switch (termo) {
        case "X": k = 1; break;
        case "2X": k = 2; break;
        case "3X": k = 3; break;
        case "4X": k = 4; break;
    }

    const resultado = (k * (fim * fim - inicio * inicio)) / 2;

    currentAnswer = resultado;

    renderIntegral(inicio, fim, termo);
}

function renderIntegral(inicio, fim, termo) {
    questionEl.innerHTML = `
      <div class="somatorio">
        <div class="limite-i">${fim}</div>
        <div class="sigma-termo">
          <span class="sigma">∫</span>
          <span class="termo"> ${termo} DX</span>
        </div>
        <div class="limite-i">${inicio}</div>
      </div>
    `;
}

function generateQuestion() {

    const combination = pickCombination(difficulty);
    const ops = combination.ops;
    currentOperatorsUsed = ops;

    // ======== SE FOR SOMATÓRIO ========
    if (ops.includes("Σ")) {
        gerarSomatorio();
        return;
    } else if (ops.includes("∏")) {
        gerarProdutorio();
        return;
    } else if (ops.includes("∫")) {
        gerarIntegral();
        return;
    }

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

            displayExpr = `√${perfectSquare}`;
            evalExpr = `${rootBase}`;
            continue;
        }

        // ===============================
        // POTÊNCIA + POTÊNCIA
        // ===============================

        if (op === "^+^") {
            const basePlus1 = rand(1, 5);      // base até 5
            const exponentPlus1 = rand(2, 3);  // expoente até 3

            const basePlus2 = rand(1, 5);      // base até 5
            const exponentPlus2 = rand(2, 3);  // expoente até 3

            displayExpr = `${basePlus1}<sup>${exponentPlus1}</sup> + ${basePlus2}<sup>${exponentPlus2}</sup>`;
            evalExpr = `(${basePlus1}**${exponentPlus1}) + (${basePlus2}**${exponentPlus2})`;
            continue;
        }

        // ===============================
        // RAIZ + RAIZ
        // ===============================

        if (op === "√+√") {
            const rootBase1 = rand(1, 15); // controla dificuldade aqui
            const perfectSquare1 = rootBase1 * rootBase1;

            const rootBase2 = rand(1, 15); // controla dificuldade aqui
            const perfectSquare2 = rootBase2 * rootBase2;

            displayExpr = `√${perfectSquare1} + √${perfectSquare2}`;
            evalExpr = `(${rootBase1}) + (${rootBase2})`;
            continue;
        }

        // ===============================
        // POTÊNCIA - POTÊNCIA
        // ===============================

        if (op === "^-^") {
            const baseMinus1 = rand(1, 5);      // base até 5
            const exponentMinus1 = rand(2, 3);  // expoente até 4

            const baseMinus2 = rand(1, 5);      // base até 5
            const exponentMinus2 = rand(2, 3);  // expoente até 4

            displayExpr = `${baseMinus1}<sup>${exponentMinus1}</sup> - ${baseMinus2}<sup>${exponentMinus2}</sup>`;
            evalExpr = `(${baseMinus1}**${exponentMinus1}) - (${baseMinus2}**${exponentMinus2})`;
            continue;
        }

        // ===============================
        // RAIZ - RAIZ
        // ===============================

        if (op === "√-√") {
            const rootBaseMinus1 = rand(2, 15); // controla dificuldade aqui
            const perfectSquareMinus1 = rootBaseMinus1 * rootBaseMinus1;

            const rootBaseMinus2 = rand(2, 15); // controla dificuldade aqui
            const perfectSquareMinus2 = rootBaseMinus2 * rootBaseMinus2;

            displayExpr = `√${perfectSquareMinus1} - √${perfectSquareMinus2}`;
            evalExpr = `(${rootBaseMinus1}) - (${rootBaseMinus2})`;
            continue;

        }

        if (op === "!") {
            const fatorBase = rand(2, 6);
            const fatorResult = factorial(fatorBase);

            displayExpr = `${fatorBase}!`;
            evalExpr = `${fatorResult}`;
            continue;
        }


        if (op === "#") {
            const termiBase = rand(2, 6);
            const termiResult = termial(termiBase);

            displayExpr = `${termiBase}#`;
            evalExpr = `${termiResult}`;
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
    if (difficulty > 10) {

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
    questionCountEl.textContent = `📊 ${questionCount}`;
    correctCountEl.textContent = `✔️ ${currentOperatorsUsed}`;
    atualizarDificuldade(difficulty);
}

// ===============================
// FIM DE JOGO
// ===============================

function endGame() {
    clearInterval(timerInterval);
    inputEl.disabled = true;
    let dots = ".";
    answerEl.style.bottom = "50%";
    let text = "Fim de jogo";
    const interval = setInterval(() => {
        questionEl.textContent = text + dots;
        dots = dots.length < 3 ? dots + "." : "";
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        window.location.href = '../index.html';
    }, 4000);
}


function mostrarMiniCard(operador) {
    // 1️⃣ Cria o mini-card
    const card = document.createElement("div");
    card.classList.add("mini-card");

    // 2️⃣ Cria o span com o operador e cor correta
    const span = document.createElement("span");
    span.textContent = operador;
    if (mapaClasses[operador]) {
        span.classList.add(mapaClasses[operador]);
    }
    card.appendChild(span);

    // 3️⃣ Adiciona no body
    document.body.appendChild(card);

    // 4️⃣ Remove depois de 2s (fade out já anima)
    setTimeout(() => {
        card.remove();
    }, 2000);
}

// 5️⃣ Função para desbloquear operador no jogo e mostrar mini-card
function desbloquearOperadorNoJogo(operador) {
    // Pega os operadores já desbloqueados do localStorage
    let operadores = JSON.parse(localStorage.getItem("operadores")) || {};

    // Se ainda não foi desbloqueado
    if (!operadores[operador]) {
        operadores[operador] = true;              // Marca como desbloqueado
        localStorage.setItem("operadores", JSON.stringify(operadores));

        mostrarMiniCard(operador);               // Mostra o mini-card só agora
    }
    // Se já desbloqueado antes, não faz nada (mini-card não aparece)
}

const mapaClasses = {
    "+": "op-add",
    "-": "op-sub",
    "×": "op-mul",
    "/": "op-div",
    "^": "op-pow",
    "√": "op-sqrt",
    "#": "op-term",
    "!": "op-fat",
    "Σ": "op-sig",
    "∏": "op-prod",
    "∫": "op-inte",
};

function extrairOperadoresValidos(opsArray) {
    const operadoresValidos = [];
    opsArray.forEach(op => {
        // Se for operador composto, separa pelos símbolos conhecidos
        let chars = op.split(/(?=[+\-×\/^√#!Σ∏∫])/); // separa cada símbolo reconhecível
        chars.forEach(c => {
            if (mapaClasses[c] && !operadoresValidos.includes(c)) {
                operadoresValidos.push(c);
            }
        });
    });
    return operadoresValidos;
}

function atualizarDificuldade(nivel) {
    const display = document.getElementById("difficultyDisplay");

    // Remove classes antigas
    display.classList.remove("easy", "medium", "hard", "insane");

    if (nivel >= 0) {
        display.textContent = "Dificuldade: Fácil";
        display.classList.add("easy");
    }

    if (nivel >= 15) {
        display.textContent = "Dificuldade: Médio";
        display.classList.add("medium");
    }

    if (nivel >= 25) {
        display.textContent = "Dificuldade: Difícil";
        display.classList.add("hard");
    }

    if (nivel >= 40) {
        display.textContent = "Dificuldade: Insano";
        display.classList.add("insane");
    }

    if (nivel >= 50) {
        display.textContent = "Dificuldade: Mestre";
        display.classList.add("mestre");
    }

    if (nivel >= 60) {
        display.textContent = "Dificuldade: GrandMestre";
        display.classList.add("grandmestre");
    }
}

function registrarOperacao(opsArray) {

  opsArray.forEach(op => {

    if (op.includes("+")) {
      incrementar("somas");
    }

    if (op.includes("-")) {
      incrementar("subtracoes");
    }

    if (op.includes("×")) {
      incrementar("multiplicacoes");
    }

    if (op.includes("/")) {
      incrementar("divisoes");
    }

    if (op.includes("^")) {
      incrementar("potencias");
    }

    if (op.includes("√")) {
      incrementar("raizes");
    }

    if (op.includes("Σ")) {
      incrementar("somatorios");
    }

    if (op.includes("∏")) {
      incrementar("produtorios");
    }

    if (op.includes("∫")) {
      incrementar("integrais");
    }
    incrementar("totalQuestoes")
  });

}

function incrementar(tipo) {
  let valor = parseInt(localStorage.getItem(tipo)) || 0;
  valor++;

  localStorage.setItem(tipo, valor);

  verificarConquistas();
}

function verificarConquistas() {
  let desbloqueadas = JSON.parse(localStorage.getItem("conquistas")) || [];

  achievements.forEach(a => {
    if (!desbloqueadas.includes(a.id) && a.requisito()) {
      desbloqueadas.push(a.id);
      localStorage.setItem("conquistas", JSON.stringify(desbloqueadas));

      mostrarConquista(a);
    }
  });
}

function mostrarConquista(a) {
  const div = document.createElement("div");
  div.className = "achievement-popup";
  div.innerText = "🏆 " + a.nome + " desbloqueado!";

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

function atualizarProgresso(questaoAtual) {
  let maior = parseInt(localStorage.getItem("maxCheckpoint")) || 0;

  if (questaoAtual > maior) {
    localStorage.setItem("maxCheckpoint", questaoAtual);
  }
}

const achievements = [

    // ===============================
    // SOMA
    // ===============================
    {
        id: "sum_1",
        nome: "Prodígio da soma",
        descricao: "Resolva 1 soma",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 1
    },
    {
        id: "sum_2",
        nome: "Filho do Somatorio",
        descricao: "Resolva 50 somas",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 50
    },
    {
        id: "sum_3",
        nome: "Mestre da soma",
        descricao: "Resolva 200 somas",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 200
    },
    {
        id: "sum_4",
        nome: "Sun God ☀️",
        descricao: "Resolva 1000 somas",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 1000
    },

    // ===============================
    // SUBTRAÇÃO
    // ===============================
    {
        id: "sub_1",
        nome: "Prodígio da subtração",
        descricao: "Resolva 1 subtração",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 1
    },
    {
        id: "sub_2",
        nome: "Caçador de números",
        descricao: "Resolva 50 subtrações",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 50
    },
    {
        id: "sub_3",
        nome: "Mestre do vazio",
        descricao: "Resolva 200 subtrações",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 200
    },
    {
        id: "sub_4",
        nome: "Buraco Negro 🕳️",
        descricao: "Resolva 1000 subtrações",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 1000
    },

    // ===============================
    // MULTIPLICAÇÃO
    // ===============================
    {
        id: "mul_1",
        nome: "Prodígio da multiplicação",
        descricao: "Resolva 1 multiplicação",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 1
    },
    {
        id: "mul_2",
        nome: "fabrica de numeros",
        descricao: "Resolva 50 multiplicações",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 50
    },
    {
        id: "mul_3",
        nome: "Multi-disciplinado",
        descricao: "Resolva 200 multiplicações",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 200
    },
    {
        id: "mul_4",
        nome: "Multi-Constelacional ✨",
        descricao: "Resolva 1000 multiplicações",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 1000
    },

    // ===============================
    // GERAL (QUESTÕES)
    // ===============================
    {
        id: "questions_1",
        nome: "Ótimo começo",
        descricao: "Resolva 1 questão",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 1
    },
    {
        id: "questions_2",
        nome: "Em ritmo",
        descricao: "Resolva 50 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 50
    },
    {
        id: "questions_3",
        nome: "Mente afiada",
        descricao: "Resolva 200 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 200
    },
    {
        id: "questions_4",
        nome: "Cérebro de Boltsman 🧠🔥",
        descricao: "Resolva 1000 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 1000
    },

    // ===============================
    // ESPECIAIS (operações avançadas)
    // ===============================
    {
        id: "pow_1",
        nome: "Prodigio em potencial",
        descricao: "Resolva 1 potencia",
        requisito: () => (parseInt(localStorage.getItem("potencias")) || 0) >= 1
    },
    {
        id: "sqrt_1",
        nome: "Prodigio raiz",
        descricao: "Resolva 1 raiz",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 1
    },
    {
        id: "sigma_1",
        nome: "Prodigio grego",
        descricao: "Resolva 1 somatório",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 1
    },
    {
        id: "prod_1",
        nome: "multi-prodigio produtor",
        descricao: "Resolva 1 produtório",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 1
    },
    {
        id: "int_1",
        nome: "prodigio Integralista",
        descricao: "Resolva 1 integral",
        requisito: () => (parseInt(localStorage.getItem("integrais")) || 0) >= 1
    }

];