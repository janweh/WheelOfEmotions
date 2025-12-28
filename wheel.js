// Wheel visualization using SVG
class EmotionWheel {
    constructor(svgElement) {
        this.svg = svgElement;
        this.centerX = 500;
        this.centerY = 500;
        this.innerRadius = 100;
        this.middleRadius = 200;
        this.outerRadius = 350;
        this.primaryEmotions = getPrimaryEmotions();
        this.init();
    }

    init() {
        this.drawWheel();
    }

    drawWheel() {
        // Clear existing content
        this.svg.innerHTML = '';

        // Update viewBox for larger wheel
        this.svg.setAttribute('viewBox', '0 0 1000 1000');

        const emotionOrder = ['joy', 'anticipation', 'anger', 'disgust', 'sadness', 'surprise', 'fear', 'trust'];
        const angleStep = (Math.PI * 2) / 8;

        emotionOrder.forEach((emotionKey, index) => {
            const emotion = EMOTIONS[emotionKey];
            const startAngle = index * angleStep - Math.PI / 2;
            const endAngle = (index + 1) * angleStep - Math.PI / 2;
            const midAngle = (startAngle + endAngle) / 2;

            // Draw three intensity levels for each emotion
            this.drawSegment(startAngle, endAngle, this.middleRadius, this.outerRadius, emotion.color, emotion, 'high');
            this.drawSegment(startAngle, endAngle, this.innerRadius, this.middleRadius, this.lightenColor(emotion.color, 0.3), emotion, 'medium');
            this.drawSegment(startAngle, endAngle, 0, this.innerRadius, this.lightenColor(emotion.color, 0.6), emotion, 'low');

            // Add labels for each intensity level
            // Outer ring label (high intensity)
            this.addTextLabel(
                midAngle,
                (this.middleRadius + this.outerRadius) / 2,
                emotion.intensity.high.toUpperCase(),
                '16',
                '#333'
            );

            // Middle ring label (medium intensity)
            this.addTextLabel(
                midAngle,
                (this.innerRadius + this.middleRadius) / 2,
                emotion.intensity.medium.toUpperCase(),
                '14',
                '#333'
            );

            // Inner ring label (low intensity)
            this.addTextLabel(
                midAngle,
                this.innerRadius / 2,
                emotion.intensity.low.toUpperCase(),
                '12',
                '#555'
            );
        });

        // Add center circle
        const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerCircle.setAttribute('cx', this.centerX);
        centerCircle.setAttribute('cy', this.centerY);
        centerCircle.setAttribute('r', this.innerRadius * 0.15);
        centerCircle.setAttribute('fill', '#f8f9fa');
        centerCircle.setAttribute('stroke', '#dee2e6');
        centerCircle.setAttribute('stroke-width', '2');
        this.svg.appendChild(centerCircle);
    }

    addTextLabel(angle, radius, text, fontSize, fill) {
        const x = this.centerX + Math.cos(angle) * radius;
        const y = this.centerY + Math.sin(angle) * radius;

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('class', 'emotion-label');
        label.setAttribute('fill', fill);
        label.setAttribute('font-size', fontSize);
        label.setAttribute('font-weight', '600');
        label.textContent = text;

        // Rotate text to follow the arc
        const rotationAngle = (angle * 180 / Math.PI);
        label.setAttribute('transform', `rotate(${rotationAngle}, ${x}, ${y})`);

        this.svg.appendChild(label);
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
