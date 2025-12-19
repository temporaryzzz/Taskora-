//⁡⁢⁣⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { Route, Routes, useNavigate } from 'react-router';
import { createContext, useState, useMemo, useEffect } from 'react';
import { SYSTEM_LIST_IDS } from './constants/systemListIds';
import type { AppState, AppActions, User, List, Task, CreateListDTO, 
              CreateTaskDTO, UpdateTaskDTO, UpdateListDTO} from './interfaces';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { fetchTasks, fetchLists, updateTaskOnServer, updateListOnServer, createListOnServer, createTaskOnServer, 
  deleteListOnServer, deleteTaskOnServer,
  taskRecoveryOnServer,
  getUser} from './api';
import './styles/main.scss'
import MainPage from './components/main-page';
import { getCookie, setCookie } from './cookies';
import { withAuthHandling } from './hooks';

export const TaskManagerContext = createContext<{state: AppState; actions: AppActions} | undefined>(undefined);

function App() {
  const navigate = useNavigate()
  const [logIn, setLogIn] = useState<boolean>(Boolean(getCookie('logIn')))
  const [user, setUser] = useState<User | undefined>()
  const [systemLists] = useState<Array<List>>([
    {title: 'Completed', id: SYSTEM_LIST_IDS.COMPLETED, sections: [''], viewType: 'LIST', icon: "COMPLETED", color: "NONE"},
    {title: 'Today', id: SYSTEM_LIST_IDS.TODAY, sections: [''], viewType: 'LIST', icon: "TODAY", color: "NONE"},
    {title: 'Basket', id: SYSTEM_LIST_IDS.BASKET, sections: [''], viewType: 'LIST', icon: "BASKET", color: "NONE"},
    {title: 'All', id: SYSTEM_LIST_IDS.ALL, sections: [''], viewType: 'LIST', icon: "DEFAULT", color: "NONE"}
  ])
  //КОСТЫЛЬ - отрицаетльные id, чтобы они не совпали с id созданных листов
  const [lists, setLists] = useState<Array<List>>([...systemLists])
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [currentList, setCurrentList] = useState<List | undefined>(undefined)
  const [selectedTaskIdLocal, setSelectedTaskIdLocal] = useState<number | null>(null)
  const [tempTaskTitle, setTempTaskTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false)

  const selectedTask = useMemo(() => {
    return tasks.find(task => task.id === selectedTaskIdLocal) || null
  }, [tasks, selectedTaskIdLocal])

  const loadUser = () => {
    withAuthHandling(getUser, (updatedUser) => setUser(updatedUser), {navigate, setLogIn, setError})
  }

  const setSelectedTask = (taskId: number) => {
      setSelectedTaskIdLocal(taskId)
      let title = tasks.find(task => task.id == taskId)?.title
      if(title) {
        setTempTaskTitle(title);
      }
  }

  const updateTask = async (taskId: number, updates: UpdateTaskDTO) => {
    withAuthHandling(() => updateTaskOnServer(taskId, updates), 
    (updatedTask) => {
      const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task);
      setTasks(updatedTasks);
    }, 
    {navigate, setLogIn, setError})
  }

  const updateList = async (listId: number, updates: UpdateListDTO) => {
    withAuthHandling(() => updateListOnServer(listId, updates), 
    (updatedList) => {
      const updatedLists = lists?.map(list => list.id === updatedList.id ? { ...list, ...updatedList } : list);
      setLists(updatedLists);
    }, 
    {navigate, setLogIn, setError})
  }

  const switchList = async (listId: number) => {
    setCurrentList(lists.find((list) => list.id == listId))
    setSelectedTaskIdLocal(null);
    setTasks([])

    withAuthHandling(() => fetchTasks(listId), 
    (userTasks) => {
      setCookie(`lastOpenListId`, `${listId}`)
      setTasks(userTasks);
    }, 
    {navigate, setLogIn, setError})
  }

  const loadLists = async () => {
    withAuthHandling(fetchLists, 
    (userLists) => {
      setLists([...systemLists, ...userLists])
    }, 
    {navigate, setLogIn, setError})
  }

  const createList = async (list: CreateListDTO) => {
    withAuthHandling(() => createListOnServer(list), 
    (newList) => {
      setLists(lists => [...lists, newList]);
    }, 
    {navigate, setLogIn, setError})
  }

  const createTask = async (task: CreateTaskDTO) => {
    withAuthHandling(() => createTaskOnServer(task), 
    (newTask) => {
      setTasks(tasks => [...tasks, newTask]);
    }, 
    {navigate, setLogIn, setError})
  }

  const deleteList = (listId: number) => {
    withAuthHandling(() => deleteListOnServer(listId), 
    () => {
      setLists(lists => lists.filter(list => list.id !== listId))
      switchList(2)
    }, 
    {navigate, setLogIn, setError})
  }

  const deleteTask = (taskId: number) => {
    withAuthHandling(() => deleteTaskOnServer(taskId), 
    () => {
      setTasks(tasks => tasks.filter(task => task.id !== taskId))
    }, 
    {navigate, setLogIn, setError})
  }

  const taskRecovery = async (taskId: number) => {
    withAuthHandling(() => taskRecoveryOnServer(taskId), 
    (updatedLists) => {
      setLists([...systemLists, ...updatedLists])
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
    }, 
    {navigate, setLogIn, setError})
  }

  useEffect(() => {
    if(logIn == true) {
      setCookie('logIn', 'true')
      loadUser()
    }
  }, [logIn])

  useEffect(() => {
    if(user !== undefined) {
      loadLists()
    }
  }, [user])

  useEffect(() => {
    if(user !== undefined) {
      const lastOpenListId = Number(getCookie(`lastOpenListId`))
      if(!isNaN(lastOpenListId) && lastOpenListId != null) {
        switchList(lastOpenListId)
      }
      else {
        switchList(SYSTEM_LIST_IDS.TODAY)
      }
    }
  }, [lists])

  //⁡⁢⁣⁣CONTEXT⁡
  const contextValue = useMemo(() => {
    const state: AppState = {
      user,
      lists,
      tasks,
      selectedTask,
      tempTaskTitle,
      currentList,
      error,
      logIn,
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
      taskRecovery,
      setLogIn,
    };

    return { state, actions };
  }, [user, lists, tasks, selectedTask, currentList, tempTaskTitle, error, logIn]);

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