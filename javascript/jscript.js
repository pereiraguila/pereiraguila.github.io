var nav = document.querySelector('nav');
var ul = document.querySelector('nav ul');
var btn = document.querySelector('.menuCelular');
var icon = document.querySelector('.icon')


function show(){
	if (ul.classList.contains('abrir')){
		ul.classList.remove('abrir');
    nav.classList.remove('manterFixo');
		icon.src = "imagens/menu_entrar.png";
	}else{
		 ul.classList.add('abrir');
     nav.classList.add('manterFixo');
		 icon.src = "imagens/menu_sair.png";
	}
}

function fechar(){
	ul.classList.remove('abrir');
  nav.classList.remove('manterFixo');
	icon.src = "imagens/menu_entrar.png";
}


  function enviarMensagem() {
      var nome = document.getElementById('name').value;
      var assunto = document.getElementById('assunto').value;
      var mensagem = document.getElementById('mensagem').value;

      
      var numeroTelefone = '258844700726';
     
      
      // Cria o link do WhatsApp com a mensagem predefinida
      var linkWhatsApp = 'https://api.whatsapp.com/send?phone=' + numeroTelefone + '&text=Nome: ' + nome + '%0AAssunto: ' + assunto + '%0AMensagem: ' + mensagem;

      // Redireciona para o link do WhatsApp

            //window.location.href = linkWhatsApp; //Abre o link na mesma aba

      // Abre o link em uma nova aba
      window.open(linkWhatsApp, '_blank');


      // Retorna false para evitar o envio padrão do formulário
      return false;
    }