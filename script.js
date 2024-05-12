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
    w: 30,
    h: 40,
    radius: 25,
    color: "green",
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    },
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw()

    if (jump) {
        if (dino.y > 20) {
            dino.y -= 3;
        } else {
            jump = false;
        }
    } else if (dino.y < 100) {
        dino.y += 3;
    }

    window.requestAnimationFrame(draw);
}

init();

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        jump = true;
    }
});