cs = (val) => console.log(val);

const canvas = document.querySelector('canvas');

window.addEventListener("resize",  () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    
})

let c = canvas.getContext('2d');

// c.fillStyle = "rgba(0, 50, 244, 0.6)"
// c.fillRect(120,180, 100, 100);
// c.fillRect(100,100, 100, 100);
// c.fillStyle = "rgba(0, 200, 244, 0.6)"
// c.fillRect(190,200, 1000, 10);

// line

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(500, 100);
// c.lineTo(200, 600);
// c.strokeStyle = "#1F1"
// c.stroke();

// arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI *2, false)
// c.strokeStyle = "red";
// c.stroke();

// for (let i = 0; i < 3; i++) {
//     let redVal = Math.random() * 255;
//     let greenVal = Math.random() * 255;
//     let blueVal = Math.random() * 255;
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI *2, false)
//     c.strokeStyle = `rgba(${redVal},${greenVal},${blueVal}, 1)`;
//     c.stroke();
// }

let mouse = {
	x: undefined,
	y: undefined
};

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('drag', () => {
	mouse.x = e.x;
	mouse.y = e.y;
});



class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)]

        const minRadius = this.minRadius;
        const maxRadius = 90;

		this.draw = () => {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
			c.fill();
		};

		this.update = () => {
			if (this.x > innerWidth - this.radius || this.x < 0 + this.radius) this.dx = -this.dx;

			if (this.y > innerWidth - this.radius * 2 || this.y < 0 + this.radius) this.dy = -this.dy;

			this.x += this.dx;
			this.y += this.dy;

           
			// interactivity

			if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                
				if (this.radius < maxRadius) this.radius += 1;
			} else if (this.radius > minRadius) {
				this.radius -= 1;
			}

			this.draw();
		};
	}
}



var colorArray = [
    "#ffaa33",
    "#ffee11",
    "#eeff00",
    "#f24321",
    "0022ff"
]

var circleArray = [];

const init = () => {
    
    circleArray = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 40 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;
    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

const animate = () => {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
};

animate();

init();