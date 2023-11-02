// interfaces.ts
export interface Task {
  // Defina las propiedades de una tarea aquí, por ejemplo:
  id: string
  title: string
  description: string
  date: Date
  // ...
}

export interface TaskState {
  tasks: Task[]
}
