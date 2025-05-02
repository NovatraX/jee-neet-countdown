import { jeeExamDate, neetExamDate, jeeAdvExamDate, getTimeRemaining, loadPreferences } from "../common/countdown-data.js";

const jeeTimerElement = document.getElementById("jee-timer");
const neetTimerElement = document.getElementById("neet-timer");
const jeeAdvTimerElement = document.getElementById("jee-adv-timer");
const jeeCountdownSection = document.getElementById("jee-countdown");
const neetCountdownSection = document.getElementById("neet-countdown");
const jeeAdvCountdownSection = document.getElementById("jee-adv-countdown");
const optionsLink = document.getElementById("options-link");

function updateCountdown() {
    if (jeeTimerElement) {
        const jeeTime = getTimeRemaining(jeeExamDate);
        jeeTimerElement.innerHTML = `${jeeTime.days} days, ${jeeTime.hours} hours, ${jeeTime.minutes} minutes, ${jeeTime.seconds} seconds`;

        if (jeeTime.total <= 0) {
            jeeTimerElement.innerHTML = "Exam day has arrived!";
        }
    }

    if (neetTimerElement) {
        const neetTime = getTimeRemaining(neetExamDate);
        neetTimerElement.innerHTML = `${neetTime.days} days, ${neetTime.hours} hours, ${neetTime.minutes} minutes, ${neetTime.seconds} seconds`;

        if (neetTime.total <= 0) {
            neetTimerElement.innerHTML = "Exam day has arrived!";
        }
    }

    if (jeeAdvTimerElement) {
        const jeeAdvTime = getTimeRemaining(jeeAdvExamDate);
        jeeAdvTimerElement.innerHTML = `${jeeAdvTime.days} days, ${jeeAdvTime.hours} hours, ${jeeAdvTime.minutes} minutes, ${jeeAdvTime.seconds} seconds`;

        if (jeeAdvTime.total <= 0) {
            jeeAdvTimerElement.innerHTML = "Exam day has arrived!";
        }
    }
}

function openSettings() {
    chrome.runtime.openOptionsPage();
}

function openFullCountdown() {
    chrome.tabs.create({
        url: chrome.runtime.getURL("src/countdown/countdown.html"),
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadPreferences(jeeCountdownSection, neetCountdownSection, jeeAdvCountdownSection);
    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.getElementById("settings-link").addEventListener("click", openSettings);
    document.getElementById("open-countdown").addEventListener("click", openFullCountdown);
});
