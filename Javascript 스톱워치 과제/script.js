const display = document.getElementById("display");
let timer = null; // no-value
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
display.textContent = "00:00:00:00";

const laps = [];
const lapList = document.getElementById("laps");

function start() {
    if(!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        // console.log(timer);
    }

    // console.log(startTime);
}

function stop() {

    if(isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;

        laps.push(elapsedTime);
        renderLaps();
    }

}

function reset() {
    clearInterval(timer);
    timer = null; // no-value
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
}

function update() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;

}

function renderLaps() {
    lapList.innerHTML = "";
    laps.forEach((lap, idx) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${idx + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}