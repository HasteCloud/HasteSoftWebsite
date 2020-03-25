var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

const colour = '#444'; //04BBD3

const resize = () => {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

const elements = [];
const presets = {};

let size = 0.1;
let sizeFunctionId;
let drawScalingObjectB = false;
let scalingObjectX = 0;
let scalingObjectY = 0;
let scalingObjectType = '';

function drawObject(x,y,s,type) {
    switch(type) {
        case 'o':
            elements.push(presets.o(x, y, s, 0, 0));
            break;
        case 'x':
        default:
            elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
            break;
    }
}

function drawAnyObject(x,y,s) {
    let type = '';
    if (Math.round(Math.random()) === 1) type = 'o';
    else type = 'x';
    drawObject(x, y, s, type);
}

function drawScalingObject(ctx, time) {
    let item;
    switch(scalingObjectType) {
        case 'o':
            item = presets.o(scalingObjectX, scalingObjectY, size, 0, 0);
            break;
        case 'x':
        default:
            item = presets.x(scalingObjectX, scalingObjectY, size, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360));
            break;
    }
    item.draw(ctx, time);
}

document.addEventListener('mousedown', (event) => {
    drawScalingObjectB = true;
    scalingObjectX = event.pageX;
    scalingObjectY = event.pageY;
    if (scalingObjectType === '') scalingObjectType = (Math.round(Math.random()) === 1) ? 'o': 'x';
    sizeFunctionId = setInterval(function() {
        size += 0.1;
    }, 50);
});

document.addEventListener('mouseup', (event) => {
    clearInterval(sizeFunctionId);
    drawScalingObjectB = false;
    drawObject(scalingObjectX, scalingObjectY, size, scalingObjectType);
    scalingObjectType = '';
    size = 0.1;
});

presets.o = (x, y, s, dx, dy) => {
    return {
        x,
        y,
        r: 12 * s,
        w: 5 * s,
        dx,
        dy,
        draw(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx.beginPath();
            ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = colour;
            ctx.stroke();
        }
    };
};

presets.x = (x, y, s, dx, dy, dr, r) => {
    r = r || 0;
    return {
        x,
        y,
        s: 20 * s,
        w: 5 * s,
        r,
        dx,
        dy,
        dr,
        draw(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            const _this = this;
            const line = (x, y, tx, ty, c, o) => {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };
            
            ctx.save();
            
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, colour);
            line(1, -1, -1, 1, colour);
            
            ctx.restore();
        }
    };
};

for (let x = 0; x < Canvas.width; x++) {
    for (let y = 0; y < Canvas.height; y++) {
        if (Math.round(Math.random() * 8000) === 1) {
            const s = ((Math.random() * 5) + 1) / 10;
            drawAnyObject(x, y, s);
        }
    }
}

setInterval(() => {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    const time = new Date().getTime();

    drawScalingObjectB && drawScalingObject(ctx, time);
    for (const element of elements) element.draw(ctx, time);
}, 10);
