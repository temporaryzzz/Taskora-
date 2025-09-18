//⁡⁢⁣⁣IMPORTS⁡
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';
import TaskPage from './components/task-manager/task-page';
import { useEffect, useState, createContext } from 'react';
import ProfilePage from './components/profile/profile-page';
import InizializateTasks, { InizializateLists, ChangeTask } from './scripts/dataTaskManager';

console.log(document.cookie)

export interface User {
  username: string;
  user_id: number;
  email: string;
}

interface Lists {
  list_id: number;
  list_name: string;
}

export interface TaskInfo {
  task_id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  priority: 'highest' | 'high' | 'middle' | 'default';
}

interface TaskManager {
    list_id: number | undefined;
    tasks: Array<TaskInfo> | undefined;
    currentTaskInfo: TaskInfo | undefined;
    setCurrentTask: (id: number) => void;
    changeCurrentTask: (title: string, description: string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => void;
    updateList: () => void;
    GetTasks: (list_id: number) => void;
}

export const TaskInfoContext = createContext<TaskManager | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [lists, setLists] = useState<Array<Lists> | undefined>()
  const [list_id, setList_id] = useState<number | undefined>()
  const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>()
  const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfo | undefined>()

  const GetTasks = (list_id: number) => {
    InizializateTasks(list_id).then((data) => {setTasks(data)})
    setList_id(list_id)
  }

  //Передаем данные о задаче в фокусе
  const setCurrentTask = (id: number) => {
      if(tasks) {
          const currentTaskIndex = tasks.findIndex(task => task.task_id === id)
          setCurrentTaskInfo(tasks[currentTaskIndex])
      }
  }
  
  const updateList = () => {
      if(tasks) 
          setTasks([...tasks])
  }

  const changeCurrentTask = (title: string, description: string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => {
      if(tasks != undefined) {
          const currentTaskIndex = tasks.findIndex(task => task.task_id === currentTaskInfo?.task_id)
          if(currentTaskIndex != undefined && currentTaskInfo != undefined) {

              //Изменяем значение tasks[currentTaskIndex], а потом обновляем сам tasks
              //Нужно для того чтобы своевременно обновился contextValue
              tasks[currentTaskIndex].title = title
              tasks[currentTaskIndex].description = description
              tasks[currentTaskIndex].date = date
              tasks[currentTaskIndex].priority = priority
              ChangeTask(currentTaskInfo.task_id, title, description, date, priority)
              updateList()
              setCurrentTaskInfo(tasks[currentTaskIndex])
          }
      }

  }
  

  //Запрос на получение списков задач
  useEffect(() => {
    if(user) {
      InizializateLists(user.user_id).then((data) => {setLists(data); console.log(data)})
    }
  }, [user])

  //Получение последнего открытого списка или дефолтного(единственного)
  useEffect(() => {
    console.log(lists)

    if(lists?.length == 1) {
      InizializateTasks(lists[0].list_id).then((data) => {setTasks(data)})
    }

  }, [lists])

  const contextValue = {
    list_id,
    tasks, 
    currentTaskInfo,
    setCurrentTask, 
    changeCurrentTask,
    updateList,
    GetTasks
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='' element={<SingInForm setUser={setUser}/>} />
            <Route path='sing-up' element={<SingUpForm />} />
            <Route path='profile' element={
              <>
                <Header active="profile" username={user?.username}/>
                <ProfilePage />
              </>} />
            <Route path='task-lists' element={
              <>
                <Header active="task-lists" username={user?.username}/>
                <TaskInfoContext.Provider value={contextValue}>
                  <TaskPage />
                </TaskInfoContext.Provider>
              </>} />
            <Route path='task-board' element={
              <>
                <Header active="task-board" username={user?.username}/>
                <div>IN DEVELOPMENT...</div>
              </>} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App
