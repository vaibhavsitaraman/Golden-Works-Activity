const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const submitButton = document.getElementById('submit');
const scoreDisplay = document.getElementById('score');

canvas.width = 800; // Set canvas width
canvas.height = 525; // Set canvas height

const circleRadius = 40; // Updated radius to 40px
const circle = {x:0, y:0};

// Function to draw a circle at the clicked position
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2); // Updated radius
  ctx.fillStyle = 'rgba(0, 0, 255, 0.4)'; // Light blue semi-transparent circle
  ctx.fill();
  ctx.closePath();
  console.log(x);
  console.log(y);
}

// Event listener for clicking on the canvas to place circles
canvas.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // remove prev circle
  const x = e.offsetX;
  const y = e.offsetY;
  drawCircle(x, y); // draw new circle
  circle.x = x;
  circle.y=y;
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
  const mythologicalRegions = [
    { x: 370, y: 130, width: 110, height: 290, allegory: "Venus", exp: "Venus is the centerpiece of many of Botticelli's paintings. She is the god of love, marriage, etc." }, // Example region (rectangle)
    { x: 0, y: 200, width: 125, height: 300, allegory: "Mercury", exp: "Mercury is the god of boundaries, and he is shown hear dispelling clouds from the garden."}, // Replace with actual mythological regions
    { x: 325, y: 0, width: 120, height: 50, allegory: "Cupid", exp: "The god of affection, Cupid is portrayed alongside Venus, the god of love. This particular cupid is blind."}, // Add more regions as needed
    { x: 135, y: 200, width: 200, height: 300, allegory: "Three Graces", exp: "The Three Graces are sisters who are associated with Venus. From left to right, they are Voluptas (Pleasure), Castitas (Chastity), and Pulchritudo (Beauty)."},
    { x: 615, y: 120, width: 145, height: 140, allegory: "Zephyrus", exp: "The personification of the West wind, Zephyrus is depicted here kidnapping a nymph."},
    { x: 500, y: 180, width: 150, height: 300, allegory: "Chloris/Flora", exp: "On the right is Chloris, the nymph who is kidnapped by Zephyrus and turned into the goddess Flora, who is found on the left scattering rose petals."},
  ];

  mythologicalRegions.forEach(region => {
    if (isCenterInsideRegion(circle, region)) {
      localStorage.setItem('allegory', region.allegory);
      localStorage.setItem('exp', region.exp);
    }
  });

  return score;
}

// Event listener for submit button
submitButton.addEventListener('click', () => {
  calculateScore();
  window.location.href = 'score.html'; // Redirect to score.html
});
