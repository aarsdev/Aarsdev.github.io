<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>NEON FLY | ELITE ARCADE</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <style>
        :root { --neon-blue: #00f2ff; --neon-pink: #ff00ff; --neon-green: #00ff00; }
        body { margin: 0; background: #020205; color: #fff; font-family: 'Orbitron', sans-serif; overflow: hidden; touch-action: manipulation; }
        
        /* UI Overlay */
        #ui { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.85); z-index: 100; transition: 0.5s; }
        .menu-card { background: #111; padding: 30px; border: 2px solid var(--neon-blue); box-shadow: 0 0 20px var(--neon-blue); text-align: center; border-radius: 10px; }
        
        input { padding: 12px; background: #000; border: 1px solid var(--neon-pink); color: white; font-family: 'Orbitron'; margin-bottom: 15px; text-align: center; width: 200px; }
        
        .btn { padding: 12px 30px; background: var(--neon-pink); border: none; color: #fff; cursor: pointer; font-family: 'Orbitron'; font-weight: bold; font-size: 1rem; transition: 0.2s; border-radius: 5px; }
        .btn:hover { background: var(--neon-blue); color: #000; transform: scale(1.05); }

        /* Game HUD */
        #hud { position: fixed; top: 15px; width: 100%; display: flex; justify-content: space-around; font-size: 20px; color: var(--neon-blue); pointer-events: none; text-shadow: 0 0 8px var(--neon-blue); z-index: 50; }
        
        canvas { display: block; margin: auto; background: #000; cursor: pointer; }
        
        #leaderboard { margin-top: 20px; font-size: 12px; }
        .score-item { display: flex; justify-content: space-between; width: 100%; border-bottom: 1px solid #222; margin: 3px 0; }
    </style>
</head>
<body>

<div id="ui">
    <div class="menu-card">
        <h1 style="color:var(--neon-blue); margin-top:0;">NEON FLY</h1>
        <input type="text" id="username" placeholder="NAME YOUR PILOT" maxlength="10">
        <br>
        <button class="btn" onclick="startGame()">START MISSION</button>
        
        <div id="leaderboard">
            <h3 style="color:var(--neon-pink)">GLOBAL TOP 5</h3>
            <div id="scores-list">Syncing...</div>
        </div>
    </div>
</div>

<div id="hud">
    <div>DIST: <span id="cur-score">0</span>km</div>
    <div>BEST: <span id="best-score">0</span>km</div>
</div>

<canvas id="gameCanvas"></canvas>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// --- BACKEND SETUP ---
const firebaseConfig = { apiKey: "AIzaSyD9I2tePOBy4OdbFjbAzxAPvvziqvoe0QI", authDomain: "neonverse-aars.firebaseapp.com", projectId: "neonverse-aars", databaseURL: "https://neonverse-aars-default-rtdb.firebaseio.com" };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 600;

// --- GAME STATE ---
let active = false, score = 0, frame = 0, shake = 0;
let pipes = [], particles = [], powerups = [];
let hasShield = false;
let highscore = localStorage.getItem('neonFlyHigh') || 0;
document.getElementById('best-score').innerText = highscore;

// --- CLASSES ---
class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.vx = (Math.random()-0.5)*12; this.vy = (Math.random()-0.5)*12;
        this.life = 1.0; this.color = color;
    }
    update() { this.x += this.vx; this.y += this.vy; this.life -= 0.02; }
    draw() { ctx.fillStyle = `rgba(255, 0, 255, ${this.life})`; ctx.fillRect(this.x, this.y, 4, 4); }
}

const bird = {
    x: 60, y: 300, vel: 0, grav: 0.5, jump: -8, size: 28, rot: 0,
    update() {
        this.vel += this.grav; this.y += this.vel;
        this.rot = Math.min(Math.PI/4, Math.max(-Math.PI/4, this.vel * 0.1));
        if (this.y > canvas.height || this.y < 0) triggerDeath();
    },
    draw() {
        ctx.save();
        ctx.translate(this.x + this.size/2, this.y + this.size/2);
        ctx.rotate(this.rot);
        ctx.shadowBlur = 15; ctx.shadowColor = hasShield ? '#00ff00' : '#ff00ff';
        ctx.fillStyle = hasShield ? '#00ff00' : '#ff00ff';
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        if(hasShield) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.strokeRect(-this.size/2-2, -this.size/2-2, this.size+4, this.size+4); }
        ctx.restore();
    }
};

// --- LOGIC ---
function triggerDeath() {
    if (!active) return;
    if (hasShield) { hasShield = false; shake = 20; return; }
    
    active = false; shake = 30;
    const name = document.getElementById('username').value || "Guest";
    for(let i=0; i<15; i++) particles.push(new Particle(bird.x, bird.y, '#ff00ff'));
    
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('neonFlyHigh', score);
        document.getElementById('best-score').innerText = score;
    }
    
    set(ref(db, 'scores/' + name + Date.now()), { name, val: score });
    setTimeout(() => { document.getElementById('ui').style.display = 'flex'; }, 800);
}

window.startGame = () => {
    document.getElementById('ui').style.display = 'none';
    score = 0; pipes = []; powerups = []; frame = 0; bird.y = 300; bird.vel = 0;
    active = true; hasShield = false; loop();
};

const flap = () => { if(active) bird.vel = bird.jump; };
window.addEventListener('keydown', e => { if(e.code === 'Space') flap(); });
canvas.addEventListener('mousedown', flap);

function loop() {
    if (!active && particles.length === 0) return;
    ctx.save();
    if (shake > 0) { ctx.translate((Math.random()-0.5)*shake, (Math.random()-0.5)*shake); shake *= 0.85; }
    
    // Background & Stars
    ctx.fillStyle = '#020205'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#444'; 
    for(let i=0; i<15; i++) ctx.fillRect((i*100 - frame*0.5)%canvas.width, (i*143)%canvas.height, 2, 2);

    if (active) {
        if (frame % 90 === 0) pipes.push({ x: canvas.width, w: 60, gap: 160, top: Math.random()*250 + 50 });
        if (frame % 600 === 0) powerups.push({ x: canvas.width, y: Math.random()*400+100 });

        pipes.forEach((p, i) => {
            p.x -= 3;
            ctx.fillStyle = '#00f2ff';
            ctx.fillRect(p.x, 0, p.w, p.top);
            ctx.fillRect(p.x, p.top + p.gap, p.w, canvas.height);
            
            // Collision
            if (bird.x + bird.size > p.x && bird.x < p.x + p.w && (bird.y < p.top || bird.y + bird.size > p.top + p.gap)) {
                if(hasShield) { hasShield = false; pipes.splice(i, 1); shake = 20; } else triggerDeath();
            }
            if (p.x === 51) { score++; document.getElementById('cur-score').innerText = score; }
            if (p.x < -60) pipes.splice(i, 1);
        });

        powerups.forEach((pu, i) => {
            pu.x -= 3;
            ctx.fillStyle = '#00ff00'; ctx.beginPath(); ctx.arc(pu.x, pu.y, 10, 0, Math.PI*2); ctx.fill();
            if (Math.hypot(bird.x-pu.x, bird.y-pu.y) < 30) { hasShield = true; powerups.splice(i, 1); }
        });

        bird.update(); bird.draw();
    }

    particles.forEach((p, i) => { p.update(); p.draw(); if(p.life <= 0) particles.splice(i, 1); });
    ctx.restore(); frame++; requestAnimationFrame(loop);
}

// Leaderboard Sync
onValue(query(ref(db, 'scores'), orderByChild('val'), limitToLast(5)), (snap) => {
    const list = document.getElementById('scores-list'); list.innerHTML = '';
    let data = []; snap.forEach(c => data.push(c.val()));
    data.reverse().forEach(e => {
        list.innerHTML += `<div class="score-item"><span>${e.name}</span><span>${e.val}</span></div>`;
    });
});
</script>
</body>
</html>
