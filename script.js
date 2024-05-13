console.log("hello world!");

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let jump = false;
let lastCactus = 0;

let fpsInterval, startTime, now, then, elapsed;
const init = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    // window.requestAnimationFrame(draw);
    draw();
}

const dino = {
    x: 0,
    y: 100,
    velocity: 4,
    color: "green",
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 40)
    },
};

class Path {
    constructor(x, y, color) {
        this.x = x || 0;
        this.y = y || 130;
        this.color = color || "white";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 300, 1);
        ctx.fillRect(this.x + 300, this.y - 1, 2, 1);
        ctx.fillRect(this.x + 302, this.y - 2, 1, 1);
        ctx.fillRect(this.x + 303, this.y - 3, 3, 1);
        ctx.fillRect(this.x + 306, this.y - 4, 2, 1);
        ctx.fillRect(this.x + 308, this.y - 5, 8, 1);
        ctx.fillRect(this.x + 316, this.y - 4, 2, 1);
        ctx.fillRect(this.x + 318, this.y - 3, 1, 1);
        ctx.fillRect(this.x + 319, this.y - 2, 3, 1);
        ctx.fillRect(this.x + 322, this.y - 1, 2, 1);
        ctx.fillRect(this.x + 324, this.y, 16, 1);
        ctx.fillRect(this.x + 340, this.y + 1, 2, 1);
        ctx.fillRect(this.x + 342, this.y + 2, 1, 1);
        ctx.fillRect(this.x + 343, this.y + 3, 3, 1);
        ctx.fillRect(this.x + 346, this.y + 4, 2, 1);
        ctx.fillRect(this.x + 348, this.y + 5, 8, 1);
        ctx.fillRect(this.x + 356, this.y + 4, 2, 1);
        ctx.fillRect(this.x + 358, this.y + 3, 1, 1);
        ctx.fillRect(this.x + 359, this.y + 2, 3, 1);
        ctx.fillRect(this.x + 362, this.y + 1, 2, 1);
        ctx.fillRect(this.x + 364, this.y, 600 - 364, 1);
    }
}

class Cactus {
    constructor(x, y, color) {
        this.x = x || 600;
        this.y = y || 100;
        this.color = color || "red";
        this.moving = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 40);
    }
}

const path = new Path();
const path2 = new Path(600, 130, "white");
const cactus = new Cactus();
const cactus2 = new Cactus();

const draw = () => {
    window.requestAnimationFrame(draw);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        path.draw(ctx)
        path2.draw(ctx)
        dino.draw()

        path.x -= 4;
        path2.x -= 4;

        if (path.x <= -600) {
            path.x = 600;
        }
        if (path2.x <= -600) {
            path2.x = 600;
        }

        if (jump) {
            dino.velocity *= 0.97;
            if (dino.y > 20) {
                dino.y -= dino.velocity;
            } else {
                jump = false;
            }
        } else if (dino.y < 100) {
            if (dino.velocity < 3) dino.velocity *= 1.03;
            dino.y += dino.velocity;
        } else {
            dino.velocity = 4;
        }

        cactus.draw(ctx);
        cactus2.draw(ctx);

        if (lastCactus > 300) {
            if (Math.random() > 0.99) {
                lastCactus = 0
                if (!cactus.moving) {
                    cactus.moving = true;
                    cactus.x = 600;
                } else if (!cactus2.moving) {
                    cactus2.moving = true;
                    cactus2.x = 600;
                } else lastCactus += 4;
            } else lastCactus += 4;
        } else lastCactus += 4;

        if (cactus.moving) {
            cactus.x -= 4;
            if (cactus.x < -30) {
                cactus.moving = false;
            }
        }

        if (cactus2.moving) {
            cactus2.x -= 4;
            if (cactus2.x < -30) {
                cactus2.moving = false;
            }
        }

        window.requestAnimationFrame(draw);
    }
}

init(60);

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        jump = true;
    }
});