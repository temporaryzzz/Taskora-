import type { Dispatch, SetStateAction } from "react";

export interface User {
    username: string;
    email: string;
}

export interface List {
    id: number;
    title: string;
    sections: string[];
    viewType: 'KANBAN' | 'LIST';
    icon: 'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET' | 'FOLDER' | 'CASE';
    color: 'LIGHT' | 'RED' | 'BLUE' | 'YELLOW' | 'VIOLET' | 'GREEN' | 'NONE';
}

export interface Task {
    id: number;
    ownerListId: number;
    title: string;
    description: string;
    section: string;
    deadline: string | null;
    completed: boolean;
    priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT';
}

export interface AppState {
    user: User | undefined;
    lists: Array<List>;
    tasks: Array<Task>;
    currentList: List | undefined;
    selectedTask: Task | null;
    tempTaskTitle: string;
    error: boolean;
    logIn: boolean;
}

export type CreateTaskDTO = Omit<Task, 'id' | 'completed'>;
export type UpdateTaskDTO = Omit<Task, 'id'>;

export type CreateListDTO = Omit<List, 'id' | 'deleted' | 'sections'>;
export type UpdateListDTO = Pick<List, 'title' | 'icon' | 'color' | 'sections' | 'viewType'>;

export interface AppActions {
    setUser: Dispatch<SetStateAction<User | undefined>>;
    setSelectedTask: (taskId: number) => void;
    setTempTaskTitle: Dispatch<SetStateAction<string>>;
    updateTask: (taskId: number, updates: UpdateTaskDTO) => void;
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
    deleteList: (listId: number) => void;
    deleteTask: (taskId: number) => void;
    taskRecovery: (taskId: number) => void;
    setLogIn: Dispatch<SetStateAction<boolean>>;
}
