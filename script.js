let canvas = document.getElementById("canvasId")

let ctx = canvas.getContext("2d");
let FPS = 60;

let then, now, elapsed, fpsInterval;

let bg = {
	src:new Image(),
  	width:canvas.width,
  	height:canvas.height
  }
bg.src.src = "img/fon.jpg";

let obstacles = [
	{
		width: 100,
		height: 20,
		x: 300,
		y: 500,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 578,
		y: 517,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 700,
		y: 300,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 700,
		y: 300,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 160,
		y: 447,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 121,
		y: 358,
		img: new Image()
	}

	,
	{
		width: 100,
		height: 20,
		x: 730,
		y: 194,
		img: new Image()
	}
	,
	{
		width: 100,
		height: 20,
		x: 121,
		y: 358,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 598,
		y: 360,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 532,
		y: 253,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 254,
		y: 296,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 379,
		y: 374,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 516,
		y: 116,
		img: new Image()
	},
	
	{
		width: 100,
		height: 20,
		x: 84,
		y: 233,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 210,
		y: 126,
		img: new Image()
	},
	{
		width: 100,
		height: 20,
		x: 369,
		y: 170,
		img: new Image()
	}

	
];


const imgC = 
[ 
    {
        img:new Image(),
        x:396, 
        y:340,
        width:45,
		height:23,
		code: "main()",
		col: "img/code.png"
	},
	{
        img:new Image(),
        x:563, 
        y:210,
        width:45,
		height:23,
		code: "{",
		col: "img/code2.png"
	},
	{
        img:new Image(),
        x:633, 
        y:314,
        width:45,
		height:23,
		code: "}",
		col:"img/code3.png"
	},
	{
        img:new Image(),
        x: 604,
		y: 479,
        width:45,
		height:23,
		code: "",
		col: "img/compile.png"
	},
	{
        img:new Image(),
        x: 734,
		y: 147,
        width:45,
		height:23,
		code: "#include 'all_animations'",
		col: "img/code5.png"
	},
	{
        img:new Image(),
        x: 406,
		y: 136,
        width:45,
		height:23,
		code: 'print(_text);',
		col: "img/code4.png"
	}
	
];
for (let i = 0; i < imgC.length; i++)  
					imgC[i].img.src = imgC[i].col;
			console.log(imgC[3].col);

let player = {
	src: null,
	x: 44,
    y: 622,
	width: 16,
	height: 32,
	xVelocity: 0,
	yVelocity: 0,
	jumping: true,
	coins: 0
};
player.src = new Sprite("img/stop.png",3,90);

let deltaTime = 0;
let lastTime = Date.now();



let leftPressed = false;
let rightPressed = false;
let jumpPressed = false;
let jumpCount = 0;
let jumpLength = 30;
let jumpHeight = 0;


let playerHeight = 380;
let playerWidth = 380;
let jump = 0;


window.addEventListener("mousedown", (item) => {
	console.log(`x: ${item.pageX}\ny: ${item.pageY}`);
});

let setLevel = function() {

    window.removeEventListener("keydown", controller.KeyListener);
    window.removeEventListener("keyup", controller.KeyListener);

        
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].img.src = "img/ob.png";
	}
    window.addEventListener("keydown", controller.KeyListener);
    window.addEventListener("keyup", controller.KeyListener);
}




let startAnimation = function(fps) {
	setLevel();
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animation(then);
}

let animation = function(newTime) {
    window.requestAnimationFrame(animation);
    now = newTime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
		
		update();
		draw();
    }
}


