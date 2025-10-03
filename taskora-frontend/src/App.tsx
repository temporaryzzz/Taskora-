//⁡⁢⁣⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { BrowserRouter, Route, Routes } from 'react-router';
import SingInForm from './components/singIn';
import SingUpForm from './components/singup';
import Header from './components/header';
import TaskPage from './components/task-manager/task-page';
import { useEffect, useState, createContext, useMemo } from 'react';
import ProfilePage from './components/profile/profile-page';
import InitializeTasks, { InitializeLists, ChangeTask } from './scripts/dataTaskManager';

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
	user: User | undefined;
	currentList_id: number | undefined;
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
	updateTasks: (tasks: Array<TaskInfo>) => void;
	updateLists: (lists: Array<List>) => void;
	switchList: (list_id: number) => void;
	LoadTasks: (list_id: number) => void;
}

export const TaskInfoContext = createContext<TaskManager | undefined>(undefined);

function App() {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [lists, setLists] = useState<Array<List> | undefined>([]);
	const [currentList_id, setCurrentList_id] = useState<number | undefined>();
	const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>([]);
	const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfo | undefined>();

	const LoadTasks = (list_id: number) => {
		//taskDTOs - это хуйня с бэка
		InitializeTasks(list_id).then((data) => {
			setTasks(data.taskDTOs);
			console.log('taskDTOs:', typeof data.taskDTO, data.taskDTOs);
		});
		setCurrentList_id(list_id);
	};

	//Передаем данные о задаче в фокусе
	const setCurrentTask = (id: number) => {
		if (tasks) {
			const currentTaskIndex = tasks.findIndex((task) => task.id === id);
			setCurrentTaskInfo(tasks[currentTaskIndex]);
		}
	};

	const updateTasks = (tasks: Array<TaskInfo>) => {
		setTasks([...tasks]);
	};

	const updateLists = (lists: Array<List>) => {
		setLists([...lists]);
	};

	const switchList = (list_id: number) => {
		LoadTasks(list_id);
	};

	const changeCurrentTask = (
		title: string,
		description: string,
		due_date: string,
		priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT',
		completed: boolean
	) => {
		if (!tasks || !currentTaskInfo) {
			return;
		}

		const updatedTasks = tasks.map((task) =>
			task.id === currentTaskInfo.id
				? { ...task, title, description, due_date, priority, completed }
				: task
		);

		setTasks(updatedTasks);
		const updatedCurrentTask = updatedTasks.find(
			(task) => task.id === currentTaskInfo.id
		);

		if (updatedCurrentTask) {
			setCurrentTaskInfo(updatedCurrentTask);
		}
		ChangeTask(
			currentTaskInfo.id,
			Number(currentList_id),
			title,
			description,
			due_date,
			priority,
			completed
		);
	};

	//Запрос на получение списков задач и последнего открытого списка
	useEffect(() => {
		if (user?.user_id) {
			InitializeLists(user.user_id).then((data) => {
				setLists(data.taskLists);
				//Получение последнего открытого списка или дефолтного(единственного)
				//⁡⁣⁣⁢Пока что получаем только дефолтный список⁡
				//⁡⁣⁣⁢Позже добавить else где будет открываться списаок сохраненный в cookies⁡
				if (data.taskLists) {
					LoadTasks(data.taskLists[0].id);
				}
			});
		}
	}, [user]);

	const contextValue = useMemo(
		() => ({
			user,
			currentList_id,
			lists,
			tasks,
			currentTaskInfo,
			setCurrentTask,
			changeCurrentTask,
			updateTasks,
			updateLists,
			switchList,
			LoadTasks,
		}),
		[user, currentList_id, lists, tasks, currentTaskInfo]
	);

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
