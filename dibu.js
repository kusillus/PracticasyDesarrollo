window.addEventListener('load',init,false);
//addEventListener('evento', funcion_a_lanzar,booleano) indica que permanesca atento a la interaccion de el usuario sobre un elemento en concreto
//sin necesidad de tocar una tecla, dependiendo de el booleano sabremos el fluujo del evento "captura" o "burbuja"
//Aqui mas info para que quede claro http://www.codexexempla.org/curso/curso_4_3_e.php
var canvas=null,ctx=null;//creamos 2 variables nulas donde guardaremos nuestro canvas y su contexto
function init(){
	canvas=document.getElementById('lienzo');//obtenemos nuestro lienzo buscandolo por su id
	//canvas.style.background='red';//Asignamos un color
	ctx=canvas.getContext('2d');
	paint(ctx);
}
function paint(ctx){
	ctx.fillStyle='blue';
	ctx.fillRect(50,50,100,60);
}