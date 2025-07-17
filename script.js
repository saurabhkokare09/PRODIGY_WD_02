let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    if (isRunning) {
        const currentTime = performance.now();
        elapsedTime = currentTime - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
        requestAnimationFrame(updateDisplay);
    }
}

function startStopwatch() {
    if (!isRunning) {
        startTime = performance.now() - elapsedTime;
        isRunning = true;
        requestAnimationFrame(updateDisplay);
        
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        lapBtn.disabled = false;
        
        timeDisplay.classList.add('running');
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        lapBtn.disabled = true;
        
        timeDisplay.classList.remove('running');
    }
}

function resetStopwatch() {
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;
    
    timeDisplay.textContent = '00:00:00';
    timeDisplay.classList.remove('running');
    
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    lapBtn.disabled = true;
    
    lapList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = formatTime(elapsedTime);
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        lapList.insertBefore(lapItem, lapList.firstChild);
    }
}

// Initialize button states
pauseBtn.style.display = 'none';
lapBtn.disabled = true;

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            if (isRunning) {
                pauseStopwatch();
            } else {
                startStopwatch();
            }
            break;
        case 'KeyR':
            event.preventDefault();
            resetStopwatch();
            break;
        case 'KeyL':
            event.preventDefault();
            recordLap();
            break;
    }
});
