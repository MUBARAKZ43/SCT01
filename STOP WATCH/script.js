// script.js

let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Format time
function timeToString(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Start timer
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = timeToString(elapsedTime);
    }, 10);

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

// Stop timer
function stop() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Reset timer
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.00";

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

// Event listeners
startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
