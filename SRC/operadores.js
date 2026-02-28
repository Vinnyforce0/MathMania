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