/* ======================================================
   LISTA DE OPERADORES
====================================================== */

const listaOperadores = {
  "+": {},
  "-": {},
  "×": {},
  "/": {},
  "^": {},
  "√": {},
  "#": {},
  "!": {},
  "Σ": {},
  "∏": {},
  "∫": {},
};

/* ======================================================
   MAPA DE CLASSES DE COR
====================================================== */

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

/* ======================================================
   DESBLOQUEAR OPERADOR
====================================================== */

function desbloquearOperador(operador) {
  let operadores = JSON.parse(localStorage.getItem("operadores")) || {};
  operadores[operador] = true;
  localStorage.setItem("operadores", JSON.stringify(operadores));
}

/* ======================================================
   RESETAR PROGRESSO (opcional)
====================================================== */

function resetarOperadores() {
  localStorage.removeItem("operadores");
}

/* ======================================================
   CARREGAR CARTAS NA PÁGINA INDICE
====================================================== */

function carregarOperadores() {
  const container = document.getElementById("cards");
  if (!container) return;

  container.innerHTML = "";

  let operadoresSalvos = JSON.parse(localStorage.getItem("operadores")) || {};

  let total = 0;
  let desbloqueados = 0;

  for (let op in listaOperadores) {
    total++;

    const card = document.createElement("div");
    card.classList.add("card");

    if (!operadoresSalvos[op]) {
      // 🔒 BLOQUEADA
      card.classList.add("locked");
    } else {
      // 🔓 DESBLOQUEADA
      desbloqueados++;
      card.classList.add("unlocked");

      const span = document.createElement("span");
      span.textContent = op;

      // adiciona classe de cor
      if (mapaClasses[op]) {
        span.classList.add(mapaClasses[op]);
      }

      card.appendChild(span);

      card.addEventListener("click", () => mostrarInfoOperador(op));
    }

    container.appendChild(card);
  }

  atualizarProgresso(desbloqueados, total);
}

/* ======================================================
   PROGRESSO DA COLEÇÃO
====================================================== */

function atualizarProgresso(atual, total) {
  let progressoElemento = document.querySelector(".collection-progress");

  if (!progressoElemento) return;

  progressoElemento.textContent = `${atual} / ${total} operadores descobertos`;
}

/* ======================================================
   AUTO EXECUÇÃO AO CARREGAR
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  carregarOperadores();
});


function mostrarInfoOperador(operador) {
    // Cria o modal de explicação
    const modal = document.createElement("div");
    modal.classList.add("operator-modal");

    // Conteúdo do modal
    const content = document.createElement("div");
    content.classList.add("operator-modal-content");

    // Título com o operador
    const title = document.createElement("h2");
    title.textContent = `${operador}`;

    // Explicação (você pode personalizar cada operador)
    const description = document.createElement("p");
    description.textContent = descricaoOperador(operador);

    // Botão de fechar
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fechar";
    closeBtn.addEventListener("click", () => modal.remove());

    // Monta o modal
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Função que retorna uma explicação para cada operador
function descricaoOperador(op) {
    const descricoes = {
        "+": "Soma: adiciona dois números.",
        "-": "Subtração: remove o segundo número do primeiro.",
        "×": "Multiplicação: multiplica dois números.",
        "/": "Divisão: divide o primeiro número pelo segundo.",
        "^": "Potência: eleva um número a outro.",
        "√": "Raiz quadrada: calcula a raiz de um número.",
        "#": "Termial: soma todos os números de 1 até n",
        "!": "Fatorial: multiplica todos os números de 1 até n.",
        "Σ": "Somatorio: Some vários números seguindo uma regra.\nO termo (X) é a regra do que vai ser somado.",
        "∏": "Produtorio: Multiplique vários números seguindo uma regra.\nO termo (X) é a regra do que vai ser multiplicado.",
        "∫": "Integral definida: calcula a área entre dois limites.\nPrimeiro encontre a primitiva F(x).\nDepois calcule F(b) - F(a).\nOs limites (a e b) definem onde começa e termina o cálculo."
    };
    return descricoes[op] || "Descrição não disponível.";
}