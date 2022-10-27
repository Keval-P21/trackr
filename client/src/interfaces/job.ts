import { Task } from "./task";

export interface Job {
  _id?: string,
  company: string,
  title: string,
  status: string,
  userId: string,
  location?: string
  salary?: string,
  post_url?: string,
  description?: string,
  notes?: string,
  date_added?: string,
  color?: string,
  todos: Task[]
}