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
    // Divisao
    // ===============================
    
    {
        id: "div_1",
        nome: "Prodigio da divisao",
        descricao: "Resolva 1 divisao",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 1
    },
    {
        id: "div_2",
        nome: "Divisor experiente",
        descricao: "Resolva 50 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 50
    },
    {
        id: "div_3",
        nome: "Divisor de mares",
        descricao: "Resolva 200 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 200
    },
    {
        id: "div_4",
        nome: "Divisor de 0",
        descricao: "Resolva 1000 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 1000
    },

    // ===============================
    // Potencia
    // ===============================

    {
        id: "pow_1",
        nome: "Prodigio em potencial",
        descricao: "Resolva 1 potencia",
        requisito: () => (parseInt(localStorage.getItem("potencias")) || 0) >= 1
    },
    {
        id: "pow_2",
        nome: "Potencial Desastre",
        descricao: "Resolva 50 potencias",
        requisito: () => (parseInt(localStorage.getItem("potencias")) || 0) >= 50
    },
    {
        id: "pow_3",
        nome: "Anti Logaritmo",
        descricao: "Resolva 200 potencias",
        requisito: () => (parseInt(localStorage.getItem("potencias")) || 0) >= 200
    },
    {
        id: "pow_4",
        nome: "Exponencial Infinito",
        descricao: "Resolva 1000 potencias",
        requisito: () => (parseInt(localStorage.getItem("potencias")) || 0) >= 1000
    },

    // ===============================
    // Raiz
    // ===============================

    {
        id: "sqrt_1",
        nome: "Prodígio raiz",
        descricao: "Resolva 1 raiz",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 1
    },
    {
        id: "sqrt_2",
        nome: "Radical Determinado",
        descricao: "Resolva 50 raízes",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 50
    },
    {
        id: "sqrt_3",
        nome: "Mestre dos Radicais",
        descricao: "Resolva 200 raízes",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 200
    },
    {
        id: "sqrt_4",
        nome: "Raiz de Tudo",
        descricao: "Resolva 1000 raízes",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 1000
    },

    // ===============================
    // Somatorio
    // ===============================

    {
        id: "sigma_1",
        nome: "Prodígio grego",
        descricao: "Resolva 1 somatório",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 1
    },
    {
        id: "sigma_2",
        nome: "Soma Grega",
        descricao: "Resolva 50 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 50
    },
    {
        id: "sigma_3",
        nome: "Oráculo dos Somatórios",
        descricao: "Resolva 200 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 200
    },
    {
        id: "sigma_4",
        nome: "Arquimedes",
        descricao: "Resolva 1000 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 1000
    },

    // ===============================
    // produtorio
    // ===============================

    {
        id: "prod_1",
        nome: "Multi-prodigio",
        descricao: "Resolva 1 produtório",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 1
    },
    {
        id: "prod_2",
        nome: "Fatorador",
        descricao: "Resolva 50 produtórios",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 50
    },
    {
        id: "prod_3",
        nome: "Produto Infinito",
        descricao: "Resolva 200 produtórios",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 200
    },
    {
        id: "prod_4",
        nome: "Multiplicador Supremo",
        descricao: "Resolva 1000 produtórios",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 1000
    },

    // ===============================
    // integral definida
    // ===============================

    {
        id: "int_1",
        nome: "Prodígio Integralista",
        descricao: "Resolva 1 integral",
        requisito: () => (parseInt(localStorage.getItem("integrais")) || 0) >= 1
    },
    {
        id: "int_2",
        nome: "Integralista Aprendiz",
        descricao: "Resolva 50 integrais",
        requisito: () => (parseInt(localStorage.getItem("integrais")) || 0) >= 50
    },
    {
        id: "int_3",
        nome: "Teorema Fundamental",
        descricao: "Resolva 200 integrais",
        requisito: () => (parseInt(localStorage.getItem("integrais")) || 0) >= 200
    },
    {
        id: "int_4",
        nome: "Mestre das Infinitas Áreas",
        descricao: "Resolva 1000 integrais",
        requisito: () => (parseInt(localStorage.getItem("integrais")) || 0) >= 1000
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
        nome: "Cérebro de Boltsman 🧠",
        descricao: "Resolva 1000 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 1000
    },
    {
        id: "questions_5",
        nome: "Hiperfantasioso",
        descricao: "Resolva 2500 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 2500
    },
    {
        id: "questions_6",
        nome: "Alergico a Grama",
        descricao: "Resolva 10000 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 10000
    },

];


document.addEventListener("DOMContentLoaded", () => {
    verificarConquistas();
    renderizarConquistas();
    atualizarContador();
});

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

function renderizarConquistas() {
    const container = document.getElementById("achievementsList");

    const desbloqueadas = JSON.parse(localStorage.getItem("conquistas")) || [];

    container.innerHTML = "";

    achievements.forEach(a => {
        const card = document.createElement("div");
        card.classList.add("achievement-card");

        const desbloqueada = desbloqueadas.includes(a.id);

        if (desbloqueada) {
            card.classList.add("unlocked");
        } else {
            card.classList.add("locked");
        }

        card.innerHTML = `
      <h3>${a.nome}</h3>
      <p>${a.descricao}</p>
      <span>${desbloqueada ? "Desbloqueado" : ""}</span>
    `;

        container.appendChild(card);
    });
    atualizarContador();
}

function atualizarContador() {
    const counter = document.getElementById("achievementsCounter");
    if (!counter) return;
    const desbloqueadas = JSON.parse(localStorage.getItem("conquistas")) || [];
    counter.textContent = `Conquistas desbloqueadas: ${desbloqueadas.length} / ${achievements.length}`;
}

function mostrarConquista(a) {
    const div = document.createElement("div");
    div.className = "achievement-popup";
    div.innerText = `🏆 ${a.nome} desbloqueado!`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}