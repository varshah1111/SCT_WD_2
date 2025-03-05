class Stopwatch {
    constructor(display) {
        this.display = display;
        this.reset();
    }

    reset() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.laps = [];
        this.lastLapTime = 0;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.updateDisplay(), 10);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
        }
    }

    lap() {
        const currentTime = this.elapsedTime;
        const lapTime = currentTime - this.lastLapTime;
        this.lastLapTime = currentTime;
        this.laps.push(lapTime);
        return this.formatTime(lapTime);
    }

    updateDisplay() {
        this.elapsedTime = Date.now() - this.startTime;
        this.display.textContent = this.formatTime(this.elapsedTime);
    }

    formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    }
}

// DOM Elements
const display = document.querySelector('.display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

// Initialize Stopwatch
const stopwatch = new Stopwatch(display);

// Event Listeners
startBtn.addEventListener('click', () => {
    stopwatch.start();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    stopwatch.pause();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    stopwatch.pause();
    stopwatch.reset();
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
    const lapTime = stopwatch.lap();
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${stopwatch.laps.length}: ${lapTime}`;
    lapTimes.insertBefore(lapItem, lapTimes.firstChild);
});