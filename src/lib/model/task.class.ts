import { Storage } from '@ionic/storage'

export class Task {
  id: string
  title: string
  status: string
  label: string
  priority: string

  constructor(data: Omit<Task, 'id'> & { id?: string }) {
    this.id = data.id || Task.generateId()
    this.title = data.title
    this.status = data.status
    this.label = data.label
    this.priority = data.priority
  }

  private static STORAGE_KEY = 'tasks'
  private static storage: Storage

  static initialize(storage: Storage) {
    Task.storage = storage
  }

  private static async getNextId(): Promise<number> {
    const tasks = await Task.getAll()
    if (tasks.length === 0) return 1
    
    const maxId = Math.max(...tasks.map(task => {
      const num = parseInt(task.id.split('-')[1])
      return isNaN(num) ? 0 : num
    }))
    return maxId + 1
  }

  private static generateId(): string {
    return `TASK-${Date.now()}`
  }

  private static listeners: ((tasks: Task[]) => void)[] = [];

  static subscribe(listener: (tasks: Task[]) => void) {
    Task.listeners.push(listener);
    return () => {
      Task.listeners = Task.listeners.filter(l => l !== listener);
    };
  }

  private static notifyListeners(tasks: Task[]) {
    Task.listeners.forEach(listener => listener(tasks));
  }

  static async create(data: Omit<Task, 'id'>): Promise<Task> {
    const task = new Task(data)
    const nextId = await Task.getNextId()
    task.id = `TASK-${nextId}`
    
    const tasks = await Task.getAll()
    tasks.push(task)
    await Task.storage.set(Task.STORAGE_KEY, tasks)
    
    Task.notifyListeners(tasks)
    return task
  }

  static async getOne(id: string): Promise<Task | null> {
    const tasks = await Task.getAll()
    const taskData = tasks.find((t: Task) => t.id === id)
    return taskData ? new Task(taskData) : null
  }

  static async getAll(): Promise<Task[]> {
    const tasks = await Task.storage.get(Task.STORAGE_KEY)
    // Ensure tasks is an array before mapping
    const tasksArray = Array.isArray(tasks) ? tasks : []
    return tasksArray.map((t: Task) => new Task(t))
  }

  static async delete(id: string): Promise<void> {
    const tasks = await Task.getAll()
    const filteredTasks = tasks.filter(t => t.id !== id)
    await Task.storage.set(Task.STORAGE_KEY, filteredTasks)
    Task.notifyListeners(filteredTasks)
  }

  static async deleteAll(): Promise<void> {
    await Task.storage.set(Task.STORAGE_KEY, [])
    Task.notifyListeners([])
  }
  
  static async update(task: Task): Promise<void> {
    const tasks = await Task.getAll()
    const index = tasks.findIndex(t => t.id === task.id)
    if (index !== -1) {
        tasks[index] = task
        await Task.storage.set(Task.STORAGE_KEY, tasks)
        Task.notifyListeners(tasks)
    }
  }

}
