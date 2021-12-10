const timer = document.getElementById("timer");
const daysSpan = document.getElementById("days");
const daysText = document.getElementById("days-text");
const hoursSpan = document.getElementById("hours");
const hoursText = document.getElementById("hours-text");
const minutesSpan = document.getElementById("minutes");
const minutesText = document.getElementById("minutes-text");
const secondsSpan = document.getElementById("seconds");
const secondsText = document.getElementById("seconds-text");

const DEADLINE = new Date("2022-01-01T00:00:00Z");

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.code === "Enter") {
    toggleFullScreen();
  }
});

document.addEventListener("dblclick", function () {
  toggleFullScreen();
});

const cases = [2, 0, 1, 1, 1, 2];
function plural(number, titles) {
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ];
}

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.max(Math.floor((t / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((t / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((t / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(t / (1000 * 60 * 60 * 24)), 0);

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

let timeinterval;

function initializeClock(endtime) {
  function updateClock() {
    const time = getTimeRemaining(endtime);

    daysSpan.textContent = time.days;
    daysText.textContent = plural(time.days, ["день", "дня", "дней"]);
    hoursSpan.textContent = ("0" + time.hours).slice(-2);
    hoursText.textContent = plural(time.hours, ["час", "часа", "часов"]);
    minutesSpan.textContent = ("0" + time.minutes).slice(-2);
    minutesText.textContent = plural(time.minutes, ["минута", "минуты", "минут"]);
    secondsSpan.textContent = ("0" + time.seconds).slice(-2);
    secondsText.textContent = plural(time.seconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);

    if (time.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

initializeClock(
  new Date(DEADLINE.getTime() + DEADLINE.getTimezoneOffset() * 60000)
);
