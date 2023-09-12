import { create } from "zustand"
import { Itask } from "../interfaces/Itask.ts"
import { status } from "../modelos/status.ts"

interface TaskStore {
  id: string;
  taskName: string;
  tasks: Itask[];
  setTasks: (newTask: Itask[]) => void;
  getTask: () => TaskStore; // Definición de la función getTask
  addTask: (newTask: Itask) => void;
  setTaskName: (newName: string) => void;
  setTaskId: (newId: string) => void;
  todos: Itask[];
  inProgress: Itask[];
  finished: Itask[];
}

const useTasksStore = create<TaskStore>((set, get) => ({
  id: '',
  taskName: '',
  tasks: [],
  setTaskName: (newName: string) =>
    set((state) => ({
      taskName: newName,
    })),
  setTaskId: (newId: string) =>
    set((state) => ({
      id: state.id,
    })),
  setTasks: (newTasks: Itask[]) =>
    set((state) => {
      // Filtrar las tareas según su estado
      let tasksList: Itask[] = [];
      !Array.isArray(newTasks)
        ? (tasksList = state.tasks)
        : (tasksList = newTasks);

      const todos = tasksList.filter((task) => task.status === status.todos);
      const inProgress = tasksList.filter(
        (task) => task.status === status.inProgress
      );
      const finished = tasksList.filter(
        (task) => task.status === status.finished
      );

      return {
        ...state,
        tasks: tasksList,
        todos,
        inProgress,
        finished,
      };
    }),
  getTask: () => (get()), // Implementación de la función getTask
  addTask: (newTask: Itask) =>
    set((prev) => ({
      tasks: [...prev.tasks, newTask],
    })),
  todos: [],
  inProgress: [],
  finished: [],
}));

export default useTasksStore

