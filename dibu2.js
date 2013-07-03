window.addEventListener('load',init,false);
//addEventListener('evento', funcion_a_lanzar,booleano) indica que permanesca atento a la interaccion de el usuario sobre un elemento en concreto
//sin necesidad de tocar una tecla, dependiendo de el booleano sabremos el fluujo del evento "captura" o "burbuja"
//Aqui mas info para que quede claro http://www.codexexempla.org/curso/curso_4_3_e.php
var canvas=null,ctx=null;//creamos 2 variables nulas donde guardaremos nuestro canvas y su contexto
var x=50,y=50;//estas variables nos daran la pocicion de nuestro cuadrado
function init(){
	canvas=document.getElementById('lienzo');//obtenemos nuestro lienzo buscandolo por su id
	canvas.style.background='red';//Asignamos un color a nuestro lienzo
	ctx=canvas.getContext('2d');//Definimos el contexto en 2d, esta es nuestra herramienta para pintar dentrp del lienzo(es como nuestro pincel)
	lol();//esta es la funcion que se ejecutara.
	}
function lol(){
	setTimeout(lol,50);//aqui mas explicacion http://fgualambo.blogspot.com/2011/10/uso-del-metodo-settimeout-en-javascript.html
	x+=10;//se suma +10 el valor de x
	y+=2;
	if(x>canvas.width)//condicional si x es mayo que el ancho del canvas
		x=0;// se resetea x a 0
	if(y>canvas.height)
		y=0;
	paint(ctx);
}
function paint(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);//va a limpiar nuestro canvas cada vez que se ejecute la funcion
	ctx.fillStyle='#0f0';
	ctx.fillRect(x,y,10,10);//Le pasamos los valores de x e y para que se dibuje
}