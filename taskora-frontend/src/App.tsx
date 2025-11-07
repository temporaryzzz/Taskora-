//⁡⁢⁣⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { BrowserRouter, Route, Routes } from 'react-router';
import { createContext, useState, useMemo, useEffect } from 'react';
import type { AppState, AppActions, User, List, Task, CreateListDTO, 
              CreateTaskDTO, UpdateTaskDTO, UpdateListDTO} from './interfaces';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { fetchTasks, fetchLists, updateTaskOnServer, updateListOnServer, createListOnServer, createTaskOnServer} from './api';
import './styles/main.scss'
import MainPage from './components/main-page';

export const TaskManagerContext = createContext<{state: AppState; actions: AppActions} | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | undefined>({username: 'admin', id: 0, email: 'admin@bk.ru'})
  const [lists, setLists] = useState<Array<List>>([{title: 'Completed', id: 0, ownerUserId: 0, sections: ['Main section'], deleted: false, icon: "COMPLETED", color: "NONE"},{title: 'Basket', id: 1, ownerUserId: 0, sections: ['Main section'], deleted: false, icon: "BASKET", color: "NONE"},{title: 'All', id: 2, ownerUserId: 0, sections: ['Main section'], deleted: false, icon: "DEFAULT", color: "YELLOW"},])
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [currentListId, setCurrentListId] = useState<number | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [error, setError] = useState<boolean>(false)


  const setSelectedTask = (taskId: number) => {
    setSelectedTaskId(taskId)
  }

  const updateTask = (updates: UpdateTaskDTO) => {
    const updatedTasks = tasks?.map(task =>
      task.id === selectedTaskId ? { ...task, ...updates } : task
    );

    setTasks(updatedTasks);

    try {
      if(selectedTaskId)
        updateTaskOnServer(selectedTaskId, updates)
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  const updateList = (listId: number, updates: UpdateListDTO) => {
    const updatedLists = lists?.map(list =>
      list.id === listId ? { ...list, ...updates } : list
    );

    setLists(updatedLists);

    try {
      updateListOnServer(listId, updates)
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  const switchList = async (listId: number) => {
    setCurrentListId(listId)
    setSelectedTaskId(null);
    
    try {
      const loadedTasks = await fetchTasks(listId)
      setTasks(loadedTasks)
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  const loadLists = async () => {
    try {
      if(user) {
        const loadedLists = await fetchLists(user.id)
        setLists(loadedLists)
      }
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  const createList = async (list: CreateListDTO) => {
    try {
      if(user) {
        const newList = await createListOnServer(user.id, list)
        setLists(lists => [...lists, newList]);
      }
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  const createTask = async (task: CreateTaskDTO) => {
    try {
      if(currentListId) {
        const newTask = await createTaskOnServer(task)
        setTasks(tasks => [...tasks, newTask]);
      }
    }catch(error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    loadLists()
    console.log('user', user)
  }, [user])

  useEffect(() => {
    if(lists.length > 0) {
      //При первом входе открывать 2й список - All
      switchList(2)
    }
    //Усли в куках есть последний открытый список - то открывать его
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
    };

    return { state, actions };
  }, [user, lists, tasks, selectedTaskId, currentListId]);

  return(
    <BrowserRouter>
      <TaskManagerContext.Provider value={contextValue}>
        <Routes>
          <Route path="" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path='main' element={<MainPage />} />
        </Routes>
      </TaskManagerContext.Provider>
    </BrowserRouter>
  )
}

export default App