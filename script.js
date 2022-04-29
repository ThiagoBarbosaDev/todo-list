// todo:

// logica de append textfield form + button 
// para gerar uma li num ol dentro de uma div

// logica para reordenar os itens da ordered FileList. 

// Logica para limpar todos os itens da lista 

// Logica para adicionar estilo no item da lista duplo-clickado

// logica para deletar todos os itens que tem o estilo duplo clicado

// logica para salvar a lista no local Storage

const inputTexto = document.querySelector('#texto-tarefa');
const buttonAdicionar = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const buttonApagaTudo = document.querySelector('#apaga-tudo');
const removerFinalizados = document.querySelector('#remover-finalizados');

buttonAdicionar.addEventListener('click', () => {
  appendNewListItem()
});





// todo: quebrar função em funções menores
function appendNewListItem() {
const newLi = document.createElement('li');
newLi.innerText = inputTexto.value;


newLi.addEventListener('click', (e) => {
 for (let child of listaTarefas.children) {
   child.classList.remove('selected')
//  todo: arrumar um jeito melhor de iterar
 }
  newLi.classList.add('selected');
})


newLi.addEventListener('dblclick', (e) => {
  if (e.target.className.includes('completed')) {e.target.classList.remove('completed')}
  else {e.target.classList.add('completed')}
})

listaTarefas.appendChild(newLi)
inputTexto.value = '';
}

function apagarTudo() {
  buttonApagaTudo.addEventListener('click', () => {
    while (listaTarefas.firstChild) {
      listaTarefas.removeChild(listaTarefas.firstChild);
    }
  })
}

apagarTudo()


// Dúvida: Não entendo pq ele não remove todos os childs se eles estiverem um seguido do outros
// a menos que eu coloque um 'i -= 1'
function removeCompleted() {

  removerFinalizados.addEventListener('click', () => {
for (let i = 0; i < listaTarefas.children.length; i += 1) {
  console.log(listaTarefas.children[i].className.includes('completed'))
  if (listaTarefas.children[i].className.includes('completed')) {listaTarefas.removeChild(listaTarefas.children[i]); i -= 1;}
}

})
}

removeCompleted()