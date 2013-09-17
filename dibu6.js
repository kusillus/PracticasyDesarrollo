window.addEventListener('load',init,false);
//addEventListener('evento', funcion_a_lanzar,booleano) indica que permanesca atento a la interaccion de el usuario sobre un elemento en concreto
//sin necesidad de tocar una tecla, dependiendo de el booleano sabremos el fluujo del evento "captura" o "burbuja"
//Aqui mas info para que quede claro http://www.codexexempla.org/curso/curso_4_3_e.php
var canvas=null,ctx=null;//creamos 2 variables nulas donde guardaremos nuestro canvas y su contexto
var body=new Array();//Array que contendra el cuerpo de Snake
var food=new Rectangle(80,80,10,10);//creamos la comida
var score=0;//almecena el puntaje
var lastkey=null;//variable que almacena la ultima tecla precionada
var PAUSE=true;//variable booleana para pausar el juego
var dir=0;//variable que nos dira hacia donde debe ir el objeto
var GAMEOVER=true;//su nombre lo dice todo...


function random(max){
	return Math.floor(Math.random()*max);//funcion que genera numeros enteros al azar
}

function init(){
	canvas=document.getElementById('lienzo');//obtenemos nuestro lienzo buscandolo por su id
	canvas.style.background='#FFFFFF';//Asignamos un color a nuestro lienzo
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
	body.length=0;//ponemos a 0 la long de la serpiente para que cuando iniciemos no se sume a lo que teniamos anteriormente.
	body.push(new Rectangle(150,40,10,10));//cabeza de snake
	body.push(new Rectangle(0,0,10,10));
	body.push(new Rectangle(0,0,10,10));
	food.x=random(canvas.width/10-1)*10;
	food.y=random(canvas.height/10-1)*10;
	GAMEOVER=false;
}

function game(){
	if(!PAUSE){
	//GameOver Reset
		if(GAMEOVER)
		reset();//llamamos a la funcion reset

	//Mover Cuerpo
	for(var i=body.length-1;i>0;i--){
		body[i].x=body[i-1].x;
		body[i].y=body[i-1].y;
		//este "for" lo que hace es mover de atras hacia adelante dando un efecto de oruga
		//haciendo que el ultimo elemento tome la pocicion de el anterior tanto en x como en y.
	}

	//cambio de direccion 
		if(lastkey==38&&dir!=2)//precionando la tecla hacia arriba
		dir=0;
		if(lastkey==39&&dir!=3)//precionando la tevla hacia la derecha
		dir=1;
		if(lastkey==40&&dir!=0)//precionando la tevla hacia abajo
		dir=2;
		if(lastkey==37&&dir!=1)//precionando la tevla hacia la izquierda
		dir=3;
		//nos haceguramos que la ultima tecla pracionada no sea su opuesta por que no ira en reversa solo girara.
	
	//Move head
	//depende de que tecla fue precionada se suma o resta de manera que se ira moviendo a lo largo del canvas
		if(dir==0)
		body[0].y-=10;
		if(dir==1)
		body[0].x+=10;
		if(dir==2)
		body[0].y+=10;
		if(dir==3)
		body[0].x-=10;

	//Si sale de pantalla
	//Restandole body[0].width a canvas.width evitamos q snake se pierda fuera de pantalla
		if(body[0].x>canvas.width-body[0].width)
			body[0].x=0;
		if(body[0].y>canvas.height-body[0].height)
			body[0].y=0;
		if(body[0].x<0)
			body[0].x=canvas.width-body[0].width;
		if(body[0].y<0)
			body[0].y=canvas.height-body[0].height;

		//food Intersects
		if(body[0].intersects(food)){
			body.push(new Rectangle(0,0,10,10));
			score++;//aumenta el score +1
			food.x=random(canvas.width/10-1)*10; 
			food.y=random(canvas.height/10-1)*10;
		//la ecuacion divide la pantalla entre 10 dentro del random y multiplicarla al final denuevo, hace que la comida
		//aparesca en un lugar cada 10 pixeles, de esta forma se ajusta a la rejilla.
		}
	
		//body Intersects
		for(var i=2,l=body.length;i<l;i++){//comprueba q cada parte del cuerpo no se intercepte con la cabeza.
			if(body[0].intersects(body[i])){//si la cabeza choca con el cuerpo...
				GAMEOVER=true;
				PAUSE=true;
			}
		}
	
	}
		//Pausar el juego
		if(lastkey==13){
			PAUSE=!PAUSE;//Cambia el valor de verdadero a falso y viceversa segun se precione la revla enter
			lastkey=null;//al no haber ultima tecla precionada snake no se movera...
						}
}
//Todo lo que se dibuja en pantalla
function paint(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height);//va a limpiar nuestro canvas cada vez que se ejecute la funcion
	ctx.fillStyle='#58BF16';
	for(var i=0,l=body.length;i<l;i++){//Arreglo que dibujara cada parte de nuestra Snake
		ctx.fillRect(body[i].x,body[i].y,body[i].width,body[i].height);
	}
	ctx.fillStyle='#E44D26';
	ctx.fillRect(food.x,food.y,food.width,food.height);//toma parametros de food
	ctx.fillStyle='#000000';
	ctx.fillText('LastKey '+lastkey,530,20);//Nos dira que tecla estamos precionando
	ctx.fillText('SCORE: '+score,10,20);
	ctx.fillText('by lx',10,290);
	//Al inicio la el juego estara en pause asi que cada 50 milisegundos se estara imprimiento el siguiente mensaje
	if(PAUSE){
		ctx.textAlign='center';
		if(GAMEOVER)
		ctx.fillText('GameOver',300,150);
		else
			ctx.fillText('PAUSE',300,150);
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

	//funcion interseccion dentro de la funcion tipo objeto Rectangulo
	this.intersects=function(rect){
		if(rect!=null){
			return(	this.x<rect.x+rect.width&&
					this.x+this.width>rect.x&&
					this.y<rect.y+rect.height&&
					this.y+this.height>rect.y);
			//si la condicion se cumple hay una interseccion(retorna true) entonces devuelve true 
			
			

		}
	}
	//esta funcion acepta 4 variables, si se omite alguna se volvera 0 de manera automatica
	//para evitar errores excepto en el caso de la height, si se omite este valor se toma por defecto
	//el tamaño de el width.

}
