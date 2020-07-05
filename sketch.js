const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
    dimensions: [2048, 2048]
};

const sketch = () => {
    const createGrid = () => {
        // const palette = random.pick(palettes);
        const palette = ['#F8C75E', '#FFBA4D', '#EDA252', '#EAAC4C'];

        const points = [];
        const count = 50;
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                points.push({
                    color: random.pick(palette),
                    radius: Math.max(0, random.gaussian() * 0.02),
                    position: [u, v]
                });
            }
        }
        return points;
    };

    random.setSeed(512);
    const points = createGrid().filter(() => random.value() > 0.5);
    const alphabet = ["a ", "b ", "c ", "d ", "e ", "f ", "g ", "h ", "i ", "j ", "k ", "l ", "m ", "n ", "o ", "p ", "q ", "r ", "s ", "t ", "u ", "v ", "w ", "x ", "y", "z"];
    const margin = 200;

    return ({context, width, height}) => {
        context.fillStyle = '#E65100';
        context.fillRect(0, 0, width, height);
        points.forEach((data) => {
            const {
                position,
                radius,
                color
            } = data;
            const [u, v] = position;
            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            // context.beginPath();
            // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
            // context.strokeStyle = 'black';
            // context.lineWidth = 20;
            // context.stroke();
            const letter = random.pick(alphabet);
            context.fillStyle = color;
            context.font = `${radius * width}px Helvetica`;
            context.fillText(letter, x, y);
            context.rotate(100);
            context.restore();
        });
    };
};
canvasSketch(sketch, settings);

const button = document.createElement('button');
const buttonDiv = document.createElement('div');
button.innerText = 'Reset';
buttonDiv.appendChild(button);
document.body.appendChild(buttonDiv);
button.addEventListener('click', () => {
    window.location.reload();
    // sketch();
});
document.body.style.flexDirection = 'column';

