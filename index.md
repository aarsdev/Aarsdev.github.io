<!DOCTYPE html>
<html>
<head>
    <title>NEON FLY | ARCADE</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; background: #050505; color: #fff; font-family: 'Orbitron', sans-serif; overflow: hidden; touch-action: manipulation; }
        canvas { display: block; margin: auto; border: 4px solid #00f2ff; box-shadow: 0 0 20px #00f2ff; }
        #ui { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); z-index: 10; }
        input { padding: 15px; background: #111; border: 2px solid #ff00ff; color: #fff; font-family: 'Orbitron'; margin-bottom: 10px; text-align: center; }
        button { padding: 15px 30px; background: #ff00ff; border: none; color: #fff; cursor: pointer; font-family: 'Orbitron'; font-weight: bold; }
        #score-board { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); font-size: 30px; color: #00f2ff; text-shadow: 0 0 10px #00f2ff; pointer-events: none; }
    </style>
</head>
<body>

<div id="ui">
    <h1 style="color:#00f2ff">NEON FLY</h1>
    <input type="text" id="username" placeholder="NAME YOUR PILOT" maxlength="10">
    <button onclick="startGame()">START MISSION</button>
</div>

<div id="score-board">0</div>
<canvas id="gameCanvas"></canvas>

<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score-board');
const lobby = document.getElementById('ui');

canvas.width = 400;
canvas.height = 600;

let gameActive = false;
let score = 0;
let pipes = [];
let frame = 0;

// --- 1. THE PLAYER (The code you shared!) ---
const bird = {
    x: 50,
    y: 300,
    velocity: 0,
    gravity: 0.6,
    lift: -8,
    size: 25,
    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y + this.size > canvas.height) { this.y = canvas.height - this.size; gameOver(); }
        if (this.y < 0) { this.y = 0; this.velocity = 0; }
    },
    show() {
        ctx.fillStyle = '#ff00ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff00ff';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.shadowBlur = 0; // Reset glow for other items
    }
};

// --- 2. THE OBSTACLES (Pipes) ---
class Pipe {
    constructor() {
        this.gap = 150;
        this.width = 60;
        this.top = Math.random() * (canvas.height / 2);
        this.x = canvas.width;
    }
    show() {
        ctx.fillStyle = '#00f2ff';
        ctx.fillRect(this.x, 0, this.width, this.top); // Top Pipe
        ctx.fillRect(this.x, this.top + this.gap, this.width, canvas.height); // Bottom Pipe
    }
    update() {
        this.x -= 3;
    }
}

// --- 3. CORE SYSTEMS ---
function startGame() {
    const name = document.getElementById('username').value || "PILOT";
    lobby.style.display = 'none';
    resetGame();
    gameActive = true;
    draw();
}

function resetGame() {
    bird.y = 300; bird.velocity = 0;
    pipes = []; score = 0; frame = 0;
    scoreEl.innerText = score;
}

function gameOver() {
    gameActive = false;
    lobby.style.display = 'flex';
    lobby.querySelector('h1').innerText = "MISSION FAILED";
}

// Controls
window.addEventListener('keydown', (e) => { if(e.code === 'Space') bird.up(); });
canvas.addEventListener('mousedown', () => bird.up());

bird.up = function() { this.velocity = this.lift; };

// --- 4. THE GAME LOOP ---
function draw() {
    if (!gameActive) return;

    // Clear Screen
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spawn Pipes
    if (frame % 90 === 0) pipes.push(new Pipe());

    // Update/Draw Pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();

        // Collision Check
        if (bird.x + bird.size > pipes[i].x && bird.x < pipes[i].x + pipes[i].width) {
            if (bird.y < pipes[i].top || bird.y + bird.size > pipes[i].top + pipes[i].gap) {
                gameOver();
            }
        }

        // Score Check
        if (pipes[i].x === 51) {
            score++;
            scoreEl.innerText = score;
        }

        if (pipes[i].x < -60) pipes.splice(i, 1);
    }

    bird.update();
    bird.show();
    
    frame++;
    requestAnimationFrame(draw);
}
</script>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
    <title>NEON FLY | JUICED</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; background: #020205; color: #fff; font-family: 'Orbitron', sans-serif; overflow: hidden; touch-action: manipulation; }
        canvas { display: block; margin: auto; border: 4px solid #00f2ff; background: #000; cursor: crosshair; }
        #ui { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); z-index: 100; }
        .btn { padding: 15px 40px; background: #ff00ff; border: none; color: #fff; cursor: pointer; font-family: 'Orbitron'; font-weight: bold; font-size: 1.2rem; clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); transition: 0.2s; }
        .btn:hover { background: #00f2ff; color: #000; transform: scale(1.1); }
        #hud { position: fixed; top: 20px; width: 100%; display: flex; justify-content: space-around; font-size: 24px; color: #00f2ff; pointer-events: none; text-shadow: 0 0 10px #00f2ff; }
    </style>
</head>
<body>

<div id="ui">
    <h1 style="color:#00f2ff; font-size: 3rem; text-shadow: 0 0 20px #00f2ff;">NEON FLY</h1>
    <input type="text" id="username" placeholder="ENTER CALLSIGN" maxlength="10" style="padding:15px; margin-bottom:20px; background:#111; border:2px solid #ff00ff; color:white; font-family:'Orbitron'; text-align:center;">
    <button class="btn" onclick="startGame()">IGNITE ENGINES</button>
    <div id="leaderboard" style="margin-top:30px; width:250px; text-align:center;">
        <h3 style="color:#ff00ff">TOP PILOTS</h3>
        <div id="scores-list">Syncing...</div>
    </div>
</div>

<div id="hud">
    <div>KM: <span id="current-score">0</span></div>
    <div>RECORD: <span id="high-score">0</span></div>
</div>
<canvas id="gameCanvas"></canvas>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// --- FIREBASE SETUP ---
const firebaseConfig = { apiKey: "AIzaSyD9I2tePOBy4OdbFjbAzxAPvvziqvoe0QI", authDomain: "neonverse-aars.firebaseapp.com", projectId: "neonverse-aars", databaseURL: "https://neonverse-aars-default-rtdb.firebaseio.com" };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 600;

// --- STATE ---
let gameActive = false, score = 0, frame = 0, shake = 0, particles = [], powerups = [], pipes = [];
let hasShield = false;

// --- OBJECTS ---
const bird = {
    x: 60, y: 300, vel: 0, grav: 0.5, jump: -8, rot: 0,
    update() {
        this.vel += this.grav;
        this.y += this.vel;
        this.rot = Math.min(Math.PI/4, Math.max(-Math.PI/4, this.vel * 0.1));
        if (this.y > canvas.height || this.y < 0) triggerDeath();
    },
    draw() {
        ctx.save();
        ctx.translate(this.x + 15, this.y + 15);
        ctx.rotate(this.rot);
        ctx.shadowBlur = 15; ctx.shadowColor = hasShield ? '#00ff00' : '#ff00ff';
        ctx.fillStyle = hasShield ? '#00ff00' : '#ff00ff';
        ctx.fillRect(-15, -15, 30, 30);
        if (hasShield) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(-18, -18, 36, 36); }
        ctx.restore();
    }
};

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random()-0.5)*10; this.vy = (Math.random()-0.5)*10;
        this.life = 1.0;
    }
    draw() {
        this.x += this.vx; this.y += this.vy; this.life -= 0.02;
        ctx.fillStyle = `rgba(255, 0, 255, ${this.life})`;
        ctx.fillRect(this.x, this.y, 4, 4);
    }
}

