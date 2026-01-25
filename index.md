<!DOCTYPE html>
<html>
<head>
    <title>NEON FLY | GLOBAL RIVALS</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; background: #050505; color: #fff; font-family: 'Orbitron', sans-serif; overflow: hidden; touch-action: manipulation; }
        canvas { display: block; margin: auto; border: 4px solid #00f2ff; box-shadow: 0 0 20px #00f2ff; background: #000; }
        #ui { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.85); z-index: 10; }
        input { padding: 15px; background: #111; border: 2px solid #ff00ff; color: #fff; font-family: 'Orbitron'; margin-bottom: 10px; text-align: center; outline: none; }
        button { padding: 15px 30px; background: #ff00ff; border: none; color: #fff; cursor: pointer; font-family: 'Orbitron'; font-weight: bold; transition: 0.2s; }
        button:hover { background: #00f2ff; color: #000; box-shadow: 0 0 15px #00f2ff; }
        #hud { position: fixed; top: 20px; width: 100%; display: flex; justify-content: space-around; font-size: 20px; color: #00f2ff; pointer-events: none; }
        #leaderboard { margin-top: 20px; color: #00f2ff; font-size: 14px; text-align: center; }
        .score-row { display: flex; justify-content: space-between; width: 200px; border-bottom: 1px solid #333; padding: 5px 0; }
    </style>
</head>
<body>

<div id="ui">
    <h1 style="color:#00f2ff; text-shadow: 0 0 10px #00f2ff;">NEON FLY</h1>
    <input type="text" id="username" placeholder="NAME YOUR PILOT" maxlength="10">
    <button id="start-btn">START MISSION</button>
    <div id="leaderboard">
        <h3>GLOBAL TOP 5</h3>
        <div id="scores-list">Loading...</div>
    </div>
</div>

<div id="hud">
    <div>SCORE: <span id="current-score">0</span></div>
    <div>BEST: <span id="high-score">0</span></div>
</div>
<canvas id="gameCanvas"></canvas>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// --- FIREBASE CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyD9I2tePOBy4OdbFjbAzxAPvvziqvoe0QI",
    authDomain: "neonverse-aars.firebaseapp.com",
    projectId: "neonverse-aars",
    databaseURL: "https://neonverse-aars-default-rtdb.firebaseio.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- GAME CONFIG ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 600;

let gameActive = false;
let score = 0;
let localBest = localStorage.getItem('neonFlyBest') || 0;
document.getElementById('high-score').innerText = localBest;

const bird = {
    x: 50, y: 300, vel: 0, grav: 0.5, jump: -8, size: 25,
    update() {
        this.vel += this.grav;
        this.y += this.vel;
        if (this.y + this.size > canvas.height || this.y < 0) endGame();
    },
    draw() {
        ctx.fillStyle = '#ff00ff';
        ctx.shadowBlur = 15; ctx.shadowColor = '#ff00ff';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.shadowBlur = 0;
    }
};

let pipes = [];
class Pipe {
    constructor() {
        this.x = canvas.width;
        this.w = 60;
        this.gap = 160;
        this.top = Math.random() * (canvas.height - this.gap - 100) + 50;
    }
    draw() {
        ctx.fillStyle = '#00f2ff';
        ctx.fillRect(this.x, 0, this.w, this.top);
        ctx.fillRect(this.x, this.top + this.gap, this.w, canvas.height);
    }
    update() { this.x -= 3; }
}

// --- GLOBAL SCORES LOGIC ---
function updateLeaderboard() {
    const scoresRef = query(ref(db, 'scores'), orderByChild('val'), limitToLast(5));
    onValue(scoresRef, (snapshot) => {
        const list = document.getElementById('scores-list');
        list.innerHTML = '';
        let data = [];
        snapshot.forEach(child => { data.push(child.val()); });
        data.reverse().forEach(entry => {
            list.innerHTML += `<div class="score-row"><span>${entry.name}</span><span>${entry.val}</span></div>`;
        });
    });
}
updateLeaderboard();

function saveGlobalScore(name, val) {
    if (val <= 0) return;
    set(ref(db, 'scores/' + name + "_" + Date.now()), { name, val });
}

// --- ENGINE ---
function endGame() {
    if (!gameActive) return;
    gameActive = false;
    const name = document.getElementById('username').value || "Guest";
    
    if (score > localBest) {
        localBest = score;
        localStorage.setItem('neonFlyBest', score);
        document.getElementById('high-score').innerText = score;
    }
    
    saveGlobalScore(name, score);
    document.getElementById('ui').style.display = 'flex';
}

function reset() {
    bird.y = 300; bird.vel = 0; pipes = []; score = 0;
    document.getElementById('current-score').innerText = 0;
}

window.startGame = () => {
    document.getElementById('ui').style.display = 'none';
    reset(); gameActive = true; loop();
};
document.getElementById('start-btn').onclick = window.startGame;

// Input
const flap = () => { if(gameActive) bird.vel = bird.jump; };
window.onkeydown = (e) => { if(e.code === 'Space') flap(); };
canvas.onmousedown = flap;

let frame = 0;
function loop() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frame % 100 === 0) pipes.push(new Pipe());

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].draw();

        // Hitbox Collision
        if (bird.x + bird.size > pipes[i].x && bird.x < pipes[i].x + pipes[i].w) {
            if (bird.y < pipes[i].top || bird.y + bird.size > pipes[i].top + pipes[i].gap) endGame();
        }

        if (pipes[i].x === 51) {
            score++;
            document.getElementById('current-score').innerText = score;
        }
        if (pipes[i].x < -60) pipes.splice(i, 1);
    }

    bird.update();
    bird.draw();
    frame++;
    requestAnimationFrame(loop);
}
</script>
</body>
</html>
