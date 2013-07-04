window.addEventListener('load',init,false);
//addEventListener('evento', funcion_a_lanzar,booleano) indica que permanesca atento a la interaccion de el usuario sobre un elemento en concreto
//sin necesidad de tocar una tecla, dependiendo de el booleano sabremos el fluujo del evento "captura" o "burbuja"
//Aqui mas info para que quede claro http://www.codexexempla.org/curso/curso_4_3_e.php
var canvas=null,ctx=null;//creamos 2 variables nulas donde guardaremos nuestro canvas y su contexto
var x=50,y=50;//estas variables nos daran la pocicion de nuestro cuadrado
var lastkey=null;//variable que almacena la ultima tecla precionada
var PAUSE=true;//variable booleana para pausar el juego
var dir=0;//variable que nos dira hacia donde debe ir el objeto

function init(){
	canvas=document.getElementById('lienzo');//obtenemos nuestro lienzo buscandolo por su id
	canvas.style.background='red';//Asignamos un color a nuestro lienzo
	ctx=canvas.getContext('2d');//Definimos el contexto en 2d, esta es nuestra herramienta para pintar dentrp del lienzo(es como nuestro pincel)
	run();//esta es la funcion que se ejecutara.
	}

function run(){
	setTimeout(run,50);//aqui mas explicacion http://fgualambo.blogspot.com/2011/10/uso-del-metodo-settimeout-en-javascript.html
	game();
	paint(ctx);
}

function game(){
	if(!PAUSE){
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
		y-=10;
	if(dir==1)
		x+=10;
	if(dir==2)
		y+=10;
	if(dir==3)
		x-=10;
	//Si sale de pantalla
	if(x>canvas.width)
		x=0;
	if(y>canvas.height)
		y=0;
	if(x<0)
		x=canvas.width-10;//restamos un -10 para que el objeto no se pierda fuera del canvas
	if(y<0)
		y=canvas.height-10;//restamos un -10 para que el objeto no se pierda fuera del canvas
}
	//Pausar el juego
	if(lastkey==13){
		PAUSE=!PAUSE;//Cambia el valor de verdadero a falso y viceversa segun se precione la revla enter
		lastkey=null;
	}
}
function paint(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);//va a limpiar nuestro canvas cada vez que se ejecute la funcion
	ctx.fillStyle='#0f0';
	ctx.fillRect(x,y,10,10);//Le pasamos los valores de x e y para que se dibuje
	ctx.fillStyle='#fff';
	ctx.fillText('keyCode o TeclaPresionada '+lastkey,10,20);//Nos dira que tecla estamos precionando
	ctx.fillText('by X3N',10,290);
	//Al inicio la el juego estara en pause asi que cada 50 milisegundos se estara imprimiento el siguiente mensaje
	if(PAUSE)
		ctx.fillText('PAUSE',140,75);
}
document.addEventListener('keydown',function(lol){lastkey=lol.keyCode;},false);//esta funcion asigna a lastkey la tecla q estamos precionando