//⁡⁢⁣⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';
import TaskPage from './components/task-manager/task-page';
import { useEffect, useState, createContext } from 'react';
import ProfilePage from './components/profile/profile-page';
import InizializateTasks, {
  InizializateLists,
  ChangeTask,
} from './scripts/dataTaskManager';

export interface User {
  username: string;
  user_id: number;
  email: string;
}

export interface List {
  id: number;
  owner_id: number;
  title: string;
}

export interface TaskInfo {
  id: number;
  taskList_id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT';
}

interface TaskManager {
  list_id: number | undefined;
  lists: Array<List> | undefined;
  tasks: Array<TaskInfo> | undefined;
  currentTaskInfo: TaskInfo | undefined;
  setCurrentTask: (id: number) => void;
  changeCurrentTask: (
    title: string,
    description: string,
    due_date: string,
    priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT',
    completed: boolean
  ) => void;
  updateList: () => void;
  GetTasks: (list_id: number) => void;
}

export const TaskInfoContext = createContext<TaskManager | undefined>(
  undefined
);

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [lists, setLists] = useState<Array<List> | undefined>();
  const [list_id, setList_id] = useState<number | undefined>();
  const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>();
  const [currentTaskInfo, setCurrentTaskInfo] = useState<
    TaskInfo | undefined
  >();

  const GetTasks = (list_id: number) => {
    //taskDTOs - это хуйня с бэка
    InizializateTasks(list_id).then(data => {
      setTasks(data.taskDTOs);
      console.log('taskDTOs:', typeof data.taskDTOs);
    });
    console.log('tasks:', typeof tasks);
    setList_id(list_id);
  };

  //Передаем данные о задаче в фокусе
  const setCurrentTask = (id: number) => {
    if (tasks) {
      const currentTaskIndex = tasks.findIndex(task => task.id === id);
      setCurrentTaskInfo(tasks[currentTaskIndex]);
    }
  };

  const updateList = () => {
    if (tasks) setTasks([...tasks]);
  };

  const changeCurrentTask = (
    title: string,
    description: string,
    due_date: string,
    priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT',
    completed: boolean
  ) => {
    if (tasks != undefined) {
      const currentTaskIndex = tasks.findIndex(
        task => task.id === currentTaskInfo?.id
      );
      if (currentTaskIndex != undefined && currentTaskInfo != undefined) {
        if (
          currentTaskInfo.title == title &&
          currentTaskInfo.description == description &&
          currentTaskInfo.due_date == due_date &&
          currentTaskInfo.priority == priority &&
          currentTaskInfo.completed == completed
        ) {
          console.log('no changes');
          return;
        }
        //Изменяем значение tasks[currentTaskIndex], а потом обновляем сам tasks
        //Нужно для того чтобы своевременно обновился contextValue
        tasks[currentTaskIndex].title = title;
        tasks[currentTaskIndex].description = description;
        tasks[currentTaskIndex].due_date = due_date;
        tasks[currentTaskIndex].priority = priority;
        ChangeTask(
          currentTaskInfo.id,
          Number(list_id),
          title,
          description,
          due_date,
          priority,
          completed
        );
        updateList();
        setCurrentTaskInfo(tasks[currentTaskIndex]);
      }
    }
  };

  //Запрос на получение списков задач
  useEffect(() => {
    if (user?.user_id) {
      InizializateLists(user.user_id).then(data => {
        setLists(data.taskLists);
      });
    }
  }, [user]);

  //Получение последнего открытого списка или дефолтного(единственного)
  useEffect(() => {
    if (lists?.length == 1) {
      InizializateTasks(lists[0].id).then(data => {
        setTasks(data);
      });
      setList_id(lists[0].id);
      GetTasks(lists[0].id);
    }
  }, [lists]);

  const contextValue = {
    list_id,
    lists,
    tasks,
    currentTaskInfo,
    setCurrentTask,
    changeCurrentTask,
    updateList,
    GetTasks,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<SingInForm setUser={setUser} />} />
        <Route path="sing-up" element={<SingUpForm />} />
        <Route
          path="profile"
          element={
            <>
              <Header active="profile" username={user?.username} />
              <ProfilePage />
            </>
          }
        />
        <Route
          path="task-lists"
          element={
            <>
              <Header active="task-lists" username={user?.username} />
              <TaskInfoContext.Provider value={contextValue}>
                <TaskPage />
              </TaskInfoContext.Provider>
            </>
          }
        />
        <Route
          path="task-board"
          element={
            <>
              <Header active="task-board" username={user?.username} />
              <div>IN DEVELOPMENT...</div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
