formulario=window.document.querySelector('.formulario');
input=window.document.querySelectorAll('.espaco');
aviso=document.querySelectorAll('.aviso');
icon=document.querySelectorAll('.icon');
mmm = document.querySelectorAll('.mmm');
var verificarEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



function validarUsuario(){
     let ss = "";
	if (input[0].value.length<2){
		erro(0);
        ss=false;
    }else 

    if(input[0].value.length>=2) {
        removerErro(0);
        ss=true;
    }
    return ss
}


 function validarEmail(){
    let ss = ""
 	if (verificarEmail.test(input[1].value)) {
        removerErro(1);
        ss=true;
 	}else{
 		erro(1);
        ss=false;
 	}
     return ss;
 }


 function validarSenha(){
    let ss = ""
	if (input[2].value.length<7){
		erro(2);
        ss=false;
	}else{
		removerErro(2);
        ss=true;
	}
    return ss;
}

 function confirmarSenha(){
    let ss = ""
 	if ((input[2].value === input[3].value) && (input[3].value !== "") && (input[3].value.length>=7)){
 		removerErro(3);
        ss=true

 	}else{
 		erro(3);
        ss=false;
 	}

    return ss;
 }





function erro(posicao){
     input[posicao].style.border = '2px solid #E00D10';
     aviso[posicao].style.display = 'block';
     icon[posicao].src = "imagens/aviso_vermelho.png";
     mmm[posicao].style.top = "47%";
    
}   


function removerErro(posicao){
     input[posicao].style.border = '2px solid #00FF0C';
     aviso[posicao].style.display = 'none';
     icon[posicao].src = "imagens/aviso_verde.png";
     mmm[posicao].style.top = "59%";

} 

formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault();
   
    if ((validarUsuario()) && (validarEmail()) && (validarSenha()) && ( confirmarSenha())) {
         window.open('pagina_principal/paginaP.html', '_self');
    }else{
     validarUsuario();
     validarEmail();
     validarSenha();
     confirmarSenha(); 
    }


  })

