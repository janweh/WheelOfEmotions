// Plutchik's Wheel of Emotions Data
const EMOTIONS = {
    // Primary emotions with intensity levels
    joy: {
        name: 'Joy',
        color: '#FFD700',
        definition: 'A feeling of great pleasure and happiness, often in response to a positive experience or outcome.',
        example: 'You feel joy when you receive unexpected good news, like getting accepted into your dream school or reuniting with a loved one after a long time.',
        intensity: {
            low: 'Serenity',
            medium: 'Joy',
            high: 'Ecstasy'
        },
        valence: 'pleasant',
        energy: 'high',
        orientation: 'present',
        agency: 'outward'
    },
    trust: {
        name: 'Trust',
        color: '#90EE90',
        definition: 'A feeling of confidence and security in someone or something, believing they are reliable and honest.',
        example: 'You feel trust when you confide in a close friend about personal matters, knowing they will keep your secrets and support you.',
        intensity: {
            low: 'Acceptance',
            medium: 'Trust',
            high: 'Admiration'
        },
        valence: 'pleasant',
        energy: 'low',
        orientation: 'present',
        agency: 'outward'
    },
    fear: {
        name: 'Fear',
        color: '#98FB98',
        definition: 'An unpleasant emotion caused by the threat of danger, pain, or harm, triggering a protective response.',
        example: 'You feel fear when walking alone at night in an unfamiliar area, or before giving an important presentation.',
        intensity: {
            low: 'Apprehension',
            medium: 'Fear',
            high: 'Terror'
        },
        valence: 'unpleasant',
        energy: 'high',
        orientation: 'future',
        agency: 'inward'
    },
    surprise: {
        name: 'Surprise',
        color: '#87CEEB',
        definition: 'A sudden feeling of wonder or astonishment caused by something unexpected.',
        example: 'You feel surprise when someone throws you an unexpected birthday party, or when you discover an old friend in a new city.',
        intensity: {
            low: 'Distraction',
            medium: 'Surprise',
            high: 'Amazement'
        },
        valence: 'neutral',
        energy: 'high',
        orientation: 'present',
        agency: 'inward'
    },
    sadness: {
        name: 'Sadness',
        color: '#4682B4',
        definition: 'A state of unhappiness or sorrow, often in response to loss, disappointment, or difficult circumstances.',
        example: 'You feel sadness when a relationship ends, when you lose a pet, or when you move away from a place you love.',
        intensity: {
            low: 'Pensiveness',
            medium: 'Sadness',
            high: 'Grief'
        },
        valence: 'unpleasant',
        energy: 'low',
        orientation: 'past',
        agency: 'inward'
    },
    disgust: {
        name: 'Disgust',
        color: '#9370DB',
        definition: 'A strong feeling of revulsion or profound disapproval aroused by something unpleasant or offensive.',
        example: 'You feel disgust when you encounter spoiled food, witness unethical behavior, or experience something that violates your values.',
        intensity: {
            low: 'Boredom',
            medium: 'Disgust',
            high: 'Loathing'
        },
        valence: 'unpleasant',
        energy: 'low',
        orientation: 'present',
        agency: 'outward'
    },
    anger: {
        name: 'Anger',
        color: '#FF6347',
        definition: 'A strong feeling of annoyance, displeasure, or hostility in response to perceived injustice or frustration.',
        example: 'You feel anger when someone treats you unfairly, when you are stuck in traffic making you late, or when your boundaries are violated.',
        intensity: {
            low: 'Annoyance',
            medium: 'Anger',
            high: 'Rage'
        },
        valence: 'unpleasant',
        energy: 'high',
        orientation: 'present',
        agency: 'outward'
    },
    anticipation: {
        name: 'Anticipation',
        color: '#FFA500',
        definition: 'A feeling of excitement or anxiety about something that is going to happen in the future.',
        example: 'You feel anticipation before a vacation, waiting for exam results, or counting down to an important event.',
        intensity: {
            low: 'Interest',
            medium: 'Anticipation',
            high: 'Vigilance'
        },
        valence: 'pleasant',
        energy: 'high',
        orientation: 'future',
        agency: 'outward'
    },
    // Dyads (combinations of primary emotions)
    love: {
        name: 'Love',
        color: '#FFB6C1',
        definition: 'A profound feeling of affection and care (Joy + Trust).',
        example: 'The warm feeling you have toward family members, close friends, or a romantic partner.',
        combination: ['joy', 'trust'],
        isDyad: true
    },
    submission: {
        name: 'Submission',
        color: '#B0E57C',
        definition: 'Acceptance of authority or yielding to another (Trust + Fear).',
        example: 'Following rules without question, or deferring to an expert\'s judgment.',
        combination: ['trust', 'fear'],
        isDyad: true
    },
    awe: {
        name: 'Awe',
        color: '#7EC8E3',
        definition: 'Wonder mixed with fear or reverence (Fear + Surprise).',
        example: 'Standing before a magnificent natural wonder like the Grand Canyon, or witnessing an incredible performance.',
        combination: ['fear', 'surprise'],
        isDyad: true
    },
    disapproval: {
        name: 'Disapproval',
        color: '#6495ED',
        definition: 'A negative judgment or rejection (Surprise + Sadness).',
        example: 'Learning that someone you respected has done something disappointing.',
        combination: ['surprise', 'sadness'],
        isDyad: true
    },
    remorse: {
        name: 'Remorse',
        color: '#8B7AB8',
        definition: 'Deep regret and guilt (Sadness + Disgust).',
        example: 'Feeling terrible after hurting someone\'s feelings, or regretting a poor decision.',
        combination: ['sadness', 'disgust'],
        isDyad: true
    },
    contempt: {
        name: 'Contempt',
        color: '#BA55D3',
        definition: 'Scorn mixed with anger (Disgust + Anger).',
        example: 'The feeling toward someone who repeatedly acts dishonestly or hypocritically.',
        combination: ['disgust', 'anger'],
        isDyad: true
    },
    aggressiveness: {
        name: 'Aggressiveness',
        color: '#FF8C42',
        definition: 'Hostile readiness to attack (Anger + Anticipation).',
        example: 'The competitive drive before a sports match, or preparing to confront someone.',
        combination: ['anger', 'anticipation'],
        isDyad: true
    },
    optimism: {
        name: 'Optimism',
        color: '#FFC04C',
        definition: 'Hopefulness about the future (Anticipation + Joy).',
        example: 'Looking forward to new opportunities, or believing things will work out well.',
        combination: ['anticipation', 'joy'],
        isDyad: true
    }
};

// Helper function to get emotion by name
function getEmotion(name) {
    const key = name.toLowerCase();
    return EMOTIONS[key] || null;
}

// Get all primary emotions (non-dyads)
function getPrimaryEmotions() {
    return Object.entries(EMOTIONS)
        .filter(([_, emotion]) => !emotion.isDyad)
        .map(([key, emotion]) => ({ key, ...emotion }));
}

// Get all dyads
function getDyads() {
    return Object.entries(EMOTIONS)
        .filter(([_, emotion]) => emotion.isDyad)
        .map(([key, emotion]) => ({ key, ...emotion }));
}
