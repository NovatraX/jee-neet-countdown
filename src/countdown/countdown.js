import { jeeExamDate, neetExamDate, jeeAdvExamDate, getTimeRemaining, formatTime, loadPreferences } from "../common/countdown-data.js";

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

        if (jeeTime.total <= 0) {
            jeeTimerElement.innerHTML = "Exam day has arrived!";
        } else {
            jeeTimerElement.innerHTML = `
                <div class="time-block">${jeeTime.days}<span>days</span></div>
                <div class="time-block">${formatTime(jeeTime.hours)}<span>hours</span></div>
                <div class="time-block">${formatTime(jeeTime.minutes)}<span>min</span></div>
                <div class="time-block">${formatTime(jeeTime.seconds)}<span>sec</span></div>
            `;
        }
    }

    if (neetTimerElement) {
        const neetTime = getTimeRemaining(neetExamDate);

        if (neetTime.total <= 0) {
            neetTimerElement.innerHTML = "Exam day has arrived!";
        } else {
            neetTimerElement.innerHTML = `
                <div class="time-block">${neetTime.days}<span>days</span></div>
                <div class="time-block">${formatTime(neetTime.hours)}<span>hours</span></div>
                <div class="time-block">${formatTime(neetTime.minutes)}<span>min</span></div>
                <div class="time-block">${formatTime(neetTime.seconds)}<span>sec</span></div>
            `;
        }
    }

    if (jeeAdvTimerElement) {
        const jeeAdvTime = getTimeRemaining(jeeAdvExamDate);

        if (jeeAdvTime.total <= 0) {
            jeeAdvTimerElement.innerHTML = "Exam day has arrived!";
        } else {
            jeeAdvTimerElement.innerHTML = `
                <div class="time-block">${jeeAdvTime.days}<span>days</span></div>
                <div class="time-block">${formatTime(jeeAdvTime.hours)}<span>hours</span></div>
                <div class="time-block">${formatTime(jeeAdvTime.minutes)}<span>min</span></div>
                <div class="time-block">${formatTime(jeeAdvTime.seconds)}<span>sec</span></div>
            `;
        }
    }
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = `
        .timer {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        
        .time-block {
            text-align: center;
            padding: 10px;
            min-width: 60px;
        }
        
        .time-block span {
            display: block;
            font-size: 14px;
            font-weight: normal;
            margin-top: 5px;
            color: #666;
        }
    `;
    document.head.appendChild(style);

    loadPreferences(jeeCountdownSection, neetCountdownSection, jeeAdvCountdownSection);
    updateCountdown();
    setInterval(updateCountdown, 1000);

    if (optionsLink) {
        optionsLink.addEventListener("click", openOptions);
    }
});
