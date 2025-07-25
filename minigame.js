const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameArea = document.getElementById("gamearea");

// Fix for blurry rendering on high-DPI screens:
const rect = gameArea.getBoundingClientRect();
const scale = window.devicePixelRatio || 1;

// Set canvas internal pixel size based on physical pixels
canvas.width = rect.width * scale;
canvas.height = rect.height * scale;

// Style size remains the same in CSS
canvas.style.width = rect.width + "px";
canvas.style.height = rect.height + "px";

// Scale drawing operations to match pixel ratio
ctx.scale(scale, scale);

let gameStarted = false;

const player = {
  x: 50,
  y: 50,
  size: 30,
  color: "blue",
  speed: 5
};

const keys = {};

window.addEventListener("keydown", (e) => {
  if (!gameStarted && e.key === "Enter") {
    gameStarted = true;
  }
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function drawStartScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale); // use scaled size

  ctx.fillStyle = "white";
  ctx.font = "10px 'Press Start 2P'";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / (2 * scale), canvas.height / (2 * scale));
}

function update() {
  if (keys["'"]) player.x += player.speed; // Apostrophe = right
  if (keys["L"] || keys["l"]) player.x -= player.speed;
  if (keys["P"] || keys["p"]) player.y -= player.speed;
  if (keys[";"]) player.y += player.speed;

  // Clamp within canvas bounds (scaled)
  player.x = Math.max(0, Math.min(canvas.width / scale - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height / scale - player.size, player.y));
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
  if (!gameStarted) {
    drawStartScreen();
  } else {
    update();
    drawGame();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
