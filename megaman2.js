function hacerClic(){
	//document.getElementsByTagName('p')[0].onclick=mostrarAlerta;
	/*var lista=document.querySelectorAll("#principal p");
	lista[1].onclick=mostrarAlerta;*/
	/*var lista=document.querySelectorAll("#principal p");
	for(var f=0; f<lista.length; f++){
		lista[f].onclick=mostrarAlerta;
	}*/
	var lista=document.getElementById('principal').querySelectorAll("p");
	lista[0].onclick=mostrarAlerta;
	lista[2].onclick=mostrarAlerta;
}
function mostrarAlerta(){
	alert('hizo clic archivo externo js');
}
window.onload=hacerClic;

