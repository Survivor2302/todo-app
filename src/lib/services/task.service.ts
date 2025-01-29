import { Storage } from '@ionic/storage'
import { Task } from '../model/task.class'

export class TaskService {
  private static STORAGE_KEY = 'tasks'
  private storage: Storage
  private listeners: ((tasks: Task[]) => void)[] = []

  constructor(storage: Storage) {
    this.storage = storage
  }

  subscribe(listener: (tasks: Task[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(tasks: Task[]) {
    this.listeners.forEach(listener => listener(tasks))
  }

  private async getNextId(): Promise<number> {
    const tasks = await this.getAll()
    if (tasks.length === 0) return 1
    
    const maxId = Math.max(...tasks.map(task => {
      const num = parseInt(task.id.split('-')[1])
      return isNaN(num) ? 0 : num
    }))
    return maxId + 1
  }

  async create(data: Omit<Task, 'id'>): Promise<Task> {
    const nextId = await this.getNextId()
    const task = new Task({ ...data, id: `TASK-${nextId}` })
    
    const tasks = await this.getAll()
    tasks.push(task)
    await this.storage.set(TaskService.STORAGE_KEY, tasks)
    
    this.notifyListeners(tasks)
    return task
  }

  async getOne(id: string): Promise<Task | null> {
    const tasks = await this.getAll()
    const taskData = tasks.find(t => t.id === id)
    return taskData ? new Task(taskData) : null
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.storage.get(TaskService.STORAGE_KEY)
    const tasksArray = Array.isArray(tasks) ? tasks : []
    return tasksArray.map(t => new Task(t))
  }

  async delete(id: string): Promise<void> {
    const tasks = await this.getAll()
    const filteredTasks = tasks.filter(t => t.id !== id)
    await this.storage.set(TaskService.STORAGE_KEY, filteredTasks)
    this.notifyListeners(filteredTasks)
  }

  async deleteAll(): Promise<void> {
    await this.storage.set(TaskService.STORAGE_KEY, [])
    this.notifyListeners([])
  }
  
  async update(task: Task): Promise<void> {
    const tasks = await this.getAll()
    const index = tasks.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks[index] = task
      await this.storage.set(TaskService.STORAGE_KEY, tasks)
      this.notifyListeners(tasks)
    }
  }
} 