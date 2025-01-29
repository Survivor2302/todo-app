import { Storage } from '@ionic/storage'

export class Task {
  id: string
  title: string
  status: string
  label: string
  priority: string

  constructor(data: Omit<Task, 'id'> & { id?: string }) {
    this.id = data.id || ''
    this.title = data.title
    this.status = data.status
    this.label = data.label
    this.priority = data.priority
  }
}
