console.log("hello world!");

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let jump = false;

const init = () => {
    window.requestAnimationFrame(draw);
}

const dino = {
    x: 0,
    y: 100,
    velocity: 3,
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

const path = new Path();
const path2 = new Path(600, 130, "white");

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    path.draw(ctx)
    path2.draw(ctx)
    dino.draw()

    path.x -= 3;
    path2.x -= 3;

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
        dino.velocity = 3;
    }

    window.requestAnimationFrame(draw);
}

init();

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        jump = true;
    }
});