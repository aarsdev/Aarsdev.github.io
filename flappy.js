// 1. THE PHYSICS ENGINE (Simple but effective)
class Bird {
    constructor() {
        this.x = 50;
        this.y = 200;
        this.velocity = 0;
        this.gravity = 0.6; // Gravity pulling you down
        this.lift = -10;    // The "Tap" force pushing you up
    }

    show(ctx) {
        ctx.fillStyle = '#ff00ff'; // Neon Pink Bird
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > 400) this.y = 400; // Floor
        if (this.y < 0) this.y = 0;     // Ceiling
    }

    up() {
        this.velocity = this.lift; // The jump!
    }
}

// 2. THE GAME LOOP
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
    bird.update();
    bird.show(ctx);
    requestAnimationFrame(draw);
}
