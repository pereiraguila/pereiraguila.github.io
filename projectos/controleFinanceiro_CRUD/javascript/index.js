const desc = window.document.querySelector('.descricao');
const valor = window.document.querySelector('.mutante');
const select = window.document.querySelector('select');
const capa = window.document.querySelector('.capa');
const capa2 = window.document.querySelector('.capa2');
cadEdit=window.document.querySelector('.cadEdit');
const butaoAdd1=window.document.querySelector('.adicionar');
const butaoCancelar=window.document.querySelector('.butaoCancelar');
const butaoadd2 = window.document.querySelector('.butaoAdicionar');
const butaoEditar = window.document.querySelector('.butaoEditar');
const butaoX = window.document.querySelector('.butaoX');
const space =  window.document.querySelector('tbody');
const pesquisar = window.document.querySelector('.pesquisar');
const tbRegistros = window.document.querySelector('.tbRegistros');
var tempo = window.document.querySelector('.tempo');
var valorEntrada=window.document.querySelector('.valorEntrada');
var valorSaida=window.document.querySelector('.valorSaida');
var valorRestante=window.document.querySelector('.valorRestante');
var c =0;
var d = new Date();
var diaSemana=["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
var dia=d.getDate();
var mes=d.getMonth()+1;
var ano = d.getFullYear();
var data ='';
let arrayDados =[];





function soMes(){
	if (mes<10) {
	return "0"+mes
  }else{
    return mes;
  }
}

setInterval(()=>{
tempo.innerHTML= diaSemana[d.getDay()] +"/"+dia+"/" + soMes();
},500)

function pegarTempo(){
	if (mes<10) {
		data = (dia+"-"+"0"+mes+"-"+ ano);
	    }else{
		data = (dia+"-"+mes+"-"+ano );
    }
    return data;
}



	dadosObjecto={
		data:"",
		descricao:"",
		montante:"",
		tipoTransicao:""
	}

	
exibirTabela();
calculos();
butaoadd2.addEventListener('click',()=>{
	if (((validarDscricao()) && validarMutante()) && validarselector()) {
      adicionarDadosNoObjecto();
      obterObjectosDoLocalStorageParaArray();
      adicionarNovoObjectoNoArray();
      guardarDadosNoLocalStorage()
      fechaModal();
      limparObjecto()
      calculos();
      exibirTabela();

	}else{
		validarDscricao()
		validarMutante();
		validarselector();
	}
})

butaoCancelar.addEventListener('click',()=>{
	fechaModal()
	butaoEditar.style.display="none";
	butaoadd2.style.display="block";
  cadEdit.innerHTML="Cadastro";


})

butaoAdd1.addEventListener('click',()=>{
	capa.classList.add('abrirModal');
 
})

butaoX.addEventListener('click',()=>{
   capa2.classList.remove('abrirModal2');
})



 function validarDscricao(){
 	let verificar=''
 	if(desc.value==''){
      erro(desc);
      verificar=false;
 	}else{
 		correcto(desc)
       verificar=true;
 	}
 	return verificar;
 }



 function validarMutante(){
 	let verificar=''
 	if((valor.value=='') || (valor.value<=0)){
      erro(valor);
      verificar=false;
 	}else{
 		correcto(valor);
      verificar=true;
 	}
 	return verificar;
 }



 function validarselector(){
    let verificar=''
 	if((select.value=='') || (select.value=='Selecione')){
      erro(select);
      verificar=false;
 	}else{
      verificar=true;
      correcto(select);
 	}
 	return verificar;
 }


 function erro(alvo){
 	alvo.style.border="2px solid #FB2E1F";
 }


 function correcto(alvo){
 	alvo.style.border='2px solid #808080';
 } 

 function fechaModal(){
 	capa.classList.remove('abrirModal');
	desc.value="";
	valor.value="";
	select.value="Selecione";
	desc.style.border="2px solid #808080";
	valor.style.border="2px solid #808080";
  select.style.border="2px solid #808080";
 }
 


	function obterObjectosDoLocalStorageParaArray(){  //Pegar objecto do localStorage se existir, e colocar no arrays.
		if ((localStorage.hasOwnProperty('objectoTabela'))) {
			arrayDados = JSON.parse(localStorage.getItem('objectoTabela'));
		}
	}


	function adicionarNovoObjectoNoArray(){ //Adicionar mais 1 novo objecto no arrays.
	  arrayDados.push(dadosObjecto);
	}



	function guardarDadosNoLocalStorage(){  // voltar a guardar o array do objecto no localStorage.
        localStorage.setItem('objectoTabela', JSON.stringify(arrayDados));
        //arrayDados="";
    }




pesquisar.addEventListener('keyup',()=>{
  let pegarValor = pesquisar.value.toLowerCase();
  let linha = tbRegistros.getElementsByTagName('tr');
   for(let pos in linha){
    if (isNaN(pos)) {
      continue;
    }

    let conteundo = linha[pos].innerHTML.toLowerCase();

    if ((conteundo.includes(pegarValor))){
      linha[pos].style.display = '';
    }else{
      linha[pos].style.display = 'none';
    }
   }
})


function prepararEdicao(indexId){
  cadEdit.innerHTML="Editar?";
  obterObjectosDoLocalStorageParaArray();
  butaoadd2.style.display="none";
  butaoEditar.style.display="block";
  for(let i=0; i<arrayDados.length; i++){
  	 if(indexId==i){
  	 capa.classList.add('abrirModal');
  	 desc.focus();
  	 desc.value = arrayDados[i].descricao;
  	 valor.value=arrayDados[i].montante;
  	 select.value=arrayDados[i].tipoTransicao;
  	 c=indexId;
  	 }
  }
}

function editar(){
	if ((desc.value=="") || (valor.value=="")|| (select.value=="Selecione")) {
		validarDscricao()
		validarMutante();
		validarselector();
	}else{
		for(let i=0; i<arrayDados.length; i++){
			if (i==c) {
	       	arrayDados[i].descricao=desc.value;
	       	arrayDados[i].montante=valor.value;
	       	arrayDados[i].tipoTransicao=select.value;

            }
		}
        capa.classList.remove('abrirModal');
        butaoEditar.style.display="none";
        butaoadd2.style.display="block";
		  guardarDadosNoLocalStorage();
	    exibirTabela()
	    calculos();
	    fechaModal();
      cadEdit.innerHTML="Cadastro";
	    c=0;
	}
}


 function prepararApagar(indexId){
    capa2.classList.add('abrirModal2');
    obterObjectosDoLocalStorageParaArray();
    for(let i=0; i<arrayDados.length; i++){
        if (i==indexId) {
          c=indexId;
        }
     }
 }

function apagar(){
	   for(let i=0; i<arrayDados.length; i++){
	   	  if (i==c) {
          arrayDados.splice(i,1);
	   	  }
	   }
     capa2.classList.remove('abrirModal2');
	   guardarDadosNoLocalStorage();
	   calculos();
	   exibirTabela();
     c=0;
}

function cancelarApagar(){
   capa2.classList.remove('abrirModal2');
}
    



function calculos(){
 	var renda=0;
 	var despensa=0;
 	var restante=0;
 	obterObjectosDoLocalStorageParaArray()
 	for(let i=0; i<arrayDados.length; i++){
 		if (arrayDados[i].tipoTransicao=="Entrada") {
 			renda+=parseInt(arrayDados[i].montante);
 		}else if(arrayDados[i].tipoTransicao=="Saida"){
            despensa+=parseInt(arrayDados[i].montante);
            
 		}
 	}
    restante=(renda-despensa);
 	valorEntrada.innerHTML=renda+".00";
 	valorSaida.innerHTML=despensa+".00";
 	valorRestante.innerHTML=restante+".00";
 	  if(restante<0){
 	  	valorRestante.style.color="#FB2E1F";
 	  }else if(restante>=0){
        valorRestante.style.color="#5EAC24";
     
 	  }
 }


    function exibirTabela(){
 	obterObjectosDoLocalStorageParaArray();
 	space.innerHTML="";
 	for(let i=0; i<arrayDados.length; i++){
 		if ((i+1)%2==1) {
       if(arrayDados[i].tipoTransicao=="Entrada"){
            space.innerHTML+=`<tr id="${i}">
              <td>${arrayDados[i].data}</td>
              <td>${arrayDados[i].descricao}</td>
              <td>${arrayDados[i].montante+".00" + " MZN "}</td>
              <td><img src="imagens/setaC.png"></td>
              <td><img src="imagens/editar.png" class="botaoEditar" onclick="prepararEdicao(${i})"><img src="imagens/excluir.png" class="botaoApagar"onclick="prepararApagar(${i})"></td>
             </tr>`
       } else if(arrayDados[i].tipoTransicao=="Saida"){
            space.innerHTML+=`<tr id="${i}">
              <td>${arrayDados[i].data}</td>
              <td>${arrayDados[i].descricao}</td>
              <td>${arrayDados[i].montante+".00" + " MZN "}</td>
               <td><img src="imagens/setaB.png"></td>
              <td><img src="imagens/editar.png" class="botaoEditar" onclick="prepararEdicao(${i})"><img src="imagens/excluir.png" class="botaoApagar"onclick="prepararApagar(${i})"></td>
             </tr>`
       }
 		}else{
      if(arrayDados[i].tipoTransicao=="Entrada"){
            space.innerHTML+=`<tr id="${i}" class="cinza">
              <td>${arrayDados[i].data}</td>
              <td>${arrayDados[i].descricao}</td>
              <td>${arrayDados[i].montante+".00" + " MZN "}</td>
              <td><img src="imagens/setaC.png"></td>
              <td><img src="imagens/editar.png" class="botaoEditar" onclick="prepararEdicao(${i})"><img src="imagens/excluir.png" class="botaoApagar"onclick="prepararApagar(${i})"></td>
             </tr>`
       } else if(arrayDados[i].tipoTransicao=="Saida"){
            space.innerHTML+=`<tr id="${i}" class="cinza">
              <td>${arrayDados[i].data}</td>
              <td>${arrayDados[i].descricao}</td>
              <td>${arrayDados[i].montante+".00" + " MZN "}</td>
               <td><img src="imagens/setaB.png"></td>
              <td><img src="imagens/editar.png" class="botaoEditar" onclick="prepararEdicao(${i})"><img src="imagens/excluir.png" class="botaoApagar"onclick="prepararApagar(${i})"></td>
             </tr>`
       }
               
 		}
 	}         
 }



 function limparObjecto(){
	dadosObjecto.data= "";//Adicionar os dados no objecto.
    dadosObjecto.descricao="";
    dadosObjecto.montante="";
    dadosObjecto.tipoTransicao="";
}


 function adicionarDadosNoObjecto(){
		dadosObjecto.data=pegarTempo();    //Adicionar os dados no objecto.
        dadosObjecto.descricao=desc.value;
        dadosObjecto.montante=valor.value;
        dadosObjecto.tipoTransicao=select.value;
	}

