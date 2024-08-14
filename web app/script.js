let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        running = true;
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});


pauseBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(interval);
        running = false;
        
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    running = false;
    difference = 0;
    lapCounter = 0;
    timeDisplay.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});


lapBtn.addEventListener('click', function() {
    lapCounter++;
    const lapTime = timeDisplay.textContent;
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsContainer.appendChild(lapDiv);
});
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
