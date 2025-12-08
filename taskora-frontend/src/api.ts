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
  let fetchString = `${SERVER_ADDRES__TASKS}${listId}`
  if(listId == -1) {
     fetchString = `${SERVER_ADDRES__TASKS_NO_SLASH}?system=completed`
  } else if(listId == -2) {
    fetchString = `${SERVER_ADDRES__TASKS_NO_SLASH}?system=today`
  } else if(listId == -3) {
    fetchString = `${SERVER_ADDRES__TASKS_NO_SLASH}?system=deleted`
  } else if(listId == -4) {
    fetchString = `${SERVER_ADDRES__TASKS_NO_SLASH}?system=all`
  }
  
  const response = await fetch(fetchString, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new CustomError(`Failed to fetch tasks for list ${listId}: ${response.status}`, response.status);
  }

  const data = await response.json();
  const tasks: Array<Task> = data.taskDTOs;

  return tasks;
}

const fetchLists = async (): Promise<Array<List>> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new CustomError(`Failed to fetch lists for user: ${response.status}`, response.status);
  }
  const data = await response.json();
  const lists: Array<List> = data.taskLists;
  
  return lists;
}

const createListOnServer = async (create: CreateListDTO): Promise<List> => {
    const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({...create})
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
    },
    credentials: 'include',
    body: JSON.stringify(create)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to create task: ${response.status}`, response.status);
  }

  const task: Task = await response.json();

  return task;
}

const updateTaskOnServer = async (taskId: number, updates: UpdateTaskDTO): Promise<Task> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,},
    credentials: 'include',
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.status} ${response.statusText}`, response.status);
  }

  const task: Task = await response.json();

  return task;
}

const updateListOnServer = async (listId: number, updates: UpdateListDTO): Promise<List> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${listId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,},
    credentials: 'include',
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.status} ${response.statusText}`, response.status);
  }

  const list: List = await response.json();

  return list;
}

const deleteTaskOnServer = async (taskId: number): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
    },
    method: 'DELETE', 
    credentials: 'include',
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.statusText}`, response.status);
  }
}

const deleteListOnServer = async (listId: number): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${listId}`, {
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
    },
    method: 'DELETE', 
    credentials: 'include',
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.statusText}`, response.status);
  }
}

const taskRecoveryOnServer = async (taskId: number): Promise<Task> => {
    const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    headers: {
      'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
    },
    method: 'PATCH', 
    credentials: 'include',
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.statusText}`, response.status);
  }

  const recoveryTask: Task = await response.json();

  return recoveryTask;
}

export {  updateTaskOnServer, updateListOnServer, fetchTasks, fetchLists, 
  createListOnServer, createTaskOnServer, deleteListOnServer, deleteTaskOnServer, taskRecoveryOnServer};