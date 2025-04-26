// Seletores de elementos
const desc = window.document.querySelector('.descricao');
const valor = window.document.querySelector('.mutante');
const select = window.document.querySelector('select');
const capa = window.document.querySelector('.capa');
const capa2 = window.document.querySelector('.capa2');
const cadEdit = window.document.querySelector('.cadEdit');
const butaoAdd1 = window.document.querySelector('.adicionar');
const butaoCancelar = window.document.querySelector('.butaoCancelar');
const butaoadd2 = window.document.querySelector('.butaoAdicionar');
const butaoEditar = window.document.querySelector('.butaoEditar');
const butaoX = window.document.querySelector('.butaoX');
const space = window.document.querySelector('tbody');
const pesquisar = window.document.querySelector('.pesquisar');
const tbRegistros = window.document.querySelector('.tbRegistros');
const tempo = window.document.querySelector('.tempo');
const valorEntrada = window.document.querySelector('.valorEntrada');
const valorSaida = window.document.querySelector('.valorSaida');
const valorRestante = window.document.querySelector('.valorRestante');

// Variáveis
let c = 0;
const diaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
let arrayDados = [];
let data = '';

// Atualizar apenas a Data em Tempo Real
setInterval(() => {
  const agora = new Date();
  const diaAtual = agora.getDate();
  const mesAtual = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();
  const diaSemanaAtual = diaSemana[agora.getDay()];

  const diaFormatado = diaAtual < 10 ? "0" + diaAtual : diaAtual;
  const mesFormatado = mesAtual < 10 ? "0" + mesAtual : mesAtual;

  tempo.innerHTML = `${diaSemanaAtual} / ${diaFormatado}/${mesFormatado}/${anoAtual}`;
}, 500);

// Funções
function pegarTempo() {
  const agora = new Date();
  const diaAtual = agora.getDate();
  const mesAtual = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();
  const diaFormatado = diaAtual < 10 ? "0" + diaAtual : diaAtual;
  const mesFormatado = mesAtual < 10 ? "0" + mesAtual : mesAtual;
  return `${diaFormatado}-${mesFormatado}-${anoAtual}`;
}

let dadosObjecto = {
  data: "",
  descricao: "",
  montante: "",
  tipoTransicao: ""
};

exibirTabela();
calculos();

// Eventos
butaoadd2.addEventListener('click', () => {
  if (validarDscricao() && validarMutante() && validarselector()) {
    adicionarDadosNoObjecto();
    obterObjectosDoLocalStorageParaArray();
    adicionarNovoObjectoNoArray();
    guardarDadosNoLocalStorage();
    fechaModal();
    limparObjecto();
    calculos();
    exibirTabela();
  } else {
    validarDscricao();
    validarMutante();
    validarselector();
  }
});

butaoCancelar.addEventListener('click', () => {
  fechaModal();
  butaoEditar.style.display = "none";
  butaoadd2.style.display = "block";
  cadEdit.innerHTML = "Cadastro";
});

butaoAdd1.addEventListener('click', () => {
  capa.classList.add('abrirModal');
});

butaoX.addEventListener('click', () => {
  capa2.classList.remove('abrirModal2');
});

pesquisar.addEventListener('keyup', () => {
  let pegarValor = pesquisar.value.toLowerCase();
  let linha = tbRegistros.getElementsByTagName('tr');
  for (let i = 0; i < linha.length; i++) {
    let conteudo = linha[i].innerHTML.toLowerCase();
    if (conteudo.includes(pegarValor)) {
      linha[i].style.display = '';
    } else {
      linha[i].style.display = 'none';
    }
  }
});

// Funções de Validação
function validarDscricao() {
  if (desc.value == '') {
    erro(desc);
    return false;
  } else {
    correcto(desc);
    return true;
  }
}

function validarMutante() {
  if (valor.value == '' || valor.value <= 0) {
    erro(valor);
    return false;
  } else {
    correcto(valor);
    return true;
  }
}

function validarselector() {
  if (select.value == '' || select.value == 'Selecione') {
    erro(select);
    return false;
  } else {
    correcto(select);
    return true;
  }
}

// Funções de Estilo de Input
function erro(alvo) {
  alvo.style.border = "2px solid #FB2E1F";
}

function correcto(alvo) {
  alvo.style.border = '2px solid #808080';
}

