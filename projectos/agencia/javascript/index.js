

var ul = document.querySelector('nav ul');
var btn = document.querySelector('menuCelular');
var icon = document.querySelector('.icon')


function show(){
	if (ul.classList.contains('abrir')){
		ul.classList.remove('abrir');
		icon.src = "Imagens/menu_entrar.png";
	}else{
		ul.classList.add('abrir');
		 icon.src = "Imagens/menu_sair.png";
	}
}

function fechar(){
	ul.classList.remove('abrir');
	icon.src = "Imagens/menu_entrar.png";
}
 
