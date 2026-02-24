// Define um modelo de tarefa com propriedades e métodos
export function Task(title, id, completed = false, createdAt = Date.now(), updatedAt = null) {
  
  // Uma tarefa sem título não é válida
  if (!title) {
    throw new Error("Task precisa de um título")
  }

  // Propriedades da tarefa
  this.title = title
  this.id = id ? Number(id) : null
  this.completed = completed
  this.createdAt = createdAt
  this.updatedAt = updatedAt

  // Alterna o estado de conclusão (true ↔ false)
  this.toggleDone = function () {
    this.completed = !this.completed
  }
}
