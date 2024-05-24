"use strict";

const sessionHeading = document.getElementById("session-heading")
const hoursCountdown = document.getElementById("hours");
const minutesCountdown = document.getElementById("minutes");
const secondsCountdown = document.getElementById("seconds");

const sessionUpButton = document.getElementById("session-up");
const sessionDownButton = document.getElementById("session-down");
const breakUpButton = document.getElementById("break-up");
const breakDownButton = document.getElementById("break-down");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

const sessionDurationHTML = document.getElementById("session-duration");
const breakDurationHTML = document.getElementById("break-duration");

let sessionDuration;
let breakDuration;
let totalSessionSeconds;
let totalBreakSeconds;
let countdown;
let isTimerActive = false;



window.onload = () => {
  sessionDuration = 25;
  breakDuration = 5;
  totalSessionSeconds = sessionDuration * 60;
  totalBreakSeconds = breakDuration * 60;
}

const format = (num) => num >= 10 ? String(num) : "0" + num;

const calculateTime = (duration) => {
  const hours = parseInt(duration / 3600);
  const minutes = parseInt((duration - hours * 3600) / 60);
  const seconds = parseInt(duration - hours * 3600 - minutes * 60);
  
  hoursCountdown.textContent = format(hours);
  minutesCountdown.textContent = format(minutes);
  secondsCountdown.textContent = format(seconds);
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
    sessionDuration++;
    sessionDurationHTML.textContent = format(sessionDuration);

    totalSessionSeconds = sessionDuration * 60;
    calculateTime(totalSessionSeconds);
  }
})

sessionDownButton.addEventListener("click", () => {
  if(!isTimerActive) {
    sessionDuration = sessionDuration > 1 ? sessionDuration - 1 : 1;
    sessionDurationHTML.textContent = format(sessionDuration);

    totalSessionSeconds = sessionDuration * 60;
    calculateTime(totalSessionSeconds);
  }
})

breakUpButton.addEventListener("click", () => {
  if(!isTimerActive) {
    breakDuration++;
    breakDurationHTML.textContent = format(breakDuration);

    totalBreakSeconds = breakDuration * 60;
  } 
})

breakDownButton.addEventListener("click", () => {
  if(!isTimerActive) {
    breakDuration = breakDuration > 1 ? breakDuration - 1 : 1;
    breakDurationHTML.textContent = format(breakDuration);
    totalBreakSeconds = breakDuration * 60;
  }
})

startButton.addEventListener("click", () => {
  clearInterval(countdown);
  isTimerActive = true;
  countdown = setInterval(countdownLogic, 1000);
})

pauseButton.addEventListener("click", () => {
  clearInterval(countdown);
})

resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  isTimerActive = false;
  
  sessionDuration = 25;
  breakDuration = 5;
  sessionDurationHTML.textContent = format(sessionDuration);
  breakDurationHTML.textContent = format(breakDuration);
  sessionHeading.textContent = "Session";
  
  totalSessionSeconds = sessionDuration * 60;
  totalBreakSeconds = breakDuration * 60;
  calculateTime(totalSessionSeconds);
})
