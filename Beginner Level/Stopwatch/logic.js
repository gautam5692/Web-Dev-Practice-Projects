const ms = document.getElementById("ms");
const sec = document.getElementById("sec");
const min = document.getElementById("min");
const hr = document.getElementById("hr");
const btnContainer = document.getElementById("btn-container");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startTimer);

let startTime;
let timeInterval;
let elapsedTime;

function startTimer() {
  requestAnimationFrame((ctime) => {
    startTime = ctime;
    startStopwatch(ctime);
  });
  addBtns();
}

function startStopwatch(ctime) {
  // const ctime = performance.now();
  elapsedTime = Math.floor(ctime - startTime);

  const msValue = Math.floor((elapsedTime % 1000) / 10);
  ms.textContent = formatValue(msValue);

  const secValue = Math.floor((elapsedTime / 1000) % 60);
  sec.textContent = formatValue(secValue);

  const minValue = Math.floor((elapsedTime / 1000 / 60) % 60);
  min.textContent = formatValue(minValue);

  const hrValue = Math.floor((elapsedTime / 1000 / 60 / 60) % 60);
  hr.textContent = formatValue(hrValue);

  timeInterval = requestAnimationFrame(startStopwatch);
}

function formatValue(value) {
  return String(value).padStart(2, "0");
}

function createElem(element, label, handler, classList, id) {
  const elem = document.createElement(element);
  if (label != null) {
    elem.textContent = label;
  }
  if (handler != null) {
    elem.addEventListener("click", handler);
  }
  if (classList != null) {
    elem.classList.add(classList);
  }
  if (id != null) {
    elem.setAttribute("id", id);
  }
  return elem;
}

function addBtns() {
  const resetBtn = createElem(
    "button",
    "Reset",
    resetStopwatch,
    "animate-left"
  );

  const stopBtn = createElem(
    "button",
    "Stop",
    stopStopwatch,
    "animate-opacity",
    "stop-btn"
  );

  const countBtn = createElem("button", "Count", countTimer, "animate-right");

  const fragment = document.createDocumentFragment();
  fragment.appendChild(resetBtn);
  fragment.appendChild(stopBtn);
  fragment.appendChild(countBtn);

  btnContainer.innerHTML = "";
  btnContainer.appendChild(fragment);
}

function resetStopwatch() {
  ms.textContent = "00";
  sec.textContent = "00";
  min.textContent = "00";
  hr.textContent = "00";

  const counterTimeContainer = document.getElementById(
    "counter-time-container"
  );

  if (counterTimeContainer) {
    const mainContainer = document.getElementById("main-container");
    mainContainer.removeChild(counterTimeContainer);
    const stopwatchContainer = document.getElementById("stopwatch-container");
    stopwatchContainer.classList.remove("animate-height");
  }

  const startBtn = createElem("button", "Start", startTimer);

  btnContainer.innerHTML = "";
  btnContainer.appendChild(startBtn);

  cancelAnimationFrame(timeInterval);
}

function stopStopwatch() {
  cancelAnimationFrame(timeInterval);
  const stopBtn = document.getElementById("stop-btn");
  const continueBtn = createElem(
    "button",
    "Continue",
    continueTimer,
    null,
    "continue-btn"
  );
  btnContainer.replaceChild(continueBtn, stopBtn);
}

function continueTimer() {
  startTime = performance.now() - elapsedTime;
  timeInterval = requestAnimationFrame(startStopwatch);
  const continueBtn = document.getElementById("continue-btn");
  const stopBtn = createElem("button", "Stop", stopStopwatch, null, "stop-btn");
  btnContainer.replaceChild(stopBtn, continueBtn);
}

function countTimer() {
  const stopwatchContainer = document.getElementById("stopwatch-container");
  stopwatchContainer.classList.add("animate-height");

  const mainContainer = document.getElementById("main-container");

  let counterTimeContainer = document.getElementById("counter-time-container");

  if (!counterTimeContainer) {
    counterTimeContainer = createElem(
      "div",
      null,
      null,
      null,
      "counter-time-container"
    );
  }

  mainContainer.appendChild(counterTimeContainer);

  const counterTime = createElem("div", null, null, "counter-time", null);
  counterTime.textContent = `${counterTimeContainer.childNodes.length + 1}. ${
    hr.textContent
  } : ${min.textContent} : ${sec.textContent} : ${ms.textContent}`;

  counterTimeContainer.appendChild(counterTime);
}
