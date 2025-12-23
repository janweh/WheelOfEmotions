// Questionnaire logic based on decision tree
class EmotionQuestionnaire {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.questions = [
            {
                id: 'valence',
                text: 'Does this feeling seem pleasant or unpleasant?',
                answers: [
                    { text: 'Pleasant - it feels good', value: 'pleasant' },
                    { text: 'Unpleasant - it feels bad', value: 'unpleasant' },
                    { text: 'Neutral or mixed', value: 'neutral' }
                ]
            },
            {
                id: 'energy',
                text: 'What is your energy level right now?',
                answers: [
                    { text: 'High energy - I feel activated, tense, or energized', value: 'high' },
                    { text: 'Low energy - I feel calm, depleted, or tired', value: 'low' }
                ]
            },
            {
                id: 'orientation',
                text: 'Is this feeling focused on...',
                answers: [
                    { text: 'The past - something that already happened', value: 'past' },
                    { text: 'The present - what\'s happening right now', value: 'present' },
                    { text: 'The future - what might happen', value: 'future' }
                ]
            },
            {
                id: 'agency',
                text: 'Do you feel like acting...',
                answers: [
                    { text: 'Outward - toward something or someone', value: 'outward' },
                    { text: 'Inward - withdrawing or turning away', value: 'inward' }
                ]
            },
            {
                id: 'intensity',
                text: 'How intense is this feeling?',
                answers: [
                    { text: 'Mild - barely noticeable', value: 'low' },
                    { text: 'Moderate - clearly present', value: 'medium' },
                    { text: 'Intense - very strong', value: 'high' }
                ]
            }
        ];
    }

    start() {
        this.currentQuestion = 0;
        this.answers = {};
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionContainer = document.getElementById('question-container');
        const answersContainer = document.getElementById('answers-container');
        const progressFill = document.querySelector('.progress-fill');

        // Update progress
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressFill.style.width = progress + '%';

        // Show question
        document.getElementById('question-text').textContent = question.text;

        // Clear previous answers
        answersContainer.innerHTML = '';

        // Add answer buttons
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer.text;
            button.addEventListener('click', () => this.handleAnswer(question.id, answer.value));
            answersContainer.appendChild(button);
        });
    }

    handleAnswer(questionId, value) {
        this.answers[questionId] = value;

        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    findMatchingEmotion() {
        const { valence, energy, orientation, agency, intensity } = this.answers;

        // Decision tree logic
        let matchedEmotions = [];

        // Handle neutral/surprise case
        if (valence === 'neutral') {
            matchedEmotions.push({ emotion: EMOTIONS.surprise, score: 10 });
        } else {
            // Filter emotions based on characteristics
            Object.entries(EMOTIONS).forEach(([key, emotion]) => {
                if (emotion.isDyad) return; // Skip dyads for now

                let score = 0;

                // Match valence
                if (emotion.valence === valence) score += 4;

                // Match energy
                if (emotion.energy === energy) score += 3;

                // Match orientation
                if (emotion.orientation === orientation) score += 2;

                // Match agency
                if (emotion.agency === agency) score += 1;

                if (score > 5) {
                    matchedEmotions.push({ emotion, score, key });
                }
            });
        }

        // Sort by score
        matchedEmotions.sort((a, b) => b.score - a.score);

        // Get best match
        let result = matchedEmotions[0]?.emotion || EMOTIONS.joy;
        let emotionKey = matchedEmotions[0]?.key || 'joy';

        // Get intensity level name
        let intensityName = result.name;
        if (result.intensity) {
            intensityName = result.intensity[intensity] || result.name;
        }

        return {
            emotion: result,
            intensity: intensity,
            intensityName: intensityName,
            key: emotionKey,
            alternatives: matchedEmotions.slice(1, 3).map(m => ({
                emotion: m.emotion,
                key: m.key
            }))
        };
    }

    showResult() {
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');
        const resultEmotion = document.getElementById('result-emotion');

        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        const match = this.findMatchingEmotion();

        let resultHTML = `
            <h3 style="margin-bottom: 15px;">${match.intensityName}</h3>
            <p style="margin-bottom: 20px;"><strong>Primary Emotion:</strong> ${match.emotion.name}</p>
            <div style="text-align: left; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <p style="margin-bottom: 10px;"><strong>Definition:</strong></p>
                <p style="margin-bottom: 15px;">${match.emotion.definition}</p>
                <p style="margin-bottom: 10px;"><strong>Example:</strong></p>
                <p>${match.emotion.example}</p>
            </div>
        `;

        if (match.intensity && match.emotion.intensity) {
            resultHTML += `
                <div style="text-align: left; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    <p style="margin-bottom: 8px;"><strong>Intensity Scale:</strong></p>
                    <p style="font-size: 0.95rem;">
                        ${match.emotion.intensity.low} → ${match.emotion.intensity.medium} → ${match.emotion.intensity.high}
                    </p>
                </div>
            `;
        }

        if (match.alternatives.length > 0) {
            resultHTML += `
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; text-align: left;">
                    <p style="margin-bottom: 10px; font-size: 0.9rem;"><strong>You might also be feeling:</strong></p>
                    <p style="font-size: 0.9rem;">
                        ${match.alternatives.map(alt => alt.emotion.name).join(', ')}
                    </p>
                </div>
            `;
        }

        resultEmotion.innerHTML = resultHTML;
    }

    restart() {
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');

        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');

        this.start();
    }
}
