import { jeeExamDate, neetExamDate, jeeAdvExamDate, getTimeRemaining, formatTime, loadPreferences } from "../common/countdown-data.js";

// DOM elements
const currentDateElement = document.getElementById("current-date");
const currentTimeElement = document.getElementById("current-time");
const quoteTextElement = document.getElementById("quote-text");
const quoteAuthorElement = document.getElementById("quote-author");
const jeeTimerElement = document.getElementById("jee-timer");
const neetTimerElement = document.getElementById("neet-timer");
const jeeAdvTimerElement = document.getElementById("jee-adv-timer");
const jeeCountdownSection = document.getElementById("jee-countdown");
const neetCountdownSection = document.getElementById("neet-countdown");
const jeeAdvCountdownSection = document.getElementById("jee-adv-countdown");
const optionsLink = document.getElementById("options-link");

// Collection of motivational quotes
const motivationalQuotes = [
    { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Learning is never done without errors and defeat.", author: "Vladimir Lenin" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
];

// Function to update the current date and time
function updateDateTime() {
    const now = new Date();

    // Format date: Monday, May 2, 2025
    const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", dateOptions);
    currentDateElement.textContent = formattedDate;

    // Format time: 14:30:45
    const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    const formattedTime = now.toLocaleTimeString("en-US", timeOptions);
    currentTimeElement.textContent = formattedTime;
}

// Function to display a random motivational quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[randomIndex];

    quoteTextElement.textContent = `"${quote.text}"`;
    quoteAuthorElement.textContent = `— ${quote.author}`;
}

// Function to update the countdown timers
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

// Options link click handler
if (optionsLink) {
    optionsLink.addEventListener("click", function () {
        chrome.runtime.openOptionsPage();
    });
}

// Initialize page
function initializePage() {
    // Initial updates
    updateDateTime();
    displayRandomQuote();
    updateCountdown();

    // Load user preferences
    loadPreferences(jeeCountdownSection, neetCountdownSection, jeeAdvCountdownSection);

    // Set up intervals
    setInterval(updateDateTime, 1000); // Update time every second
    setInterval(updateCountdown, 1000); // Update countdown every second

    // Change quote every hour
    setInterval(displayRandomQuote, 3600000);
}

// Start the page
document.addEventListener("DOMContentLoaded", initializePage);
