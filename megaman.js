
function hacerClic2(){
	document.querySelector("#principal p:first-child").onclick=mostrarAlerta;
}
function mostrarAlerta(){
	alert("hizo clic archivo externo js");
}
function hacerClic(){
	document.getElementsByTagName('p')[4].onclick=mostrarAlerta;
}
window.onload=hacerClic;