// --- CORE FUNCTIONS ---
function triggerDeath() {
    if (!gameActive) return;
    if (hasShield) { hasShield = false; shake = 20; return; }
    gameActive = false;
    shake = 30;
    for(let i=0; i<20; i++) particles.push(new Particle(bird.x, bird.y));
    const name = document.getElementById('username').value || "PILOT";
    set(ref(db, 'scores/' + name + Date.now()), { name, val: score });
    setTimeout(() => document.getElementById('ui').style.display = 'flex', 1000);
}

window.startGame = () => {
    document.getElementById('ui').style.display = 'none';
    score = 0; pipes = []; powerups = []; gameActive = true; bird.y = 300; bird.vel = 0; hasShield = false;
    loop();
};

const flap = () => { if(gameActive) bird.vel = bird.jump; };
window.onkeydown = (e) => { if(e.code === 'Space') flap(); };
canvas.onmousedown = flap;

function loop() {
    if (!gameActive && particles.length === 0) return;
    
    // Screenshake effect
    ctx.save();
    if (shake > 0) { ctx.translate((Math.random()-0.5)*shake, (Math.random()-0.5)*shake); shake *= 0.9; }

    ctx.fillStyle = '#020205'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Stars (Parallax)
    ctx.fillStyle = '#fff';
    for(let i=0; i<20; i++) ctx.fillRect((i*50 - frame*0.5)%canvas.width, (i*137)%canvas.height, 2, 2);

    if (gameActive) {
        if (frame % 90 === 0) pipes.push({ x: canvas.width, w: 60, gap: 170, top: Math.random()*250 + 50 });
        if (frame % 500 === 0) powerups.push({ x: canvas.width, y: Math.random()*400+100, type: 'shield' });

        pipes.forEach((p, i) => {
            p.x -= 3;
            ctx.fillStyle = '#00f2ff';
            ctx.fillRect(p.x, 0, p.w, p.top);
            ctx.fillRect(p.x, p.top + p.gap, p.w, canvas.height);
            if (bird.x + 25 > p.x && bird.x < p.x + p.w && (bird.y < p.top || bird.y + 25 > p.top + p.gap)) {
                if(hasShield) { hasShield = false; pipes.splice(i, 1); shake = 15; } else triggerDeath();
            }
            if (p.x === 51) { score++; document.getElementById('current-score').innerText = score; }
        });

        powerups.forEach((pu, i) => {
            pu.x -= 3;
            ctx.fillStyle = '#00ff00'; ctx.beginPath(); ctx.arc(pu.x, pu.y, 10, 0, Math.PI*2); ctx.fill();
            if (Math.hypot(bird.x-pu.x, bird.y-pu.y) < 30) { hasShield = true; powerups.splice(i, 1); }
        });

        bird.update(); bird.draw();
    }

    particles.forEach((p, i) => { p.draw(); if(p.life <= 0) particles.splice(i, 1); });
    
    ctx.restore();
    frame++;
    requestAnimationFrame(loop);
}

// Leaderboard Sync
onValue(query(ref(db, 'scores'), orderByChild('val'), limitToLast(5)), (snap) => {
    const list = document.getElementById('scores-list'); list.innerHTML = '';
    let data = []; snap.forEach(c => data.push(c.val()));
    data.reverse().forEach(e => list.innerHTML += `<div style="display:flex; justify-content:space-between"><span>${e.name}</span><span>${e.val}</span></div>`);
});
</script>
</body>
</html>
