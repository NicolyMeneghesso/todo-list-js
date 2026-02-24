import { urlTasks } from "../config.js"
import { request } from "../http.js"
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
  async add(task, userId, cb, error) {
    try {

      // Faz POST para API
      const createdTask = await request(
        "POST",
        `${urlTasks}?userId=${userId}`,
        task
      )
      // Converte resposta da API em instância Task
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
    } catch (erro) {
      error(erro.message)
    }
  }

  // Busca todas as tarefas do usuário da API
  async getTasks(userId, success, error) {
    try {
      // Faz GET na API
      const tasksFromAPI = await request(
        "GET",
        `${urlTasks}?userId=${userId}`
      )
      // Converte objetos brutos em instâncias Task
      this.tasks = tasksFromAPI.map(task =>
        new Task(
          task.title,
          task.id,
          task.completed,
          task.createdAt,
          task.updatedAt
        )
      )
      // Atualiza view
      if (typeof success === "function") {
        success(this.tasks)
      }

    } catch (erro) {
      error(erro.message)
    }
  }

  // Remove tarefa pelo id
  async remove(id, cb, error, userId) {
    try {

      // Faz DELETE na API
      await request(
        "DELETE",
        `${urlTasks}/${id}?userId=${userId}`
      )

      // Remove da memória local
      this.tasks = this.tasks.filter(task => task.id !== Number(id))

      // Atualiza view
      if (typeof cb === "function") {
        cb()
      }

    } catch (erro) {
      error(erro.message)
    }
  }

  // Atualiza tarefa existente
  async update(task, userId, cb, error) {
    try {

      // Envia PUT para API
      const updatedTask = await request(
        "PUT",
        `${urlTasks}/${task.id}?userId=${userId}`,
        task
      )

      // Atualiza tarefa no array em memória
      this.tasks = this.tasks.map(t => {
        if (t.id === task.id) {
          return new Task(
            updatedTask.title,
            updatedTask.id,
            updatedTask.completed,
            updatedTask.createdAt,
            updatedTask.updatedAt
          )
        }
        return t
      })

      // Atualiza view
      if (typeof cb === "function") {
        cb()
      }

    } catch (erro) {
      error(erro.message)
    }
  }

  // Retorna a tarefa em memória pelo id 
  getById(id) {
    return this.tasks.find(task => task.id === Number(id))
  }
}