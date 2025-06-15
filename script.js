const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navigation Logic
const homeSection = document.getElementById('home-section');
const aboutSection = document.getElementById('about-section');
const navLinks = document.querySelectorAll('.nav-link');

function showSection(section) {
    homeSection.classList.add('hidden');
    aboutSection.classList.add('hidden');
    document.getElementById(`${section}-section`).classList.remove('hidden');
    history.pushState(null, '', `#${section}`);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        showSection(section);
    });
});

// Show section based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showSection(hash);
});

// App Logic for Home Section
const wordsInput = document.getElementById('words');
const wordCount = document.getElementById('wordCount');
const gapTimeInput = document.getElementById('gapTime');
const accentSelect = document.getElementById('accent');
const pitchInput = document.getElementById('pitch');
const speedInput = document.getElementById('speed');
const pitchValue = document.getElementById('pitchValue');
const speedValue = document.getElementById('speedValue');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const saveBtn = document.getElementById('saveBtn');
const downloadBtn = document.getElementById('downloadBtn');
const status = document.getElementById('status');
const progressBar = document.getElementById('progressBar');
const currentWord = document.getElementById('currentWord');

let words = [];
let currentWordIndex = 0;
let isPlaying = false;
let speechTimeout;
let audioChunks = [];

// Initialize: Load saved words and update UI
function initializeApp() {
    if (localStorage.getItem('savedWords')) {
        wordsInput.value = localStorage.getItem('savedWords');
        updateWordCount();
        playBtn.disabled = words.length === 0;
    }
    pitchValue.textContent = pitchInput.value;
    speedValue.textContent = speedInput.value;
}

function updateWordCount() {
    words = wordsInput.value.split('\n').filter(word => word.trim() !== '');
    wordCount.textContent = words.length;
    playBtn.disabled = words.length === 0;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = words.length > 0 ? (currentWordIndex / words.length) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

// Event Listeners
wordsInput.addEventListener('input', updateWordCount);

pitchInput.addEventListener('input', () => {
    pitchValue.textContent = pitchInput.value;
});

speedInput.addEventListener('input', () => {
    speedValue.textContent = speedInput.value;
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('savedWords', wordsInput.value);
    status.textContent = 'Words saved to local storage!';
    setTimeout(() => status.textContent = 'Enter words to start', 2000);
});

playBtn.addEventListener('click', () => {
    if (!isPlaying && words.length > 0) {
        isPlaying = true;
        audioChunks = [];
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        downloadBtn.classList.add('hidden');
        status.textContent = 'Playing...';
        speakWords();
    }
});

pauseBtn.addEventListener('click', () => {
    isPlaying = false;
    clearTimeout(speechTimeout);
    speechSynthesis.cancel();
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    status.textContent = 'Paused';
    if (audioChunks.length > 0) {
        downloadBtn.classList.remove('hidden');
    }
});

function speakWords() {
    if (!isPlaying || currentWordIndex >= words.length) {
        isPlaying = false;
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        status.textContent = 'Finished playing';
        currentWord.textContent = 'None';
        if (audioChunks.length > 0) {
            downloadBtn.classList.remove('hidden');
        }
        currentWordIndex = 0;
        updateProgressBar();
        return;
    }

    const utterance = new SpeechSynthesisUtterance(words[currentWordIndex]);
    utterance.lang = accentSelect.value;
    utterance.pitch = parseFloat(pitchInput.value);
    utterance.rate = parseFloat(speedInput.value);
    utterance.onend = () => {
        currentWordIndex++;
        updateProgressBar();
        speechTimeout = setTimeout(speakWords, gapTimeInput.value * 1000);
    };
    speechSynthesis.speak(utterance);
    status.textContent = `Speaking: ${words[currentWordIndex]}`;
    currentWord.textContent = words[currentWordIndex];
}

downloadBtn.addEventListener('click', () => {
    status.textContent = 'Download not supported in browser. Try a desktop app for audio export.';
    setTimeout(() => status.textContent = 'Enter words to start', 3000);
});

// Start the app
initializeApp();