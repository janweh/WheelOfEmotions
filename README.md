# Plutchik's Wheel of Emotions

An interactive web application for exploring Plutchik's Wheel of Emotions with two main features:

1. **Interactive Emotion Wheel** - Click on any emotion to see its definition and examples
2. **Emotion Questionnaire** - Answer guided questions to identify your current emotion

## Features

### Emotion Wheel
- Visual representation of all 8 primary emotions with 3 intensity levels each
- Color-coded segments for easy identification
- Click any emotion to see:
  - Definition
  - Real-world example
  - Intensity variations (mild, moderate, intense)

### Emotion Questionnaire
Uses a decision tree approach to help identify your current emotion:
1. **Valence** - Pleasant or unpleasant feeling?
2. **Energy Level** - High or low energy?
3. **Temporal Orientation** - Past, present, or future focused?
4. **Agency** - Outward or inward directed?
5. **Intensity** - How strong is the feeling?

The questionnaire matches your answers to the closest emotion on Plutchik's wheel.

## Primary Emotions

The wheel includes all 8 primary emotions from Plutchik's model:
- **Joy** (and its variations: Serenity → Joy → Ecstasy)
- **Trust** (Acceptance → Trust → Admiration)
- **Fear** (Apprehension → Fear → Terror)
- **Surprise** (Distraction → Surprise → Amazement)
- **Sadness** (Pensiveness → Sadness → Grief)
- **Disgust** (Boredom → Disgust → Loathing)
- **Anger** (Annoyance → Anger → Rage)
- **Anticipation** (Interest → Anticipation → Vigilance)

## How to Use

1. Open `index.html` in a web browser
2. Choose between two modes:
   - **Emotion Wheel** - Browse and explore emotions directly
   - **Find My Emotion** - Take the questionnaire to identify your current emotion

## Technologies Used

- Pure HTML5, CSS3, and JavaScript (no dependencies)
- SVG for wheel visualization
- Responsive design for mobile and desktop

## File Structure

```
WheelOfEmotions/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── emotions.js         # Emotion data and definitions
├── wheel.js            # Wheel visualization logic
├── questionnaire.js    # Questionnaire decision tree
├── app.js             # Main application logic
└── README.md          # This file
```

## About Plutchik's Theory

Robert Plutchik's psychoevolutionary theory of emotion identifies eight primary emotions that evolved to help organisms survive. These emotions can be experienced at different intensity levels and can combine to form more complex emotional states (dyads).

## License

Free to use for educational and personal purposes.
