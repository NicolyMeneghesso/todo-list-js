// Importa o modelo de dados Task
import { Task } from "../Model/task_model.js"
import { userId } from "../config.js"

// Orquestra a comunicação entre Service e View
export default class TasksController {
  // Inicializa o controller com:
  // this.service: referência ao serviço que gerencia dados
  // this.view: referência à view que renderiza na tela
  constructor(service, view) {
    this.service = service
    this.view = view
  }

  add(title) {
    // Cria um novo objeto Task e passa para o serviço
    // Quando a resposta chegar, renderiza a lista atualizada
    this.service.add(
      new Task(title),
      userId,
      () => this.view.render(this.service.tasks),
      (error) => alert(error)
    )
  }

  remove(id) {
    // Solicita ao serviço que delete a tarefa
    // Quando a resposta chegar, renderiza a lista atualizada
    this.service.remove(Number(id), 
      () => this.view.render(this.service.tasks), 
      (error) => alert(error),
      userId
    )
  }

  update(id, updates) {
    // Busca a tarefa completa pelo id
    const existingTask = this.service.getById(Number(id))
    if (!existingTask) {
      alert('Tarefa não encontrada')
      return
    }
    // Solicita ao serviço que atualize a tarefa para o usuário
    // Quando a resposta chegar, renderiza a lista atualizada
    this.service.update({
      ...existingTask,       // copia todas as propriedades atuais da tarefa
      ...updates,            // sobrescreve com as atualizações (ex: title, completed)
      updatedAt: Date.now() 
    }, userId, () => 
      this.view.render(this.service.tasks), 
      (error) => alert(error)
    )
  }

  toggleCompleted(id) {
    // Recebe o `id`, busca a tarefa na fonte de verdade do serviço,
    const task = this.service.getById(Number(id))
    if (!task) {
      alert('Tarefa não encontrada')
      return
    }
    const { completed } = task
    this.update(id, { completed: !completed })
  }

  getTasks() {
    // Solicita ao serviço que recupere as tarefas do usuário
    // Quando a resposta chegar, renderiza a lista atualizada
    this.service.getTasks(userId, () => 
      this.view.render(this.service.tasks),
      (error) => alert(error)
    )
  }
}