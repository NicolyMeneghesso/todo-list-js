// Transforma um objeto Task em elemento HTML <li>
// Cada elemento tem data-action para identificar qual botão foi clicado
function createTaskLi(task) {
  const li = document.createElement("li")
  li.className = "todo-item"
  li.setAttribute("data-id", task.id) // Armazena o id da tarefa para identificação

  // Botão de check (marca como concluída)
  const checkButton = document.createElement("button")
  checkButton.className = "button-check"
  checkButton.setAttribute("data-action", "check")
  checkButton.innerHTML = `<i class="fas fa-check ${task.completed ? "" : "displayNone"}" data-action="check"></i>`
  li.appendChild(checkButton)

  // Exibe o título da tarefa
  const p = document.createElement("p")
  p.className = "task-name"
  p.textContent = task.title
  li.appendChild(p)

  // Ícone para editar a tarefa
  const editIcon = document.createElement("i")
  editIcon.className = "fas fa-edit"
  editIcon.setAttribute("data-action", "edit")
  li.appendChild(editIcon)

  // Container com input e botões para editar (inicialmente oculto)
  const editContainer = document.createElement("div")
  editContainer.className = "editContainer"

  // Campo de texto para editar o título
  const editInput = document.createElement("input")
  editInput.className = "editInput"
  editInput.value = task.title
  
  // Botão para salvar as alterações
  const saveButton = document.createElement("button")
  saveButton.textContent = "Edit"
  saveButton.setAttribute("data-action", "save")

  // Botão para cancelar edição
  const cancelButton = document.createElement("button")
  cancelButton.textContent = "Cancel"
  cancelButton.setAttribute("data-action", "cancel")

  editContainer.append(editInput, saveButton, cancelButton)
  li.appendChild(editContainer)

  // Ícone para deletar a tarefa
  const deleteIcon = document.createElement("i")
  deleteIcon.className = "fas fa-trash-alt"
  deleteIcon.setAttribute("data-action", "delete")
  li.appendChild(deleteIcon)

  return li
}

// Gerencia a renderização das tarefas na tela
export default class TasksView {
  // container: elemento HTML onde as tarefas serão inseridas
  constructor(container) {
    this.container = container
  }

  // Limpa a tela e renderiza todas as tarefas
  render(userTask) {
    this.container.innerHTML = ""
    userTask.forEach(task => {
      this.container.appendChild(createTaskLi(task)) // Cria e adiciona cada tarefa
    });
  }
}