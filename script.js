const inputTexto = document.querySelector('#texto-tarefa');
const buttonAdicionar = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const buttonApagaTudo = document.querySelector('#apaga-tudo');
const buttonRemoverFinalizados = document.querySelector('#remover-finalizados');
const buttonSalvarTarefas = document.querySelector('#salvar-tarefas');
const buttonMoveUp = document.querySelector('#mover-cima');
const buttonMoveDown = document.querySelector('#mover-baixo');
const buttonRemoverSelecionado = document.querySelector('#remover-selecionado');
const listaArray = listaTarefas.children;

// todo: quebrar função em funções menores
function appendNewListItem() {
  const newLi = document.createElement('li');
  newLi.innerText = inputTexto.value;
  newLi.addEventListener('click', () => {
    for (const child of listaTarefas.children) {
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

buttonAdicionar.addEventListener('click', () => {
  appendNewListItem();
});

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
      if (listaTarefas.children[i].className.includes('completed')) {
        listaTarefas.removeChild(listaTarefas.children[i]);
        i -= 1;
      }
    }
  });
}

removeCompleted();

function deleteSelected() {
  buttonRemoverSelecionado.addEventListener('click', () => {
    for (const child of listaTarefas.children) {
      if (child.className.includes('selected')) {
        listaTarefas.removeChild(child);
      }
    }
  });
}

deleteSelected();

function moveUp() {
  buttonMoveUp.addEventListener('click', () => {
    for (let i = 0; i < listaArray.length; i += 1) {
      const liSelected = listaArray[i].className.includes('selected');
      let cacheInnerText = '';
      let cacheClasses = '';

      if (liSelected && listaArray[i - 1]) {
        cacheInnerText = listaArray[i - 1].innerText;
        cacheClasses = listaArray[i - 1].className;
        listaArray[i - 1].innerText = listaArray[i].innerText;
        listaArray[i - 1].className = listaArray[i].className;
        listaArray[i].innerText = cacheInnerText;
        listaArray[i].className = cacheClasses;
        cacheInnerText = '';
        cacheClasses = '';
      }
    }
  });
}

moveUp();

function moveDown() {
  buttonMoveDown.addEventListener('click', () => {
    for (let i = listaArray.length - 1; i >= 0; i -= 1) {
      const liSelected = listaArray[i].className.includes('selected');
      let cacheInnerText = '';
      let cacheClasses = '';

      if (liSelected && listaArray[i + 1]) {
        cacheInnerText = listaArray[i + 1].innerText;
        cacheClasses = listaArray[i + 1].className;
        listaArray[i + 1].innerText = listaArray[i].innerText;
        listaArray[i + 1].className = listaArray[i].className;
        listaArray[i].innerText = cacheInnerText;
        listaArray[i].className = cacheClasses;
        cacheInnerText = '';
        cacheClasses = '';
      }
    }
  });
}

moveDown();

function salvarLocalStorage() {
  if (listaTarefas !== 0) {
    buttonSalvarTarefas.addEventListener('click', () => {
      localStorage.clear();
      const savedTasks = [];
      for (let i = 0; i < listaArray.length; i += 1) {
        savedTasks.push({
          savedText: listaArray[i].innerText,
          savedClasses: listaArray[i].className,
        });
      }
      localStorage.setItem(
        'savedTasksLocalStorage',
        JSON.stringify(savedTasks),
      );
    });
  }
}

salvarLocalStorage();

function resgatarLocalStorage() {
  //   JSON.parse(localStorage.getItem('savedTasksLocalStorage'))
  const tasksCache = JSON.parse(localStorage.getItem('savedTasksLocalStorage'));
  // console.log(tasksCache)

  if (tasksCache) {
    for (let i = 0; i < tasksCache.length; i += 1) {
      const newLi = document.createElement('li');
      newLi.innerText = tasksCache[i].savedText;
      newLi.className = tasksCache[i].savedClasses;

      newLi.addEventListener('click', () => {
        for (const child of listaTarefas.children) {
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
    }
  }
}

resgatarLocalStorage();
