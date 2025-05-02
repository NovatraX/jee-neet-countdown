const jeeExamDate = new Date(2026, 0, 5); // Example: January 5, 2026
const neetExamDate = new Date(2026, 4, 3); // Example: May 3, 2026
const jeeAdvExamDate = new Date(2026, 5, 7); // Example: June 7, 2026

function getTimeRemaining(endDate) {
    const total = endDate - new Date();

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return { total, days, hours, minutes, seconds };
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function loadPreferences(jeeCountdownSection, neetCountdownSection, jeeAdvCountdownSection) {
    chrome.storage.sync.get(["showJEE", "showNEET", "showJEEADV"], function (data) {
        const showJEE = data.showJEE !== undefined ? data.showJEE : true;
        const showNEET = data.showNEET !== undefined ? data.showNEET : true;
        const showJEEADV = data.showJEEADV !== undefined ? data.showJEEADV : true;

        if (jeeCountdownSection) jeeCountdownSection.style.display = showJEE ? "block" : "none";
        if (neetCountdownSection) neetCountdownSection.style.display = showNEET ? "block" : "none";
        if (jeeAdvCountdownSection) jeeAdvCountdownSection.style.display = showJEEADV ? "block" : "none";
    });
}

export { jeeExamDate, neetExamDate, jeeAdvExamDate, getTimeRemaining, formatTime, loadPreferences };
