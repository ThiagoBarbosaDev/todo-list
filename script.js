const inputTexto = document.querySelector('#texto-tarefa');
const buttonAdicionar = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const buttonApagaTudo = document.querySelector('#apaga-tudo');
const buttonRemoverFinalizados = document.querySelector('#remover-finalizados');
const buttonSalvarTarefas = document.querySelector('#salvar-tarefas');
const buttonMoveUp = document.querySelector('#mover-cima');
const buttonRemoverSelecionado = document.querySelector('#remover-selecionado')

const listaArray = listaTarefas.children;


buttonAdicionar.addEventListener('click', () => {
  appendNewListItem();
});

// todo: quebrar função em funções menores
function appendNewListItem() {
  const newLi = document.createElement('li');
  newLi.innerText = inputTexto.value;

  newLi.addEventListener('click', (e) => {
    for (let child of listaTarefas.children) {
      child.classList.remove('selected');
      //  todo: arrumar um jeito melhor de iterar
    }
    newLi.classList.add('selected');
  });

  newLi.addEventListener('dblclick', (e) => {
    if (e.target.className.includes('completed')) {
      e.target.classList.remove('completed');
    } else {
      e.target.classList.add('completed');
    }
  });
  listaTarefas.appendChild(newLi);
  inputTexto.value = '';
}

function apagarTudo() {
  buttonApagaTudo.addEventListener('click', () => {
    while (listaTarefas.firstChild) {
      listaTarefas.removeChild(listaTarefas.firstChild);
    }
  });
}

apagarTudo();

// Dúvida: Não entendo pq ele não remove todos os childs se eles estiverem um seguido do outros
// a menos que eu coloque um 'i -= 1'
function removeCompleted() {
  buttonRemoverFinalizados.addEventListener('click', () => {
    for (let i = 0; i < listaTarefas.children.length; i += 1) {
      console.log(listaTarefas.children[i].className.includes('completed'));
      if (listaTarefas.children[i].className.includes('completed')) {
        listaTarefas.removeChild(listaTarefas.children[i]);
        i -= 1;
      }
    }
  });
}

removeCompleted();


// function salvarLocalStorage() {
// let itens = listaTarefas.children.length

//   buttonSalvarTarefas.addEventListener('click',() => {
//   for (let i = 0; i < itens; i += 1) {

//   }



//   })
// }

// function moveUp() {

// buttonMoveUp.addEventListener('click', () => {

// for (let i = 0; i < listaArray.length; i += 1) {
//   const liSelected = listaArray[i].className.includes('selected')
// console.log(listaArray)
// console.log(liSelected)
// let cacheInnerText = ''
// let cacheClasses = ''

// if (liSelected[i-1]) {
// cacheInnerText = listaArray[i-0].innerText;
// cacheClasses = listaArray[i-0].className;
// listaArray[i-0].innerText = listaArray[i].innerText
// listaArray[i-0].className = listaArray[i].className
// listaArray[i].innerText = cacheInnerText 
// listaArray[i].className = cacheClasses
// } 


// }

// })
// }

// moveUp()


function deleteSelected() {
buttonRemoverSelecionado.addEventListener('click', () => {
  
  for (child of listaTarefas.children) {
    if (child.className.includes('selected')) {listaTarefas.removeChild(child)}
  }

})
}

deleteSelected()