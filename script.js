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

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw()

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