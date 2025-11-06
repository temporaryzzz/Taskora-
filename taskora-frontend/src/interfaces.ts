import type { Dispatch, SetStateAction } from "react";

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface List {
	id: number;
	ownerUserId: number; // id user'a
	title: string;
    sections: string[] | null;
    deleted: boolean;
    icon: 'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET';
    color: 'LIGHT' | 'RED' | 'BLUE' | 'YELLOW' | 'VIOLET' | 'GREEN' | "NONE";
}

export interface Task {
	id: number;
	ownerListId: number; //id list'a
	title: string;
	description: string;
    section: string;
	deadline: string | null;
	completed: boolean;
    deleted: boolean;
	priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT';
}

export interface AppState {
	user: User | undefined;
    lists: Array<List>;
    tasks: Array<Task>;
	currentListId: number | null;
	selectedTaskId: number | null;
    error: boolean;
}

export type CreateTaskDTO = Omit<Task, 'id' | 'completed' | 'deleted'>;
export type UpdateTaskDTO = Omit<Task, 'id'>;

export type CreateListDTO = Omit<List, 'id'>;
export type UpdateListDTO = Pick<List, 'title' | 'icon' | 'deleted' | 'color' | 'sections'>;

export interface AppActions {
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setSelectedTask: (taskId: number) => void;
  updateTask: (updates: UpdateTaskDTO) => void;
  updateList: (listId: number, updates: UpdateListDTO) => void;
  //Загрузка задач из списка на котороый переключился юзер
  //При первом входе используем чтобы открыть последний открытый список или All List
  switchList: (listId: number) => Promise<void>;
  loadLists: () => Promise<void>; //Инициализация списков
  //id приходит с сервера
  //Только созданная задача не может быть deteled --> на сервере по умолачинию ставится false
  //Только созданная задача не может быть completed --> на сервере по умолачинию ставится false
  createList: (list: CreateListDTO) => Promise<void>;
  createTask: (task: CreateTaskDTO) => Promise<void>;
}
