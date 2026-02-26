function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = 8; // menos partículas = mais leve
    const particleTypes = ['small', 'medium', 'large'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle ' + particleTypes[Math.floor(Math.random() * 3)];
        container.appendChild(particle);

        resetParticle(particle);

        // reaproveita a mesma partícula
        particle.addEventListener('animationend', () => {
            resetParticle(particle);
        });
    }

    // linha ocasional controlada
    setInterval(() => {
        if (Math.random() > 0.8) {
            createLineParticle();
        }
    }, 4000);
}

function resetParticle(particle) {
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const tx = (Math.random() - 0.5) * 400;
    const ty = (Math.random() - 0.5) * 400;
    const delay = Math.random() * 3;

    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animationDelay = delay + 's';
}

function createLineParticle() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const line = document.createElement('div');
    line.className = 'line-particle';

    line.style.width = (100 + Math.random() * 150) + 'px';
    line.style.left = Math.random() * window.innerWidth + 'px';
    line.style.top = Math.random() * window.innerHeight + 'px';
    line.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    line.style.setProperty('--tx', (Math.random() - 0.5) * 500 + 'px');
    line.style.setProperty('--ty', (Math.random() - 0.5) * 500 + 'px');

    container.appendChild(line);

    setTimeout(() => line.remove(), 12000);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .catch(() => {});
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    registerServiceWorker();
});