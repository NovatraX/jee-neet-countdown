import { jeeExamDate, neetExamDate, jeeAdvExamDate } from "../common/countdown-data.js";

document.addEventListener("DOMContentLoaded", function () {
    const preferencesForm = document.getElementById("preferences-form");
    const showJEECheckbox = document.getElementById("show-jee");
    const showNEETCheckbox = document.getElementById("show-neet");
    const showJEEAdvCheckbox = document.getElementById("show-jee-adv");

    // Display exam dates
    const jeeDate = document.getElementById("jee-date");
    const neetDate = document.getElementById("neet-date");
    const jeeAdvDate = document.getElementById("jeeadv-date");

    if (jeeDate) jeeDate.textContent = jeeExamDate.toLocaleDateString();
    if (neetDate) neetDate.textContent = neetExamDate.toLocaleDateString();
    if (jeeAdvDate) jeeAdvDate.textContent = jeeAdvExamDate.toLocaleDateString();

    chrome.storage.sync.get(["showJEE", "showNEET", "showJEEADV"], function (data) {
        showJEECheckbox.checked = data.showJEE !== undefined ? data.showJEE : true;
        showNEETCheckbox.checked = data.showNEET !== undefined ? data.showNEET : true;
        showJEEAdvCheckbox.checked = data.showJEEADV !== undefined ? data.showJEEADV : true;
    });

    preferencesForm.addEventListener("submit", function (event) {
        event.preventDefault();

        chrome.storage.sync.set(
            {
                showJEE: showJEECheckbox.checked,
                showNEET: showNEETCheckbox.checked,
                showJEEADV: showJEEAdvCheckbox.checked,
            },
            function () {
                const message = document.createElement("div");
                message.textContent = "Preferences saved!";
                message.style.color = "green";
                message.style.marginTop = "10px";
                message.style.padding = "5px";

                const existingMessage = document.querySelector(".save-message");
                if (existingMessage) {
                    existingMessage.remove();
                }

                message.className = "save-message";
                preferencesForm.appendChild(message);

                setTimeout(function () {
                    message.remove();
                }, 3000);
            }
        );
    });
});
