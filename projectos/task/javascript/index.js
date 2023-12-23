
 var camp = window.document.getElementById('camp')
 var armazenamento = window.document.getElementById('armazenamento');
 var butao =  window.document.querySelector('.add');
 var actualizar = window.document.querySelector('.update');
 butaoCancelar = window.document.querySelector('.DivButaoCancelar');
 filtroClasse = window.document.querySelector('.filtroPesquisa');
 select = window.document.querySelector('select');
 
 
 var p =0;
 var saveArray = [];
  Actividade={
  status:"desmarcado",
  tarefa:""
 }


 
  filtro();
 function acrescentar() {
    if (camp.value=="") {
        alert(" Campo vazio! ");
    } else{
        Actividade.tarefa=camp.value.toUpperCase(); 
        saveBD();
        filtro();   
    }
     camp.value="";
     camp.focus();
 }

 /*camp.addEventListener('keyup', (evento)=>{
   if (evento.keyCode===13) {
    butao.click();
   }
 })*/

 
 function apagar(dd){
  obterDoLocalStorage();
  for(i=0; i<saveArray.length; i++){
    if ([i]==dd) {
        if (confirm(" Tem certeza que deseja apagar o item selecionado?" )) {
              saveArray.splice(i,1);
        }
      
    }

     guardarDadosNoLocalStorage();
    filtro();
  }


 }

 

 function prepararEdicao(dd){
      armazenamento.style.display="none";
      butaoCancelar.style.display="block";
      butao.style.display="none";
      actualizar.style.display="block";
      filtroClasse.style.display="none";
      obterDoLocalStorage();
      for(i=0; i<saveArray.length; i++){
          if ([i]==dd) {
            camp.value = saveArray[i].tarefa
            camp.focus();
            p=i;
          }
      }
      
 }

 function editar(){
    if (camp.value=="") {
       alert(" Campo vazio! ");
    }else{
       for(var i=0; i<saveArray.length; i++){
         if([i]==p)
          saveArray[i].tarefa=camp.value.toUpperCase();
       }
    }

    camp.value="";
    armazenamento.style.display="flex"
    actualizar.style.display="none";
    butao.style.display="block";
    butaoCancelar.style.display="none";
    filtroClasse.style.display="flex";
    p=0;
    guardarDadosNoLocalStorage();
    filtro();
 }


 function cancelarEdicao(){
   for(var i=0; i<saveArray.length; i++){
     if([i]==p){
      saveArray[i]=saveArray[i];
      guardarDadosNoLocalStorage();
      camp.value="";
      camp.focus();
      butaoCancelar.style.display="none";
      armazenamento.style.display="flex";
      butao.style.display="block";
      actualizar.style.display="none";
        filtroClasse.style.display="flex";
      p=0;
     }
   }
 }


 function feito(dd){
  obterDoLocalStorage();
  for(var i=0; i<saveArray.length; i++){
     if ([i]==dd) {
         if (( saveArray[i].status == "marcado")) {
             saveArray[i].status = "desmarcado"
         }else{
             saveArray[i].status = "marcado"
         }
     }
  }
   guardarDadosNoLocalStorage();
    filtro();

 }



 function saveBD() {
     obterDoLocalStorage()
     saveArray.push(Actividade);
     guardarDadosNoLocalStorage();

 }

 function obterDoLocalStorage() {
   if(localStorage.hasOwnProperty("keyTarefa")){
    saveArray=JSON.parse(localStorage.getItem('keyTarefa'));
    }
 }

 function guardarDadosNoLocalStorage(){
   localStorage.setItem('keyTarefa', JSON.stringify(saveArray));
 }


 function mostrar(){
     armazenamento.innerHTML="";
     obterDoLocalStorage();
     for (var i = 0; i<saveArray.length; i++){
         if(saveArray[i].status=="marcado"){
           armazenamento.innerHTML += `<div id = "${i}" class="caixaTotal">
          <div onclick="feito(${i})" class="caixaEscrita marcado">${saveArray[i].tarefa}</div>
          <div onclick="feito(${i})" class="caixaMarcar "><img src="imagens/marcar.png"></div>
          <div onclick="prepararEdicao(${i})" class="caixaEditar"><img src="imagens/editar.png"></div>
          <div onclick="apagar(${i})" class="caixaApagar"><img src="imagens/apagar.png"></div>
        </div>`
         }else{
          armazenamento.innerHTML += `<div id = "${i}" class="caixaTotal">
          <div onclick="feito(${i})" id = "${i}" class="caixaEscrita">${saveArray[i].tarefa}</div>
          <div onclick="feito(${i})" class="caixaMarcar "><img src="imagens/marcar.png"></div>
          <div onclick="prepararEdicao(${i})" class="caixaEditar"><img src="imagens/editar.png"></div>
          <div onclick="apagar(${i})" class="caixaApagar"><img src="imagens/apagar.png"></div>
        </div>`
         }
    
     }
  }   

   function SoMarcados(){
     for (var i = 0; i<saveArray.length; i++){
         if(saveArray[i].status=="marcado"){
           armazenamento.innerHTML += `<div id = "${i}" class="caixaTotal">
          <div onclick="feito(${i})" class="caixaEscrita marcado">${saveArray[i].tarefa}</div>
          <div onclick="feito(${i})" class="caixaMarcar "><img src="imagens/marcar.png"></div>
          <div onclick="prepararEdicao(${i})" class="caixaEditar"><img src="imagens/editar.png"></div>
          <div onclick="apagar(${i})" class="caixaApagar"><img src="imagens/apagar.png"></div>
        </div>`
         }
    }
}

   function SoDesmarcados(){
     for (var i = 0; i<saveArray.length; i++){
         if(saveArray[i].status=="desmarcado"){
            armazenamento.innerHTML += `<div id = "${i}" class="caixaTotal">
          <div onclick="feito(${i})" id = "${i}" class="caixaEscrita">${saveArray[i].tarefa}</div>
          <div onclick="feito(${i})" class="caixaMarcar "><img src="imagens/marcar.png"></div>
          <div onclick="prepararEdicao(${i})" class="caixaEditar"><img src="imagens/editar.png"></div>
          <div onclick="apagar(${i})" class="caixaApagar"><img src="imagens/apagar.png"></div>
        </div>`
         }
      }
 }

 function filtro(){
   obterDoLocalStorage();
   armazenamento.innerHTML="";
        if(select.value == "Concluidas"){
          SoMarcados();
        }else if (select.value =="Pendentes") {
          SoDesmarcados()
        }else if(select.value =="Todos"){
          mostrar();
        }
    guardarDadosNoLocalStorage();
 }