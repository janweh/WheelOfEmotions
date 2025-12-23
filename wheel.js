// Wheel visualization using SVG
class EmotionWheel {
    constructor(svgElement) {
        this.svg = svgElement;
        this.centerX = 400;
        this.centerY = 400;
        this.innerRadius = 80;
        this.middleRadius = 160;
        this.outerRadius = 300;
        this.primaryEmotions = getPrimaryEmotions();
        this.init();
    }

    init() {
        this.drawWheel();
    }

    drawWheel() {
        // Clear existing content
        this.svg.innerHTML = '';

        const emotionOrder = ['joy', 'anticipation', 'anger', 'disgust', 'sadness', 'surprise', 'fear', 'trust'];
        const angleStep = (Math.PI * 2) / 8;

        emotionOrder.forEach((emotionKey, index) => {
            const emotion = EMOTIONS[emotionKey];
            const startAngle = index * angleStep - Math.PI / 2;
            const endAngle = (index + 1) * angleStep - Math.PI / 2;

            // Draw three intensity levels for each emotion
            this.drawSegment(startAngle, endAngle, this.middleRadius, this.outerRadius, emotion.color, emotion, 'high');
            this.drawSegment(startAngle, endAngle, this.innerRadius, this.middleRadius, this.lightenColor(emotion.color, 0.3), emotion, 'medium');
            this.drawSegment(startAngle, endAngle, 0, this.innerRadius, this.lightenColor(emotion.color, 0.6), emotion, 'low');

            // Add label
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = this.outerRadius + 30;
            const labelX = this.centerX + Math.cos(midAngle) * labelRadius;
            const labelY = this.centerY + Math.sin(midAngle) * labelRadius;

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', labelX);
            label.setAttribute('y', labelY);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('dominant-baseline', 'middle');
            label.setAttribute('class', 'emotion-label');
            label.setAttribute('fill', '#333');
            label.textContent = emotion.name.toUpperCase();
            this.svg.appendChild(label);
        });

        // Add center circle
        const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerCircle.setAttribute('cx', this.centerX);
        centerCircle.setAttribute('cy', this.centerY);
        centerCircle.setAttribute('r', this.innerRadius * 0.8);
        centerCircle.setAttribute('fill', '#f8f9fa');
        centerCircle.setAttribute('stroke', '#dee2e6');
        centerCircle.setAttribute('stroke-width', '2');
        this.svg.appendChild(centerCircle);

        // Add center text
        const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText.setAttribute('x', this.centerX);
        centerText.setAttribute('y', this.centerY);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.setAttribute('dominant-baseline', 'middle');
        centerText.setAttribute('class', 'emotion-label');
        centerText.setAttribute('fill', '#666');
        centerText.setAttribute('font-size', '12');
        centerText.textContent = 'Click any';
        this.svg.appendChild(centerText);

        const centerText2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText2.setAttribute('x', this.centerX);
        centerText2.setAttribute('y', this.centerY + 15);
        centerText2.setAttribute('text-anchor', 'middle');
        centerText2.setAttribute('dominant-baseline', 'middle');
        centerText2.setAttribute('class', 'emotion-label');
        centerText2.setAttribute('fill', '#666');
        centerText2.setAttribute('font-size', '12');
        centerText2.textContent = 'emotion';
        this.svg.appendChild(centerText2);
    }

    drawSegment(startAngle, endAngle, innerRadius, outerRadius, color, emotion, intensity) {
        const path = this.createArcPath(startAngle, endAngle, innerRadius, outerRadius);

        const segment = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        segment.setAttribute('d', path);
        segment.setAttribute('fill', color);
        segment.setAttribute('stroke', 'white');
        segment.setAttribute('stroke-width', '2');
        segment.setAttribute('class', 'emotion-segment');
        segment.setAttribute('data-emotion', emotion.name.toLowerCase());
        segment.setAttribute('data-intensity', intensity);

        segment.addEventListener('click', () => {
            this.onEmotionClick(emotion, intensity);
        });

        this.svg.appendChild(segment);
    }

    createArcPath(startAngle, endAngle, innerRadius, outerRadius) {
        const x1 = this.centerX + Math.cos(startAngle) * innerRadius;
        const y1 = this.centerY + Math.sin(startAngle) * innerRadius;
        const x2 = this.centerX + Math.cos(endAngle) * innerRadius;
        const y2 = this.centerY + Math.sin(endAngle) * innerRadius;
        const x3 = this.centerX + Math.cos(endAngle) * outerRadius;
        const y3 = this.centerY + Math.sin(endAngle) * outerRadius;
        const x4 = this.centerX + Math.cos(startAngle) * outerRadius;
        const y4 = this.centerY + Math.sin(startAngle) * outerRadius;

        const largeArcFlag = 0;

        return `
            M ${x1} ${y1}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
            Z
        `;
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent * 100);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    onEmotionClick(emotion, intensity) {
        if (window.showEmotionDetails) {
            window.showEmotionDetails(emotion, intensity);
        }
    }
}
