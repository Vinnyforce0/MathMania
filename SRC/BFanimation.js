// ===============================
// BOSS FIGHT
//================================

import('../anime.esm.js').then(({ animate, spring }) => {

    const bossFight = document.getElementById('bossFight');
    const bossGlitch = document.getElementById('bossGlitch');
    const bossSkull = document.getElementById('bossSkull');

    function startBossFight() {

        console.log('BOSS FIGHT INICIADO');

        document.body.classList.add('boss-active');

        bossFight.style.display = 'block';
        bossFight.style.opacity = '1';

        // Entrada da caveira
        animate(bossGlitch, {
            translateY: ['-100vh', '0vh'],
            opacity: [0, 1],
            duration: 3000,
            ease: 'outExpo',

            onComplete: () => {
                prepararCaveira();
            }
        });

        
    }

    function prepararCaveira() {

        const svgDoc = bossSkull.contentDocument;

        if (!svgDoc) {
            console.error('Não foi possível acessar o SVG.');
            return;
        }

        const bottom = svgDoc.querySelector('#bottom');
        const top = svgDoc.querySelector('#top');
        const red = svgDoc.querySelector('#red');

        if (!bottom || !top) {
            console.error('Não encontrei #bottom ou #top dentro do SVG.');
            return;
        }

        animate(red, {
            opacity: 0,
            duration: 0
        });

        rir(bottom, top, red);
    }

    function rir(bottom, top, red) {
        animate(bottom, {
            translateY: [
                0,
                12,
                0,
                12,
                0,
                12,
                15,
                18,
                25,
                30,
                35,
            ],
            duration: 2400,
            ease: 'inOutSine'
        });

        animate(top, {
            translateY: [
                0,
                -5,
                0,
                -5,
                0,
                -5,
                -5,
            ],
            duration: 1400,
            ease: 'inOutSine',
            onComplete: () => {
                skullbreak(bottom, top, red);
            }
        });
    };
    
    function skullbreak(bottom, top, red) {

        animate(top, {
        rotate: 20,
        translateX: 25,

        ease: spring({
            bounce: 0.6,
            duration: 200
        }),

        onComplete: () => {
            animate(red, {
                opacity: 1,
                duration: 2000
            });
        }
    });
    }

    // Espera o SVG carregar
    bossSkull.addEventListener('load', () => {
        console.log('SVG da caveira carregado!');
        
    });
    startBossFight();
});


bossSkull.addEventListener('load', () => {
    const svgDoc = bossSkull.contentDocument;

    console.log('SVG:', svgDoc);
    console.log('Elementos:', svgDoc.querySelectorAll('*'));

    [...svgDoc.querySelectorAll('*')].forEach(el => {
        console.log(
            el.tagName,
            'id=', el.id,
            'label=', el.getAttribute('inkscape:label')
        );
    });
});