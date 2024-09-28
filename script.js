const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

canvas.width = 800; // Set canvas width
canvas.height = 525; // Set canvas height

let clickCount = 0;
const maxCircles = 6;
const circleRadius = 40; // Updated radius to 40px
const circles = [];

// Function to draw a circle at the clicked position
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2); // Updated radius
    ctx.fillStyle = 'rgba(0, 0, 255, 0.4)'; // Light blue semi-transparent circle
    ctx.fill();
    ctx.closePath();
}

// Event listener for clicking on the canvas to place circles
canvas.addEventListener('click', (e) => {
    if (clickCount < maxCircles) {
        const x = e.offsetX;
        const y = e.offsetY;
        drawCircle(x, y);
        circles.push({x, y});
        clickCount += 1;
    } else {
        alert('You have placed the maximum of 6 circles.');
    }
});

// Function to check if the center of a circle is inside a specified region
function isCenterInsideRegion(circle, region) {
    // Check if the center of the circle (circle.x, circle.y) is within the rectangle defined by the region
    return (
        circle.x > region.x &&
        circle.x < region.x + region.width &&
        circle.y > region.y &&
        circle.y < region.y + region.height
    );
}

// Function to calculate score based on circle placement
function calculateScore() {
    let score = 0;
    const mythologicalRegions = [
        {x: 50, y: 100, width: 150, height: 150}, // Example region (rectangle)
        {x: 350, y: 250, width: 150, height: 150}, // Replace with actual mythological regions
        {x: 600, y: 200, width: 150, height: 150}, // Add more regions as needed
        // Add up to 6 regions in total or modify accordingly
    ];

    circles.forEach(circle => {
        mythologicalRegions.forEach(region => {
            if (isCenterInsideRegion(circle, region)) {
                score += 1; // Increase score if the center of the circle is inside a region
            }
        });
    });

    return score;
}

// Event listener for submit button
submitButton.addEventListener('click', () => {
    const score = calculateScore();
    localStorage.setItem('score', score); // Save score to localStorage for the score.html page
    window.location.href = 'score.html'; // Redirect to score.html
});
