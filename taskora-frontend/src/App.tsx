//⁡⁢⁣⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { Route, Routes, useNavigate } from 'react-router';
import { createContext, useState, useMemo, useEffect } from 'react';
import type { AppState, AppActions, User, List, Task, CreateListDTO, 
              CreateTaskDTO, UpdateTaskDTO, UpdateListDTO} from './interfaces';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { fetchTasks, fetchLists, updateTaskOnServer, updateListOnServer, createListOnServer, createTaskOnServer, 
  deleteListOnServer, deleteTaskOnServer, CustomError} from './api';
import './styles/main.scss'
import MainPage from './components/main-page';
import { getCookie, setCookie, deleteCookie } from './cookies';

export const TaskManagerContext = createContext<{state: AppState; actions: AppActions} | undefined>(undefined);

function App() {
  const navigate = useNavigate()
  const [token] = useState<string | undefined>(getCookie('token'))
  const [user, setUser] = useState<User | undefined>({username: 'admin', email: 'admin@bk.ru'})
  //КОСТЫЛЬ - отрицаетльные id, чтобы они не совпали с id созданных листов
  const [lists, setLists] = useState<Array<List>>([{title: 'Completed', id: -1, sections: [''], viewType: 'LIST', icon: "COMPLETED", color: "NONE"},
          {title: 'Today', id: -2, sections: [''], viewType: 'LIST', icon: "DEFAULT", color: "NONE"},
          {title: 'Basket', id: -3, sections: [''], viewType: 'LIST', icon: "BASKET", color: "NONE"},
          {title: 'All', id: -4,  sections: [''], viewType: 'LIST', icon: "DEFAULT", color: "NONE"}])
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [currentList, setCurrentList] = useState<List | undefined>(undefined)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [tempTaskTitle, setTempTaskTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false)

  const setSelectedTask = (taskId: number) => {
      setSelectedTaskId(taskId)
      let title = tasks.find(task => task.id == taskId)?.title
      if(title) {
        setTempTaskTitle(title);
      }
  }

  const updateTask = async (taskId: number, updates: UpdateTaskDTO) => {
    try {
      const updatedTask = await updateTaskOnServer(taskId, updates)
      const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task);

      setTasks(updatedTasks);
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  }

  const updateList = async (listId: number, updates: UpdateListDTO) => {
    try {
      const updatedList = await updateListOnServer(listId, updates)
      const updatedLists = lists?.map(list => list.id === updatedList.id ? { ...list, ...updatedList } : list);

      setLists(updatedLists);
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  }

  const switchList = async (listId: number) => {
    setCurrentList(lists.find((list) => list.id == listId))
    setSelectedTaskId(null);
    setTasks([])
    
    try {
      setCookie(`lastOpenListId`, `${listId}`)
      setTasks(await fetchTasks(listId))
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error('custom', error.message);
          setError(true)
        }
      }
    }
  }

  const loadLists = async () => {
    try {
      setLists([...lists, ...await fetchLists()])
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        console.log('status code: ', error.statusCode)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error('error loadlists:', error.message);
          setError(true)
        }
      }
    }
  }

  const createList = async (list: CreateListDTO) => {
    try {
      if(user) {
        const newList = await createListOnServer(list)
        setLists(lists => [...lists, newList]);
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  }

  const createTask = async (task: CreateTaskDTO) => {
    try {
      if(currentList) {
        const newTask = await createTaskOnServer(task)
        setTasks(tasks => [...tasks, newTask]);
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  }

  const deleteList = (listId: number) => {
    try{ 
      deleteListOnServer(listId)
      setLists(lists => lists.filter(list => list.id !== listId))
      switchList(2)

    }catch(error){
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  }

  const deleteTask = (taskId: number) => {
    try{ 
      deleteTaskOnServer(taskId)
      setTasks(tasks => tasks.filter(task => task.id !== taskId))

      setSelectedTaskId(null)
    }catch(error){
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          deleteCookie('token')
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  }

  useEffect(() => {
    //loadUser() - email, username, settings
    if(token) {
      loadLists()
    }
  }, [])

  useEffect(() => {
    if(lists.length > 0) {
      const lastOpenListId = Number(getCookie(`lastOpenListId`))
      if(!isNaN(lastOpenListId) && lastOpenListId != null) {
        switchList(lastOpenListId)
      }
      else {
        switchList(2)
      }
    }
  }, [lists])

  //⁡⁢⁣⁣CONTEXT⁡
  const contextValue = useMemo(() => {
    const state: AppState = {
      user,
      lists,
      tasks,
      selectedTaskId,
      tempTaskTitle,
      currentList,
      error,
    };

    const actions: AppActions = {
      setUser,
      setSelectedTask,
      setTempTaskTitle,
      updateTask,
      updateList,
      switchList,
      loadLists,
      createList,
      createTask,
      deleteList,
      deleteTask,
    };

    return { state, actions };
  }, [user, lists, tasks, selectedTaskId, currentList, tempTaskTitle]);

  return(
      <TaskManagerContext.Provider value={contextValue}>
        <Routes>
          <Route path="" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path='main' element={<MainPage />} />
        </Routes>
      </TaskManagerContext.Provider>
)
}

export default App