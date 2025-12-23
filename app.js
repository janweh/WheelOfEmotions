// Main application logic
let wheel;
let questionnaire;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Initialize the emotion wheel
    const svgElement = document.getElementById('emotion-wheel');
    wheel = new EmotionWheel(svgElement);

    // Initialize questionnaire
    questionnaire = new EmotionQuestionnaire();

    // Setup tab switching
    setupTabs();

    // Setup emotion details modal
    setupEmotionDetails();

    // Setup questionnaire restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
        questionnaire.restart();
    });
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabName}-view`).classList.add('active');

            // If switching to questionnaire, start it
            if (tabName === 'questionnaire') {
                questionnaire.start();
            }
        });
    });
}

function setupEmotionDetails() {
    const detailsModal = document.getElementById('emotion-details');
    const closeBtn = detailsModal.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        detailsModal.classList.add('hidden');
    });

    // Close on background click
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.classList.add('hidden');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            detailsModal.classList.add('hidden');
        }
    });
}

function showEmotionDetails(emotion, intensity) {
    const detailsModal = document.getElementById('emotion-details');
    const emotionName = document.getElementById('emotion-name');
    const emotionDefinition = document.getElementById('emotion-definition');
    const emotionExample = document.getElementById('emotion-example');
    const emotionIntensity = document.getElementById('emotion-intensity');
    const intensityInfo = document.getElementById('intensity-info');

    // Set emotion name based on intensity
    let displayName = emotion.name;
    if (emotion.intensity && intensity) {
        displayName = emotion.intensity[intensity] || emotion.name;
    }

    emotionName.textContent = displayName;
    emotionDefinition.textContent = emotion.definition;
    emotionExample.textContent = emotion.example;

    // Show intensity variations if available
    if (emotion.intensity) {
        intensityInfo.style.display = 'block';
        emotionIntensity.innerHTML = `
            <strong>Low:</strong> ${emotion.intensity.low}<br>
            <strong>Medium:</strong> ${emotion.intensity.medium}<br>
            <strong>High:</strong> ${emotion.intensity.high}
        `;
    } else {
        intensityInfo.style.display = 'none';
    }

    // Show modal
    detailsModal.classList.remove('hidden');
}

// Make showEmotionDetails available globally for wheel.js
window.showEmotionDetails = showEmotionDetails;
