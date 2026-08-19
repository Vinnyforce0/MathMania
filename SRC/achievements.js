const achievements = [

    // ===============================
    // SOMA
    // ===============================

    {
        id: "sum_1",
        nome: "Prodígio da Soma",
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
        nome: "Mestre da Soma",
        descricao: "Resolva 200 somas",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 200
    },
    {
        id: "sum_4",
        nome: "Sum God ☀️",
        descricao: "Resolva 1000 somas",
        requisito: () => (parseInt(localStorage.getItem("somas")) || 0) >= 1000
    },

    // ===============================
    // SUBTRAÇÃO
    // ===============================

    {
        id: "sub_1",
        nome: "Prodígio da Subtração",
        descricao: "Resolva 1 subtração",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 1
    },
    {
        id: "sub_2",
        nome: "Caçador de Números",
        descricao: "Resolva 50 subtrações",
        requisito: () => (parseInt(localStorage.getItem("subtracoes")) || 0) >= 50
    },
    {
        id: "sub_3",
        nome: "Mestre Negativo",
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
        nome: "Prodígio da Multiplicação",
        descricao: "Resolva 1 multiplicação",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 1
    },
    {
        id: "mul_2",
        nome: "Fabrica de Numeros",
        descricao: "Resolva 50 multiplicações",
        requisito: () => (parseInt(localStorage.getItem("multiplicacoes")) || 0) >= 50
    },
    {
        id: "mul_3",
        nome: "Multi-Disciplinado",
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
        nome: "Prodigio da Divisao",
        descricao: "Resolva 1 divisao",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 1
    },
    {
        id: "div_2",
        nome: "Divisor Experiente",
        descricao: "Resolva 50 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 50
    },
    {
        id: "div_3",
        nome: "Divisor de Mares",
        descricao: "Resolva 200 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 200
    },
    {
        id: "div_4",
        nome: "Divisor 0",
        descricao: "Resolva 1000 divisoes",
        requisito: () => (parseInt(localStorage.getItem("divisoes")) || 0) >= 1000
    },

    // ===============================
    // Potencia
    // ===============================

    {
        id: "pow_1",
        nome: "Prodigio em Potencial",
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
        nome: "Prodígio Raiz",
        descricao: "Resolva 1 raiz",
        requisito: () => (parseInt(localStorage.getItem("raizes")) || 0) >= 1
    },
    {
        id: "sqrt_2",
        nome: "Raiz de todo o Mal",
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
        nome: "Prodígio do Somatório",
        descricao: "Resolva 1 somatório",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 1
    },
    {
        id: "sigma_2",
        nome: "Somador incansável",
        descricao: "Resolva 50 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 50
    },
    {
        id: "sigma_3",
        nome: "Somador Infinito",
        descricao: "Resolva 200 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 200
    },
    {
        id: "sigma_4",
        nome: "While(True)\n{Soma}",
        descricao: "Resolva 1000 somatórios",
        requisito: () => (parseInt(localStorage.getItem("somatorios")) || 0) >= 1000
    },

    // ===============================
    // integral definida
    // ===============================

    {
        id: "int_1",
        nome: "Prodígio Integro",
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
        nome: "Onisciência Espacial",
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
    // produtorio
    // ===============================

    {
        id: "prod_1",
        nome: "Multi-Prodigio",
        descricao: "Resolva 1 produtório",
        requisito: () => (parseInt(localStorage.getItem("produtorios")) || 0) >= 1
    },
    {
        id: "prod_2",
        nome: "Multi-Multiplicador",
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
    // GERAL (QUESTÕES)
    // ===============================

    {
        id: "questions_1",
        nome: "Contando com os Dedos",
        descricao: "Resolva 1 questão",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 1
    },
    {
        id: "questions_2",
        nome: "Algébrico",
        descricao: "Resolva 50 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 50
    },
    {
        id: "questions_3",
        nome: "Newton's Junior",
        descricao: "Resolva 200 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 200
    },
    {
        id: "questions_4",
        nome: "Cérebro de Boltzmann 🧠",
        descricao: "Resolva 1000 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 1000
    },
    {
        id: "questions_5",
        nome: "HiperCalculista",
        descricao: "Resolva 2500 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 2500
    },
    {
        id: "questions_6",
        nome: "Alergico a Grama",
        descricao: "Resolva 10000 questões",
        requisito: () => (parseInt(localStorage.getItem("totalQuestoes")) || 0) >= 10000
    },
    {
        id: "questions_7",
        nome: "Calcular = Respirar",
        descricao: "Consiga todas as conquistas",
        requisito: () => {
            const conquistas = JSON.parse(localStorage.getItem("conquistas")) || [];
        return conquistas.length >= achievements.length;
    }
    },

];

document.addEventListener("DOMContentLoaded", () => {
    verificarConquistas();
    renderizarConquistas();
    atualizarContador();
    initScrollHandle();
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

/* Scroll handle (bolinha) - cria um handle que segue o scroll e permite arrastar para rolar */
function initScrollHandle() {
    const handle = document.createElement('div');
    handle.id = 'scrollHandle';
    handle.className = 'scroll-handle';
    document.body.appendChild(handle);

    let dragging = false;
    let startY = 0;
    let startScroll = 0;

    function updateHandlePos() {
        const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const ratio = docHeight === 0 ? 0 : window.scrollY / docHeight;
        const maxTop = Math.max(window.innerHeight - handle.offsetHeight - 40, 0);
        const top = 20 + ratio * maxTop;
        handle.style.top = `${top}px`;
    }

    window.addEventListener('scroll', updateHandlePos, { passive: true });
    window.addEventListener('resize', updateHandlePos);

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        dragging = true;
        startY = e.clientY;
        startScroll = window.scrollY;
        handle.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const dy = e.clientY - startY;
        const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const maxTop = Math.max(window.innerHeight - handle.offsetHeight - 40, 0);
        const ratio = maxTop === 0 ? 0 : dy / maxTop;
        const newScroll = Math.min(Math.max(0, startScroll + ratio * docHeight), docHeight);
        window.scrollTo({ top: newScroll, behavior: 'auto' });
    });

    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            handle.style.cursor = 'grab';
        }
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
        dragging = true;
        startY = e.touches[0].clientY;
        startScroll = window.scrollY;
    }, { passive: false });

    handle.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        const dy = e.touches[0].clientY - startY;
        const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const maxTop = Math.max(window.innerHeight - handle.offsetHeight - 40, 0);
        const ratio = maxTop === 0 ? 0 : dy / maxTop;
        const newScroll = Math.min(Math.max(0, startScroll + ratio * docHeight), docHeight);
        window.scrollTo(0, newScroll);
        e.preventDefault();
    }, { passive: false });

    handle.addEventListener('touchend', () => {
        dragging = false;
    });

    // Inicializa posição
    setTimeout(updateHandlePos, 50);
}

function listarConquistas() {
    return achievements.map((a, i) => ({
        numero: i + 1,
        id: a.id,
        nome: a.nome,
        descricao: a.descricao
    }));
}

function concederTodasConquistas() {
    const todas = achievements.map(a => a.id);

    localStorage.setItem("conquistas", JSON.stringify(todas));

    console.log(`🏆 ${todas.length} conquistas concedidas!`);
    console.table(achievements.map(a => ({
        ID: a.id,
        Nome: a.nome,
        Descrição: a.descricao
    })));

    return todas;
}