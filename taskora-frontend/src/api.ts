import type { UpdateTaskDTO, UpdateListDTO, Task, List, CreateListDTO, CreateTaskDTO, User } from "./interfaces";
import { SYSTEM_LIST_IDS } from "./constants";

// ===== API адрес — всегда относительный, same-origin через proxy =====
export const SERVER_ADDRES = '/api';
export const SERVER_ADDRES__TASKS = `${SERVER_ADDRES}/tasks/`;
export const SERVER_ADDRES__TASKS_NO_SLASH = `${SERVER_ADDRES}/tasks`;
export const SERVER_ADDRES__LISTS = `${SERVER_ADDRES}/tasklists/`;
export const SERVER_ADDRES__LISTS_NO_SLASH = `${SERVER_ADDRES}/tasklists`;

/*
  FRONTEND_PROFILE — управляет включением CORS
  local: включаем для разработки
  prod: same-origin, CORS не нужен
*/
const FRONTEND_PROFILE = import.meta.env.FRONTEND_PROFILE ?? 'prod';
const IS_LOCAL = FRONTEND_PROFILE === 'local';

// ===== Опции fetch =====
const defaultFetchOptions = {
  credentials: 'include' as const, // cookies / JWT
  headers: {
    'Content-Type': 'application/json',
    ...(IS_LOCAL ? { 'Access-Control-Allow-Origin': 'http://localhost:3000' } : {})
  }
};

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

// ===== TASK UTILS =====
const buildTaskFetchURL = (listId: number) => {
  switch (listId) {
    case SYSTEM_LIST_IDS.COMPLETED: return `${SERVER_ADDRES__TASKS_NO_SLASH}?system=completed`;
    case SYSTEM_LIST_IDS.TODAY: return `${SERVER_ADDRES__TASKS_NO_SLASH}?system=today`;
    case SYSTEM_LIST_IDS.BASKET: return `${SERVER_ADDRES__TASKS_NO_SLASH}?system=deleted`;
    case SYSTEM_LIST_IDS.ALL: return `${SERVER_ADDRES__TASKS_NO_SLASH}?system=all`;
    default: return `${SERVER_ADDRES__TASKS}${listId}`;
  }
};

// ===== API FUNCTIONS =====
const fetchTasks = async (listId: number): Promise<Array<Task>> => {
  const response = await fetch(buildTaskFetchURL(listId), {
    method: 'GET',
    ...defaultFetchOptions,
    headers: {
      ...defaultFetchOptions.headers,
      'X-User-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });

  if (!response.ok) throw new CustomError(`Failed to fetch tasks for list ${listId}: ${response.status}`, response.status);

  const data = await response.json();
  return data.taskDTOs;
};

const fetchLists = async (): Promise<Array<List>> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
    method: 'GET',
    ...defaultFetchOptions
  });

  if (!response.ok) throw new CustomError(`Failed to fetch lists for user: ${response.status}`, response.status);

  const data = await response.json();
  return data.taskLists;
};

const createListOnServer = async (create: CreateListDTO): Promise<List> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
    method: 'POST',
    ...defaultFetchOptions,
    body: JSON.stringify(create)
  });

  if (!response.ok) throw new CustomError(`Failed to create list: ${response.status}`, response.status);
  return response.json();
};

const createTaskOnServer = async (create: CreateTaskDTO): Promise<Task> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS_NO_SLASH}`, {
    method: 'POST',
    ...defaultFetchOptions,
    body: JSON.stringify(create)
  });

  if (!response.ok) throw new CustomError(`Failed to create task: ${response.status}`, response.status);
  return response.json();
};

const updateTaskOnServer = async (taskId: number, updates: UpdateTaskDTO): Promise<Task> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    method: 'PUT',
    ...defaultFetchOptions,
    body: JSON.stringify(updates)
  });

  if (!response.ok) throw new CustomError(`Failed to update task: ${response.status}`, response.status);
  return response.json();
};

const updateListOnServer = async (listId: number, updates: UpdateListDTO): Promise<List> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${listId}`, {
    method: 'PUT',
    ...defaultFetchOptions,
    body: JSON.stringify(updates)
  });

  if (!response.ok) throw new CustomError(`Failed to update list: ${response.status}`, response.status);
  return response.json();
};

const deleteTaskOnServer = async (taskId: number): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    method: 'DELETE',
    ...defaultFetchOptions
  });

  if (!response.ok) throw new CustomError(`Failed to delete task: ${response.status}`, response.status);
};

const deleteListOnServer = async (listId: number): Promise<void> => {
  const response = await fetch(`${SERVER_ADDRES__LISTS}${listId}`, {
    method: 'DELETE',
    ...defaultFetchOptions
  });

  if (!response.ok) throw new CustomError(`Failed to delete list: ${response.status}`, response.status);
};

const taskRecoveryOnServer = async (taskId: number): Promise<List[]> => {
  const response = await fetch(`${SERVER_ADDRES__TASKS}${taskId}`, {
    method: 'PATCH',
    ...defaultFetchOptions,
  });

  if (!response.ok) {
    throw new CustomError(`Failed to update task: ${response.statusText}`, response.status);
  }

  const lists: List[] = await response.json();

  return lists;
}

const getUser = async (): Promise<User> => {
  const response = await fetch(`/api/users`, {
    method: 'GET',
    ...defaultFetchOptions,
  });

  if (!response.ok) {
    throw new CustomError(`Failed to fetch user: ${response.status}`, response.status);
  }
  const data = await response.json();
  const user: User = data;
  console.log(user)

  return user;
}

export {
  updateTaskOnServer, updateListOnServer, fetchTasks, fetchLists,
  createListOnServer, createTaskOnServer, deleteListOnServer, deleteTaskOnServer, taskRecoveryOnServer, getUser
};