let controller = {
    left: false,
    right: false,
    up: false,
    KeyListener: function(evt) {
        let keyState = (evt.type == "keydown") ? true : false;
        switch (evt.keyCode) {
            case 37:
				controller.left = keyState;
				player.src = new Sprite("img/charL.png",8,190);
                break;
            case 38:
				controller.up = keyState;
				player.src = new Sprite("img/char.png",8,190);	
                break;
            case 39:
				controller.right = keyState;
				player.src = new Sprite("img/char.png",8,190);
                break;
		}
		if(evt.type == "keyup") player.src = new Sprite("img/stop.png",3,110);
	}
	
};

 let text = document.getElementById("codeIn");
 
 let textCompile = document.getElementById("codeCompile");

	let isCollided = function (obst, obj) {
		if (obj.x + obj.width > obst.x 
		&& obj.x < obst.x + obst.width
		&& obj.y < obst.y + obst.height
		&& obj.y + obj.height > obst.y) {
			return true;
	
		} else {
			return false;
			
		}
		
	}
	let string = "";
   let imgCC = {...0};
	const coinHandler = (coin, obj) => {
		for (let i = 0; i < imgC.length; i++) {
			if(isCollided(imgC[i], obj)) {
				player.coins += 1;
				//imgC[i].col = 1;
				imgCC[i] = 1; 
				text.innerHTML += 
`
${imgC[i].code}
				`;
				string += imgC[i].code;
				 // перезагружаем страницу
				
				
					
		
				imgC[i].y = -113;
				//load_js();
				console.log(string);
			}
		}
		
		if(imgCC[3] === 1) {
			// All Animations
			if(!imgCC[2])  {
				textCompile.innerHTML = `Вы пропустили ковычку`;
				
			}
			if (string === "#include 'all_animations'main(){print(_text);}") {
				textCompile.innerHTML = `
All_Animations загружены!
Автор: OgStyle Годы планирования разработки: 2008 - 2020
Pawn compiler 3.2.3664 
Copyright (c) 1997-2017, ITB CompuPhase`;

			}
			else {
				textCompile.innerHTML = `error`;
			}
		}
	}
	let collideHandler = (obst, obj) => {
		if (isCollided(obst, obj)) {
			if (obj.xPrev >= obst.x + obst.width) {
				obj.x = obst.x + obst.width;
				obj.xVelocity = 0;
		
			}
			if (obj.xPrev + obj.width <= obst.x) {
				obj.x = obst.x - obj.width;
				obj.xVelocity = 0;
				
			}
			if (obj.yPrev + obj.height <= obst.y) {
				obj.y = obst.y - obj.height;
				obj.yVelocity = 0;
				obj.jumping = false;
				
			}
			if (obj.yPrev >= obst.y + obst.height) {
				obj.y = obst.y + obst.height;
				obj.yVelocity = 0;
				
			}
		}
	}
	
const draw = () => {
   
	for (let i = 0; i < obstacles.length; i++) 
		ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);	 
}

function update(){
	deltaTime = Date.now() - lastTime;
  	lastTime = Date.now();
  	ctx.drawImage(bg.src,0,0,bg.width,bg.height);
  	for (let i = 0; i < imgC.length; i++) ctx.drawImage(imgC[i].img, imgC[i].x, imgC[i].y, imgC[i].width, imgC[i].height);
	player.xPrev = player.x;
    player.yPrev = player.y;
	
	
	
    if (controller.up && player.jumping === false) {
        player.yVelocity -= 20;
		player.jumping = true;
    }

    if (controller.left) {
        player.xVelocity -= .5;
	   
    }

    if (controller.right) {
        player.xVelocity += .5;
    }
	
	
	
    player.yVelocity += .5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;
	
    if (player.x < 0) {
        player.x = 0;
	}
	
    if (player.x > canvas.width - player.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.yVelocity = 0;
        player.jumping = false;
	}

	player.src.drawNext( player.x, player.y-20, 27,54,deltaTime);
	for (let i = 0; i < obstacles.length; i++) {
		collideHandler(obstacles[i], player);
	}

	for (let i = 0; i < imgC.length; i++) 
					coinHandler(imgC[i], player);
	
}
startAnimation(FPS);

function Sprite(src,countSprites,speed) {
	this.src = new Image();
	this.speed = speed;
	this.speedTimer = 0;
	this.src.src = src;
	this.countSprites = countSprites;
	this.number = 0;
	this.loaded = false;
	let _this = this;
	this.src.onload = function(){  	  _this.loaded = true;  }
	this.drawNext = function(x,y,w,h,deltaTime){  	  
	this.speedTimer += deltaTime;
	if(!this.loaded)return false;
	while(this.speedTimer >= this.speed){
	  this.number = (this.number+1)%this.countSprites;
	  this.speedTimer-= this.speed;
	  //setInterval(draw, 10);
	}
	ctx.drawImage(this.src,(this.src.width/this.countSprites)*this.number,0,(this.src.width/this.countSprites),this.src.height,x,y,w,h);
  }
}