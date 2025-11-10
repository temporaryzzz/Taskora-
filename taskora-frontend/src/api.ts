import { getCookie } from "./cookies";
import type { UpdateTaskDTO, UpdateListDTO, Task, List, CreateListDTO, CreateTaskDTO } from "./interfaces";

export const SERVER_ADDRES = 'http://localhost:8080/api';
const SERVER_ADDRES__TASKS = 'http://localhost:8080/api/tasks/';
const SERVER_ADDRES__TASKS_NO_SLASH = 'http://localhost:8080/api/tasks';
const SERVER_ADDRES__LISTS = 'http://localhost:8080/api/tasklists/';
const SERVER_ADDRES__LISTS_NO_SLASH = 'http://localhost:8080/api/tasklists';
export const FRONTEND_ADDRES = 'http://localhost:3000';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CustomError"; 
    this.statusCode = statusCode;
  }
}


const fetchTasks = async (listId: number): Promise<Array<Task>> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${listId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${getCookie('token')}`,
    }
  });

  if (!response.ok) {
    throw new CustomError(`Failed to fetch tasks for list ${listId}: ${response.status}`, response.status);
  }

  const tasks: Array<Task> = await response.json();

  return tasks;
}

const fetchLists = async (userId: number): Promise<Array<List>> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${getCookie('token')}`,
    }
  });

  if (!response.ok) {
    throw new CustomError(`Failed to fetch lists for user: ${userId}: ${response.status}`, response.status);
  }

  const lists: Array<List> = await response.json();
  
  return lists;
}

const createListOnServer = async (userId: number, create: CreateListDTO): Promise<List> => {
    const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify({...create, ownerUserId: userId})
  });

  if (!response.ok) {
    throw new CustomError(`Failed to create list: ${response.status}`, response.status);
  }

  const list: List = await response.json();

  return list;
}

const createTaskOnServer = async (create: CreateTaskDTO): Promise<Task> => {
    const response = await fetch(`${SERVER_ADDRES__TASKS_NO_SLASH}`, {
    method: 'POST',
    headers: {  
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify(create)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to create task: ${response.status}`, response.status);
  }

  const task: Task = await response.json();

  return task;
}

const updateTaskOnServer = async (taskId: number, updates: UpdateTaskDTO): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${getCookie('token')}`,},
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.status} ${response.statusText}`, response.status);
  }
}

const updateListOnServer = async (listId: number, updates: UpdateListDTO): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${listId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${getCookie('token')}`,},
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.status} ${response.statusText}`, response.status);
  }
}

export {  updateTaskOnServer, updateListOnServer, fetchTasks, fetchLists, createListOnServer, createTaskOnServer};