export interface User {
    username: string;
    id: number;
    email: string;
}

export interface List {
	id: number;
	ownerUserId: number; // id user'a
	title: string;
    icon: 'DEFAULT' | 'ARCHIVE';
    iconColor: 'DEFAULT' | 'VIOLET' | 'YELLOW' | 'BLUE' | 'RED';
}

export interface Task {
	id: number;
	ownerListId: number; //id list'a
	title: string;
	description: string;
	deadline: string | null;
	completed: boolean;
    deleted: boolean;
	priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT';
}

export interface AppState {
	user: User;
    lists: Record<number, List>;
    tasks: Record<number, Task>;
	currentListId: number;
	selectedTaskId: number | null;
    isLoading: boolean;
    error: string | null;
}

type CreateTaskDTO = Omit<Task, 'id' | 'completed' | 'deleted'>;
type UpdateTaskDTO = Partial<Pick<Task, 'title' | 'description' | 'deadline' | 'priority' | 'completed' | 'deleted'>>;

type CreateListDTO = Omit<List, 'id'>;
type UpdateListDTO = Partial<Pick<List, 'title' | 'icon' | 'iconColor'>>;

export interface AppActions {
  setSelectedTask: (id: number) => void;
  //⁡⁣⁣⁢Pick берет поля из Task по именам⁡
  //⁡⁣⁣⁢Partial - делает все поля необязательными: title?: string и.т.д⁡
  updateTask: (id: number, updates: UpdateTaskDTO) => void;
  updateList: (id: number, updates: UpdateListDTO) => void;
  //Загрузка задач из списка на котороый переключился юзер
  //При первом входе используем чтобы открыть последний открытый список или All List
  switchList: (listId: number) => Promise<void>;
  loadLists: () => Promise<void>; //Инициализация списков
  //⁡⁣⁣⁢Omit не будет учитывать указанные поля из Task⁡
  //id приходит с сервера
  //Только созданная задача не может быть deteled --> на сервере по умолачинию ставится false
  //Только созданная задача не может быть completed --> на сервере по умолачинию ставится false
  createList: (list: CreateListDTO) => Promise<void>;
  //Список удаляется навсегда, а все его задачи будут попадать в корзину
  deleteList: (id: number) => Promise<void>;
  createTask: (task: CreateTaskDTO) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}
