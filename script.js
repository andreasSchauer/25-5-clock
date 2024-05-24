"use strict";

const sessionHeading = document.getElementById("session-heading")
const hoursCountdown = document.getElementById("hours");
const minutesCountdown = document.getElementById("minutes");
const secondsCountdown = document.getElementById("seconds");

const sessionUpButton = document.getElementById("session-up");
const sessionDownButton = document.getElementById("session-down");
const breakUpButton = document.getElementById("break-up");
const breakDownButton = document.getElementById("break-down");

const increment1 = document.getElementById("increment-1");
const increment5 = document.getElementById("increment-5");
const increment10 = document.getElementById("increment-10");
const increment30 = document.getElementById("increment-30");
const incrementers = document.getElementsByClassName("incrementer");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

const sessionDurationHTML = document.getElementById("session-duration");
const breakDurationHTML = document.getElementById("break-duration");

let sessionDuration = 25;
let breakDuration = 5;
let totalSessionSeconds = sessionDuration * 60;
let totalBreakSeconds = breakDuration * 60;
let increment = 1
let countdown;
let isTimerActive = false;


const doubleDigit = (num) => num >= 10 ? String(num) : "0" + num;

const calculateTime = (duration) => {
  const hours = parseInt(duration / 3600);
  const minutes = parseInt((duration - hours * 3600) / 60);
  const seconds = parseInt(duration - hours * 3600 - minutes * 60);
  
  hoursCountdown.textContent = doubleDigit(hours);
  minutesCountdown.textContent = doubleDigit(minutes);
  secondsCountdown.textContent = doubleDigit(seconds);
}

const changeIncrement = (value) => {
  for(let incrementer of incrementers) {
    if(incrementer.textContent === value) {
        incrementer.classList = "incrementer highlight";
        increment = Number(value);
    } else {
        incrementer.classList = "incrementer";  
    }
  }
}


const startSessionCountdown = () => {
  totalSessionSeconds--;
  calculateTime(totalSessionSeconds);
  sessionHeading.textContent = "Session";
}

const startBreakCountdown = () => {
  totalBreakSeconds--;
  calculateTime(totalBreakSeconds);
  sessionHeading.textContent = "Break";
}

const countdownLogic = () => {
  if (totalSessionSeconds > 0) {
    startSessionCountdown();
    return
  }
  
  if (totalBreakSeconds > 0) {
    startBreakCountdown();
    return
  }
  
  totalSessionSeconds = sessionDuration * 60;
  totalBreakSeconds = breakDuration * 60;
}


sessionUpButton.addEventListener("click", () => {
  if(!isTimerActive) {
    sessionDuration += increment;
    sessionDurationHTML.textContent = doubleDigit(sessionDuration);

    totalSessionSeconds = sessionDuration * 60;
    calculateTime(totalSessionSeconds);
  }
})

sessionDownButton.addEventListener("click", () => {
  if(!isTimerActive) {
    sessionDuration = sessionDuration > increment ? sessionDuration - increment : 1;
    sessionDurationHTML.textContent = doubleDigit(sessionDuration);

    totalSessionSeconds = sessionDuration * 60;
    calculateTime(totalSessionSeconds);
  }
})

breakUpButton.addEventListener("click", () => {
  if(!isTimerActive) {
    breakDuration += increment;
    breakDurationHTML.textContent = doubleDigit(breakDuration);

    totalBreakSeconds = breakDuration * 60;
  } 
})

breakDownButton.addEventListener("click", () => {
  if(!isTimerActive) {
    breakDuration = breakDuration > increment ? breakDuration - increment : 1;
    breakDurationHTML.textContent = doubleDigit(breakDuration);
    totalBreakSeconds = breakDuration * 60;
  }
})


increment1.addEventListener("click", () => {
  changeIncrement(increment1.textContent);
})

increment5.addEventListener("click", () => {
  changeIncrement(increment5.textContent);
})

increment10.addEventListener("click", () => {
  changeIncrement(increment10.textContent);
})

increment30.addEventListener("click", () => {
  changeIncrement(increment30.textContent);
})


startButton.addEventListener("click", () => {
  clearInterval(countdown);
  isTimerActive = true;
  countdown = setInterval(countdownLogic, 10);
})

pauseButton.addEventListener("click", () => {
  clearInterval(countdown);
})

resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  isTimerActive = false;
  changeIncrement(increment1.textContent);
  
  sessionDuration = 25;
  breakDuration = 5;
  sessionDurationHTML.textContent = doubleDigit(sessionDuration);
  breakDurationHTML.textContent = doubleDigit(breakDuration);
  sessionHeading.textContent = "Session";
  
  totalSessionSeconds = sessionDuration * 60;
  totalBreakSeconds = breakDuration * 60;
  calculateTime(totalSessionSeconds);
})
