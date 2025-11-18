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
import { useAuthWrapper } from './hooks';
import { getCookie, setCookie } from './cookies';

export const TaskManagerContext = createContext<{state: AppState; actions: AppActions} | undefined>(undefined);

function App() {
  const navigate = useNavigate()
  const { wrapWithAuth } = useAuthWrapper(navigate)
  const [token] = useState<string | undefined>(getCookie('token'))
  const [user, setUser] = useState<User | undefined>({username: 'admin', email: 'admin@bk.ru'})
  //КОСТЫЛЬ - отрицаетльные id, чтобы они не совпали с id созданных листов
  const [lists, setLists] = useState<Array<List>>([{title: 'Completed', id: -1, sections: ['Main section'], viewType: 'LIST', icon: "COMPLETED", color: "NONE"},
          {title: 'Basket', id: -2, sections: ['Main section'], viewType: 'LIST', icon: "BASKET", color: "NONE"},
          {title: 'All', id: -3,  sections: ['Main section'], viewType: 'LIST', icon: "DEFAULT", color: "NONE"},
          {title: 'Custom', id: 0,  sections: ['Main section'], viewType: 'KANBAN', icon: "DEFAULT", color: "YELLOW"}])
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [currentListId, setCurrentListId] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [error, setError] = useState<boolean>(false)

  const setSelectedTask = wrapWithAuth((taskId: number) => {
      setSelectedTaskId(taskId)
  })

  const updateTask = wrapWithAuth(async (updates: UpdateTaskDTO) => {
    try {
      if(selectedTaskId) {
        const updatedTask = await updateTaskOnServer(selectedTaskId, updates)
        const updatedTasks = tasks?.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task);

        setTasks(updatedTasks);
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  })

  const updateList = wrapWithAuth(async (listId: number, updates: UpdateListDTO) => {
    try {
      const updatedList = await updateListOnServer(listId, updates)
      const updatedLists = lists?.map(list =>
      list.id === updatedList.id ? { ...list, ...updatedList } : list);

      setLists(updatedLists);
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  })

  const switchList = wrapWithAuth(async (listId: number) => {
    setCurrentListId(listId)
    setSelectedTaskId(null);
    
    try {
      setCookie(`lastOpenListId`, `${listId}`)
      const loadedTasks = await fetchTasks(listId)
      setTasks(loadedTasks)
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error('custom', error.message);
          setError(true)
        }
      }
    }
  })

  const loadLists = wrapWithAuth(async () => {
    try {
      if(user) {
        const loadedLists = await fetchLists()
        setLists([...lists, ...loadedLists])
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  })

  const createList = wrapWithAuth(async (list: CreateListDTO) => {
    try {
      if(user) {
        const newList = await createListOnServer(list)
        setLists(lists => [...lists, newList]);
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error(error.message);
          setError(true)
        }
      }
    }
  })

  const createTask = wrapWithAuth(async (task: CreateTaskDTO) => {
    try {
      if(currentListId) {
        const newTask = await createTaskOnServer(task)
        setTasks(tasks => [...tasks, newTask]);
      }
    }catch(error) {
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  })

  const deleteList = wrapWithAuth((listId: number) => {
    try{ 
      deleteListOnServer(listId)
      setLists(lists => lists.filter(list => list.id !== listId))
      switchList(2)

    }catch(error){
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  })

  const deleteTask = wrapWithAuth((taskId: number) => {
    try{ 
      deleteTaskOnServer(taskId)
      setTasks(tasks => tasks.filter(task => task.id !== taskId))

      setSelectedTaskId(null)
    }catch(error){
      if (error instanceof CustomError) {
        console.error(error.message)
        if(error.statusCode == 401) {
          navigate('', {replace: true})
        }
        else {
          console.error("Произошла неизвестная ошибка.");
          setError(true)
        }
      }
    }
  })

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
      currentListId,
      error,
    };

    const actions: AppActions = {
      setUser,
      setSelectedTask,
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
  }, [user, lists, tasks, selectedTaskId, currentListId]);

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