// Modal
function fechaModal() {
  capa.classList.remove('abrirModal');
  desc.value = "";
  valor.value = "";
  select.value = "Selecione";
  desc.style.border = "2px solid #808080";
  valor.style.border = "2px solid #808080";
  select.style.border = "2px solid #808080";
}

// Local Storage
function obterObjectosDoLocalStorageParaArray() {
  if (localStorage.hasOwnProperty('objectoTabela')) {
    arrayDados = JSON.parse(localStorage.getItem('objectoTabela'));
  }
}

function adicionarNovoObjectoNoArray() {
  arrayDados.push(dadosObjecto);
}

function guardarDadosNoLocalStorage() {
  localStorage.setItem('objectoTabela', JSON.stringify(arrayDados));
}

// Edição
function prepararEdicao(indexId) {
  cadEdit.innerHTML = "Editar?";
  obterObjectosDoLocalStorageParaArray();
  butaoadd2.style.display = "none";
  butaoEditar.style.display = "block";
  capa.classList.add('abrirModal');
  desc.focus();
  desc.value = arrayDados[indexId].descricao;
  valor.value = arrayDados[indexId].montante;
  select.value = arrayDados[indexId].tipoTransicao;
  c = indexId;
}

function editar() {
  if (desc.value == "" || valor.value == "" || select.value == "Selecione") {
    validarDscricao();
    validarMutante();
    validarselector();
  } else {
    arrayDados[c].descricao = desc.value;
    arrayDados[c].montante = valor.value;
    arrayDados[c].tipoTransicao = select.value;
    capa.classList.remove('abrirModal');
    butaoEditar.style.display = "none";
    butaoadd2.style.display = "block";
    guardarDadosNoLocalStorage();
    exibirTabela();
    calculos();
    fechaModal();
    cadEdit.innerHTML = "Cadastro";
    c = 0;
  }
}

// Apagar
function prepararApagar(indexId) {
  capa2.classList.add('abrirModal2');
  c = indexId;
}

function apagar() {
  arrayDados.splice(c, 1);
  capa2.classList.remove('abrirModal2');
  guardarDadosNoLocalStorage();
  calculos();
  exibirTabela();
  c = 0;
}

function cancelarApagar() {
  capa2.classList.remove('abrirModal2');
}

// Cálculos
function calculos() {
  let renda = 0;
  let despesa = 0;
  let restante = 0;
  obterObjectosDoLocalStorageParaArray();
  for (let i = 0; i < arrayDados.length; i++) {
    if (arrayDados[i].tipoTransicao == "Entrada") {
      renda += parseInt(arrayDados[i].montante);
    } else if (arrayDados[i].tipoTransicao == "Saida") {
      despesa += parseInt(arrayDados[i].montante);
    }
  }
  restante = renda - despesa;
  valorEntrada.innerHTML = renda + ".00";
  valorSaida.innerHTML = despesa + ".00";
  valorRestante.innerHTML = restante + ".00";

  if (restante < 0) {
    valorRestante.style.color = "#FB2E1F";
  } else {
    valorRestante.style.color = "#5EAC24";
  }
}

// Exibir Tabela
function exibirTabela() {
  obterObjectosDoLocalStorageParaArray();
  space.innerHTML = "";
  for (let i = 0; i < arrayDados.length; i++) {
    const linhaCinza = (i + 1) % 2 == 0 ? 'class="cinza"' : '';
    const imgSeta = arrayDados[i].tipoTransicao == "Entrada" ? "setaC.png" : "setaB.png";

    space.innerHTML += `
      <tr id="${i}" ${linhaCinza}>
        <td>${arrayDados[i].data}</td>
        <td>${arrayDados[i].descricao}</td>
        <td>${arrayDados[i].montante}.00 MZN</td>
        <td><img src="imagens/${imgSeta}"></td>
        <td>
          <img src="imagens/editar.png" class="botaoEditar" onclick="prepararEdicao(${i})">
          <img src="imagens/excluir.png" class="botaoApagar" onclick="prepararApagar(${i})">
        </td>
      </tr>`;
  }
}

// Limpar objeto
function limparObjecto() {
  dadosObjecto.data = "";
  dadosObjecto.descricao = "";
  dadosObjecto.montante = "";
  dadosObjecto.tipoTransicao = "";
}

// Adicionar Dados
function adicionarDadosNoObjecto() {
  dadosObjecto = {
    data: pegarTempo(),
    descricao: desc.value,
    montante: valor.value,
    tipoTransicao: select.value
  };
}
