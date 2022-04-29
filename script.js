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

buttonAdicionar.addEventListener('click', () => {
  appendNewListItem()
});






function appendNewListItem() {
const newLi = document.createElement('li');
newLi.innerText = inputTexto.value;

newLi.addEventListener('click', (e) => {
 for (let child of listaTarefas.children) {
   child.className = ''
  //  todo: arrumar um jeito melhor de iterar
 }

  newLi.className = 'selected';
})


listaTarefas.appendChild(newLi)
inputTexto.value = '';
}
