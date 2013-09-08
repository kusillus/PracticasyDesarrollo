window.addEventListener('load',init,false);
//addEventListener('evento', funcion_a_lanzar,booleano) indica que permanesca atento a la interaccion de el usuario sobre un elemento en concreto
//sin necesidad de tocar una tecla, dependiendo de el booleano sabremos el fluujo del evento "captura" o "burbuja"
//Aqui mas info para que quede claro http://www.codexexempla.org/curso/curso_4_3_e.php
var canvas=null,ctx=null;//creamos 2 variables nulas donde guardaremos nuestro canvas y su contexto
var player=new Rectangle(40,40,10,10);//elimina x e y para crear player de tipo rectangulo
var food=new Rectangle(80,80,10,10);
var score=0;//almecena el puntaje
//var x=50,y=50;//estas variables nos daran la pocicion de nuestro cuadrado
var lastkey=null;//variable que almacena la ultima tecla precionada
var PAUSE=true;//variable booleana para pausar el juego
var dir=0;//variable que nos dira hacia donde debe ir el objeto
var GAMEOVER=true;//su nombre lo dice todo...
var wall=new Array();//nueva variable que contendra a todos los elementos de tipo "pared"
//el siguiente arreglo contiene todos los elementos de tipo pared
wall.push(new Rectangle(100,50,10,10));
wall.push(new Rectangle(100,100,10,10));
wall.push(new Rectangle(200,50,10,10));
wall.push(new Rectangle(200,200,10,10));

function random(max){
	return Math.floor(Math.random()*max);//funcion que genera numeros enteros al azar
}

function init(){
	canvas=document.getElementById('lienzo');//obtenemos nuestro lienzo buscandolo por su id
	canvas.style.background='#000';//Asignamos un color a nuestro lienzo
	ctx=canvas.getContext('2d');//Definimos el contexto en 2d, esta es nuestra herramienta para pintar dentrp del lienzo(es como nuestro pincel)
	run();//esta es la funcion que se ejecutara.
	}

function run(){
	setTimeout(run,50);//aqui mas explicacion http://fgualambo.blogspot.com/2011/10/uso-del-metodo-settimeout-en-javascript.html
	game();
	paint(ctx);
}

//Funcion Reset encargada de poner en 0 todo 
function reset(){
	score=0;
	dir=1;
	player.x=40;
	player.y=40;
	food.x=random(canvas.width/10-1)*10;
	food.y=random(canvas.height/10-1)*10;
	GAMEOVER=false;
}

function game(){
	if(!PAUSE){
	//GameOver Reset
		if(GAMEOVER)
		reset();//llamamos a la funcion reset
		//cambio de direccion 
		if(lastkey==38)//precionando la tecla hacia arriba
		dir=0;
		if(lastkey==39)//precionando la tevla hacia la derecha
		dir=1;
		if(lastkey==40)//precionando la tevla hacia abajo
		dir=2;
		if(lastkey==37)//precionando la tevla hacia la izquierda
		dir=3;
		//Movimiento del objeto
		if(dir==0)
		player.y-=10;
		if(dir==1)
		player.x+=10;
		if(dir==2)
		player.y+=10;
		if(dir==3)
		player.x-=10;
	//Si sale de pantalla
		if(player.x>canvas.width)
			player.x=0;
		if(player.y>canvas.height)
			player.y=0;
		if(player.x<0)
			player.x=canvas.width-10;//restamos un -10 para que el objeto no se pierda fuera del canvas
		if(player.y<0)
			player.y=canvas.height-10;//restamos un -10 para que el objeto no se pierda fuera del canvas

		//food Intersects
		if(player.intersects(food)){
			score++;//aumenta el score +1
			food.x=random(canvas.width/10-1)*10; 
			food.y=random(canvas.height/10-1)*10;
		//la ecuacion divide la pantalla entre 10 dentro del random y multiplicarla al final denuevo, hace que la comida
		//aparesca en un lugar cada 10 pixeles, de esta forma se ajusta a la rejilla.
		}
	//wall intersects
		for(var i=0,l=wall.length;i<l;i++){
		//si la comida intersecta a la pared busca otra pocicion
			if(food.intersects(wall[i])){
				food.x=random(canvas.width/10-1)*10;
				food.y=random(canvas.height/10-1)*10;
			}
		//Si chocamos contra la pared entonces GAME OVER
		if(player.intersects(wall[i])){
			GAMEOVER=true;
			PAUSE=true;
		}
	}
}
	//Pausar el juego
	if(lastkey==13){
		PAUSE=!PAUSE;//Cambia el valor de verdadero a falso y viceversa segun se precione la revla enter
		lastkey=null;
	}
}
//Todo lo que se dibuja en pantalla
function paint(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);//va a limpiar nuestro canvas cada vez que se ejecute la funcion
	ctx.fillStyle='#0f0';
	ctx.fillRect(player.x,player.y,player.width,player.height);//cambia la forma en que se dibuja el rectangulo tomando parametros de player
	ctx.fillStyle='#f00';
	ctx.fillRect(food.x,food.y,food.width,food.height);//toma parametros de food
	//ctx.fillRect(x,y,10,10);//Le pasamos los valores de x e y para que se dibuje
	//a continuacion para dibujar los elementos pared que se veran en pantalla recorreremos el arreglo con un for
	ctx.fillStyle='#999';
	for(var i=0,l=wall.length;i<l;i++){
		ctx.fillRect(wall[i].x,wall[i].y, wall[i].width, wall[i].height);
	}
	ctx.fillStyle='#fff';
	ctx.fillText('keyCode o TeclaPresionada '+lastkey,10,40);//Nos dira que tecla estamos precionando
	ctx.fillText('Tu Sc0R3: '+score,20,20);
	ctx.fillText('by X3N',10,290);
	//Al inicio la el juego estara en pause asi que cada 50 milisegundos se estara imprimiento el siguiente mensaje
	if(PAUSE){
		ctx.textAlign='center';
		if(GAMEOVER)
		ctx.fillText('GameOver',140,75);
		else
			ctx.fillText('PAUSE',140,75);
			ctx.textAlign='left';
	}
}
document.addEventListener('keydown',function(lol){lastkey=lol.keyCode;},false);//esta funcion asigna a lastkey la tecla q estamos precionando

//Funcion para saber si nuestro objeto esta en interseccion con algun otro elemento del juego
function Rectangle(x,y,width,height){
	this.x=(x==null)?0:x;
	this.y=(y==null)?0:y;
	this.width=(width==null)?0:width;
	this.height=(height==null)?this.width:height;

	this.intersects=function(rect){
		if(rect!=null){
			return(	this.x<rect.x+rect.width&&
					this.x+this.width>rect.x&&
					this.y<rect.y+rect.height&&
					this.y+this.height>rect.y);

		}
	}
	//esta funcion acepta 4 variables, si se omite alguna se volvera 0 de manera automatica
	//para evitar errores excepto en el caso de la height, si se omite este valor se toma por defecto
	//el tamaño de el width.

}
