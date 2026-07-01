const display = document.getElementById("display");
const status = document.getElementById("status");
const lapList = document.getElementById("lapList");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

let startTime = 0;
let elapsedTime = 0;
let interval = null;
let running = false;
let lapCount = 1;

function updateTime() {

    elapsedTime = Date.now() - startTime;

    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.textContent =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${String(milliseconds).padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {

    if (running) return;

    running = true;

    startTime = Date.now() - elapsedTime;

    interval = setInterval(updateTime, 10);

    status.textContent = "RUNNING";
    status.style.color = "#22c55e";

});

pauseBtn.addEventListener("click", () => {

    if (!running) return;

    running = false;

    clearInterval(interval);

    status.textContent = "PAUSED";
    status.style.color = "#f59e0b";

});

resetBtn.addEventListener("click", () => {

    running = false;

    clearInterval(interval);

    elapsedTime = 0;

    lapCount = 1;

    display.textContent = "00:00:00";

    status.textContent = "READY";
    status.style.color = "#60a5fa";

    lapList.innerHTML = "";

});

lapBtn.addEventListener("click", () => {

    if (!running) return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${display.textContent}</span>
    `;

    lapList.prepend(li);

    lapCount++;

});

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        running ? pauseBtn.click() : startBtn.click();

    }

    if (e.key === "r" || e.key === "R")
        resetBtn.click();

    if (e.key === "l" || e.key === "L")
        lapBtn.click();

});