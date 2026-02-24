import TaskService from './Service/tasks_service.js'
import TasksController from './Controller/tasks_controller.js'
import TasksView from './View/tasks_view.js'

// Cria uma instância do serviço de tarefas
// A partir daqui, toda lógica de tarefas passa por esse objeto
const taskService = new TaskService()

const ul = document.getElementById("todo-list")
// Cria uma instância da view de tarefas
const tasksView = new TasksView(ul)

// Cria uma instância do controlador de tarefas
const taskController = new TasksController(taskService, tasksView)

// ELEMENTOS DO DOM
const form = document.getElementById("todo-add")
const input = document.getElementById("item-input")

// Busca tarefas do usuário ao carregar a página 
taskController.getTasks()

// Registra event listeners
form.addEventListener("submit", event => {
  event.preventDefault()
  taskController.add(input.value)
  input.value = ""
  input.focus()
})

// Gerencia cliques na lista (event delegation)
function onListClick(clickEvent) {
  const action = clickEvent.target.getAttribute("data-action")
  if (!action) return

  // Encontra o elemento <li> que foi clicado
  const currentLi = clickEvent.target.closest("li")
  if (!currentLi) return

  // Id da tarefa (armazenado pelo view no atributo data-id)
  const id = currentLi.getAttribute("data-id")
  const task = taskService.tasks.find(eachTask => String(eachTask.id) === id)

  const actions = {
    check() {
      taskController.toggleCompleted(id)
    },

    delete() {
      taskController.remove(id)
    },

    save() {
      const value = currentLi.querySelector(".editInput").value
      currentLi.querySelector(".editContainer").style.display = "none"
      taskController.update(id, { title: value })
    },

    cancel() {
      currentLi.querySelector(".editContainer").style.display = "none"
      currentLi.querySelector(".editInput").value = task.title
    },

    edit() {
      currentLi.querySelector(".editContainer").style.display = "flex"
    }
  }

  actions[action]?.()
}

ul.addEventListener("click", onListClick)