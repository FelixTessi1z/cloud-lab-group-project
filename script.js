document.addEventListener("DOMContentLoaded", function () {
    setActiveNavigation();
    showCurrentYear();
    setupContactMessage();
    setupMeetingCountdown();
    setupEventFilters();
    setupCopyButtons();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");
        link.classList.toggle("active", linkPage === currentPage);
    });
}

function showCurrentYear() {
    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });
}

function setupContactMessage() {
    const contactButton = document.getElementById("contactButton");
    const contactStatus = document.getElementById("contactStatus");

    if (!contactButton || !contactStatus) {
        return;
    }

    contactButton.addEventListener("click", function () {
        contactStatus.textContent = "Thank you for your interest. Please email the group leader or message the club on Discord to join.";
        contactStatus.classList.add("show");
    });
}

function setupMeetingCountdown() {
    const countdownElement = document.getElementById("meetingCountdown");

    if (!countdownElement) {
        return;
    }

    function getNextThursdayMeeting() {
        const now = new Date();
        const meeting = new Date(now);
        const thursday = 4;
        const daysUntilThursday = (thursday - now.getDay() + 7) % 7;

        meeting.setDate(now.getDate() + daysUntilThursday);
        meeting.setHours(16, 0, 0, 0);

        if (meeting <= now) {
            meeting.setDate(meeting.getDate() + 7);
        }

        return meeting;
    }

    function updateCountdown() {
        const now = new Date();
        const meeting = getNextThursdayMeeting();
        const difference = meeting - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        countdownElement.textContent = `${days} day(s), ${hours} hour(s), and ${minutes} minute(s) until the next club meeting.`;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);
}

function setupEventFilters() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const eventItems = document.querySelectorAll("[data-event-type]");

    if (filterButtons.length === 0 || eventItems.length === 0) {
        return;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedType = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active-filter");
            });
            button.classList.add("active-filter");

            eventItems.forEach(function (item) {
                const shouldShow = selectedType === "all" || item.dataset.eventType === selectedType;
                item.hidden = !shouldShow;
            });
        });
    });
}

function setupCopyButtons() {
    const copyButtons = document.querySelectorAll("[data-copy]");

    copyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const textToCopy = button.dataset.copy;
            const originalText = button.textContent;

            navigator.clipboard.writeText(textToCopy).then(function () {
                button.textContent = "Copied";
                setTimeout(function () {
                    button.textContent = originalText;
                }, 1600);
            }).catch(function () {
                button.textContent = textToCopy;
            });
        });
    });
}
