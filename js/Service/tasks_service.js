import { urlTasks } from "../config.js"
import { createFetch } from "../createFetch.js"
import { Task } from '../Model/task_model.js'

// Gerencia todas as operações relacionadas a tarefas:
export default class TasksService {
  constructor() {
    // Inicializa o serviço com: this.tasks: array vazio para armazenar tarefas em memória
    this.tasks = []
    // this.tasks é a lista de tarefas mantida em memória no front.
    // Quando o usuário adiciona/deleta, esse array é atualizado
  }

  // Adiciona uma tarefa manualmente à lista interna
  add(task, userId, cb, error) {
    // Define função que será executada quando API responder com a tarefa criada
    const onTaskCreated = (createdTask) => {
      // POST retorna a tarefa criada, Se passou na validação, adiciona ao array
      this.tasks.push(new Task(
        createdTask.title,
        createdTask.id,
        createdTask.completed ?? false,
        createdTask.createdAt ?? Date.now(),
        createdTask.updatedAt ?? null
      ))
      // E renderiza sem fazer GET extra
      if (typeof cb === "function") {
        cb()
      }
    }
    createFetch("POST", `${urlTasks}?userId=${userId}`, task)
      .then(response => onTaskCreated(response))
      .catch(erro => error(erro.message))
  }

  // Busca todas as tarefas do usuário da API
  getTasks(userId, success, error) {
    // Define função que será executada quando API responder com as tarefas
    const onTasksReceived = (tasksFromAPI) => {
      // Transforma array de objetos brutos em array de instâncias Task
      // .map() cria novo array aplicando a função em cada elemento
      this.tasks = tasksFromAPI.map(task => {
        // Para cada tarefa bruta da API, cria uma instância de Task
        return new Task(
          task.title,
          task.id,
          task.completed,
          task.createdAt,
          task.updatedAt
        )
      })
      // Chama o callback passando o array de Tasks já transformado
      // callback será a função init() do todolist.js
      if (typeof success === "function") {
        success(this.tasks)
      }
    }
    createFetch("GET", `${urlTasks}?userId=${userId}`)
      .then(response => onTasksReceived(response))
      .catch(erro => error(erro.message))
  }

  // Remove uma tarefa: aceita `userId` para escopar a operação ao usuário correto
  remove(id, cb, error, userId) {
    // Define função que será executada quando API responder com a confirmação de delete 
    const onTaskDeleted = () => {
      // Remove do array em memória filtrando pela ID
      this.tasks = this.tasks.filter(task => task.id !== Number(id))
      if (typeof cb === "function") {
        cb()
      }
    }
    // Inclui `userId` como query string para garantir que a API delete apenasa tarefa do usuário especificado
    createFetch("DELETE", `${urlTasks}/${id}?userId=${userId}`)
      .then(() => onTaskDeleted())
      .catch(erro => error(erro.message))
  }

  update(task, userId, cb, error) {
    // Define função que será executada quando API responder com a tarefa atualizada
    const onTaskUpdated = (updatedTask) => {
      // Atualiza a tarefa no array em memória
      this.tasks = this.tasks.map(t => {
        if (t.id === task.id) {
          return new Task( 
            updatedTask.title,
            updatedTask.id,
            updatedTask.completed, 
            updatedTask.createdAt,
            updatedTask.updatedAt
          )
        } else {
          return t
        }
      })
      if (typeof cb === "function") {
        cb()
      }
    }
    createFetch("PUT", `${urlTasks}/${task.id}?userId=${userId}`, task)
      .then(response => onTaskUpdated(response))
      .catch(erro => error(erro.message))
  }

  // Retorna a tarefa em memória pelo id 
  getById(id) {
    return this.tasks.find(task => task.id === Number(id))
  }
}