// Gera partículas flutuantes no estilo Balatro
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const particleTypes = ['small', 'medium', 'large'];
        const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        particle.className = 'particle ' + randomType;
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const tx = (Math.random() - 0.5) * 500;
        const ty = (Math.random() - 0.5) * 500;
        const delay = Math.random() * 5;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);

        // Recria a partícula quando a animação termina
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
            createParticles();
        }, 20000 + delay * 1000);
    }

    // Adiciona linhas ocasionalmente
    if (Math.random() > 0.7) {
        createLineParticle();
    }
}

function createLineParticle() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const line = document.createElement('div');
    line.className = 'line-particle';
    
    const width = 100 + Math.random() * 200;
    const height = 2;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const tx = (Math.random() - 0.5) * 600;
    const ty = (Math.random() - 0.5) * 600;
    const delay = Math.random() * 5;
    const rotation = Math.random() * 360;

    line.style.width = width + 'px';
    line.style.height = height + 'px';
    line.style.left = startX + 'px';
    line.style.top = startY + 'px';
    line.style.transform = 'rotate(' + rotation + 'deg)';
    line.style.setProperty('--tx', tx + 'px');
    line.style.setProperty('--ty', ty + 'px');
    line.style.animationDelay = delay + 's';

    container.appendChild(line);

    setTimeout(() => {
        if (line.parentNode) {
            line.remove();
        }
    }, 15000 + delay * 1000);
}

// Registra o service worker quando disponível
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(err => console.error('Falha ao registrar SW:', err));
    }
}

// Inicializa tudo quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    registerServiceWorker();
});
