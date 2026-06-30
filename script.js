document.addEventListener("DOMContentLoaded", () => {
    
    // --- Audio System (Web Audio API Synthesizer) ---
    // Generates high-end UI sounds without needing MP3 files
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playHoverSound() {
        if (audioCtx.state === 'suspended') return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    function playClickSound() {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }

    // --- Preloader & Initialization ---
    const preloader = document.getElementById('preloader');
    const enterBtn = document.getElementById('enter-btn');

    enterBtn.addEventListener('click', () => {
        // Resume Audio context on user interaction (Browser security requirement)
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playClickSound();
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            triggerHeroAnimation();
        }, 1000);
    });

    // --- SFX Triggers ---
    const sfxTriggers = document.querySelectorAll('.sfx-trigger, .glass-card, a');
    sfxTriggers.forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
        if(el.tagName === 'A') {
            el.addEventListener('click', playClickSound);
        }
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: play a very subtle sound when sections reveal
                // playHoverSound(); 
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    function triggerHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero .reveal');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
    }
});
