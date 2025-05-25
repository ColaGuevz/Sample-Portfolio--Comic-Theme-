document.addEventListener('DOMContentLoaded', () => {
    console.log("🎨 KA-POW! Script loaded! Let the ink flow! 💥");

    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Sound Effect on Hover & Display
    const soundEffectDisplay = document.getElementById('sound-effect-display');
    const soundLinks = document.querySelectorAll('[data-hover-sound]');
    let soundTimeout;

    soundLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const soundText = link.getAttribute('data-hover-sound');
            if (soundEffectDisplay && soundText) {
                soundEffectDisplay.textContent = soundText;
                soundEffectDisplay.classList.add('show');

                // Randomize position slightly
                const xOffset = Math.random() * 40 - 20; // -20 to +20 vw
                const yOffset = Math.random() * 20 - 10; // -10 to +10 vh
                soundEffectDisplay.style.setProperty('--dynamic-x', `${50 + xOffset}vw`);
                soundEffectDisplay.style.setProperty('--dynamic-y', `${50 + yOffset}vh`);
                // (CSS would need to use these vars: left: var(--dynamic-x); top: var(--dynamic-y);)
                // For simplicity now, fixed centered is fine.
            }
            clearTimeout(soundTimeout);
        });
        link.addEventListener('mouseleave', () => {
            if (soundEffectDisplay) {
                soundTimeout = setTimeout(() => {
                    soundEffectDisplay.classList.remove('show');
                }, 300); // Delay before hiding
            }
        });
    });


    // Random "Sound Effect" text click
    const randomSoundTextEl = document.getElementById('random-sound-text');
    const randomSounds = ["BAM!", "POW!", "WHOOSH!", "CRASH!", "ZAP!", "BOOM!", "CLICK!", "SWOOSH!"];
    if (randomSoundTextEl) {
        randomSoundTextEl.addEventListener('click', () => {
            const sound = randomSounds[Math.floor(Math.random() * randomSounds.length)];
            randomSoundTextEl.textContent = sound;
            if (soundEffectDisplay) { // Also show it big
                soundEffectDisplay.textContent = sound;
                soundEffectDisplay.classList.add('show');
                 clearTimeout(soundTimeout);
                soundTimeout = setTimeout(() => {
                    soundEffectDisplay.classList.remove('show');
                }, 800);
            }
        });
    }

    // Animate Skill Bars
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of element is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const powerFill = entry.target.querySelector('.power-fill');
                if (powerFill) {
                    // Set width directly here to trigger CSS transition after delay
                    const skillPower = entry.target.style.getPropertyValue('--skill-power');
                    powerFill.style.width = skillPower || '0%';
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });


    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default if it's truly an anchor on this page
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Optionally, slightly offset for fixed header if you have one.
                    // const headerOffset = 100; // Adjust as needed
                    // const elementPosition = targetElement.getBoundingClientRect().top;
                    // const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    // window.scrollTo({
                    //      top: offsetPosition,
                    //      behavior: "smooth"
                    // });
                }
            }
        });
    });

    // Page load title sequence animation - for demonstration
    const mainTitle = document.querySelector('.main-title span');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.innerHTML = '';
        text.split('').forEach((char, i) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.opacity = '0';
            charSpan.style.display = 'inline-block';
            charSpan.style.animation = `letterPopIn 0.5s ease-out ${i * 0.05}s forwards`;
            mainTitle.appendChild(charSpan);
        });
    }
});

// Add @keyframes for letterPopIn to CSS
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
@keyframes letterPopIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.5) rotate(-10deg); }
    80% { opacity: 1; transform: translateY(-5px) scale(1.1) rotate(2deg); }
    100% { opacity: 1; transform: translateY(0) scale(1) rotate(0); }
}
`;
document.head.appendChild(dynamicStyles);