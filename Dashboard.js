let timerId;
let startTime, pausedTime;
let runningTime = 0;

function resetTimer() {
  clearInterval(timerId);
  let storedTime = localStorage.getItem("timerValue");
  if (storedTime) {
    runningTime = parseInt(storedTime);
  } else {
    runningTime = 0;
  }
  startTime = new Date().getTime() - runningTime;
  timerId = setInterval(() => {
    const now = new Date().getTime();
    runningTime = now - startTime;
    localStorage.setItem("timerValue", runningTime.toString());
    const hours = Math.floor(runningTime / 3600000);
    const minutes = Math.floor((runningTime % 3600000) / 60000);
    const seconds = Math.floor((runningTime % 60000) / 1000);
    if (hours >= 3) {
      clearInterval(timerId);
      document.getElementById("milestone").style.backgroundColor = "green";
      alert("You have reached 3 hours of work!");
    }
    document.getElementById("hours").innerText = `${hours}hrs`;
    document.getElementById("minutes").innerText = `${minutes}m`;
    document.getElementById("seconds").innerText = `${seconds}s`;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  pausedTime = runningTime;
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("pausedTime", pausedTime);
}

function startTimer() {
  const date = new Date();
  const today = date.toDateString();
  const lastWorkDate = localStorage.getItem("lastWorkDate");
  if (!lastWorkDate === today) {
    alert("You can only start once per day");
    return;
  }
  localStorage.setItem("lastWorkDate", today);

  const storedStartTime = localStorage.getItem("startTime");
  const storedPausedTime = localStorage.getItem("pausedTime");
  if (storedStartTime && storedPausedTime) {
    startTime = parseInt(storedStartTime);
    pausedTime = parseInt(storedPausedTime);
    runningTime = pausedTime;
    resetTimer();
  } else {
    startTime = new Date().getTime();
    resetTimer();
  }
}


const todayDateElement = document.getElementById("today-date");
todayDateElement.innerText = new Date().toLocaleDateString();

document.querySelector("#start-btn").addEventListener("click", startTimer);
document.querySelector("#stop-btn").addEventListener("click", pauseTimer);


let timerId1;
let inactiveTime = 0;
const inactiveTimeout = 10 * 60 * 1000; // 10 minutes

const resetInactiveTimer = () => {
  inactiveTime = 0;
  updateInactiveTime(inactiveTimeout - inactiveTime);
};

const pauseIfInactive = () => {
  inactiveTime += 1000;
  if (inactiveTime == inactiveTimeout) { // Check if timer hasn't been paused already
    // Pause timer here
    pauseTimer();
    alert("Timer has been paused due to inactivity");
  }
  updateInactiveTime(inactiveTimeout - inactiveTime);
};


let mouseMoveTimeoutId;
const resetMouseMoveTimeout = () => {
  clearTimeout(mouseMoveTimeoutId);
  mouseMoveTimeoutId = setTimeout(resetInactiveTimer, 1000);
};

const updateInactiveTime = (time) => {
  let remainderTime = time >= 0 ? time : 0; // Ensure remainder time is non-negative
  const remainderMinutes = Math.floor(remainderTime / 1000 / 60);
  const remainderSeconds = Math.floor((remainderTime / 1000) % 60);
  document.getElementById("Remainder").innerText = `${remainderMinutes}m ${remainderSeconds}s`;
};


document.addEventListener("mousemove", resetMouseMoveTimeout);
document.addEventListener("keydown", resetMouseMoveTimeout);

timerId1 = setInterval(() => {
  pauseIfInactive();
}, 1000);

