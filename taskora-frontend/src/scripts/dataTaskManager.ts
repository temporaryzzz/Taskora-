export const SERVER_ADDRES = 'http://localhost:8080/api';
const SERVER_ADDRES__TASKS = 'http://localhost:8080/api/tasks/';
const SERVER_ADDRES__TASKS_NO_SLASH = 'http://localhost:8080/api/tasks';
const SERVER_ADDRES__LISTS = 'http://localhost:8080/api/tasklists/';
const SERVER_ADDRES__LISTS_NO_SLASH = 'http://localhost:8080/api/tasklists';
const FRONTEND_ADDRES = 'http://localhost:3000';

//Инициализация тасков для рендера
const InizializateTasks = async (list_id: number) => {
	try {
		const response = await fetch(`${SERVER_ADDRES__TASKS}${list_id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			throw new Error(`error! status: ${response.status}`);
		}

		const tasks = await response.json();
		return tasks;
	} catch (error) {
		console.error('Ошибка при получении тасков:', error);
	}
};

const InizializateLists = async (user_id: number) => {
	try {
		const response = await fetch(`${SERVER_ADDRES__LISTS}${user_id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			throw new Error(`error! status: ${response.status}`);
		}

		const lists = await response.json();
		return lists;
	} catch (error) {
		console.error('Ошибка при получении списков:', error);
	}
};

const ChangeTask = (
	task_id: number,
	list_id: number,
	title: string,
	description: string,
	date: string,
	priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT',
	completed: boolean
) => {
	try {
		fetch(`${SERVER_ADDRES__TASKS}${task_id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: task_id,
				taskList_id: list_id,
				title: title,
				description: description,
				due_date: date,
				priority: priority,
				completed: completed,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`error! status: ${response.status}`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.error('Ошибка при изменении таска:', error);
	}
};

const AddTask = async (list_id: number, title: string) => {
	try {
		const response = await fetch(`${SERVER_ADDRES__TASKS_NO_SLASH}`, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ taskList_id: list_id, title: title }),
		});

		if (!response.ok) {
			throw new Error(`error! status: ${response.status}`);
		}

		const taskData = await response.json();
		return taskData;
	} catch (error) {
		console.log('Ошибка при создании таска:', error);
	}
};

//⁡⁣⁣⁢В ответе ожидиается list_id⁡
const AddList = async (user_id: number, title: string) => {
	try {
		const response = await fetch(`${SERVER_ADDRES__LISTS_NO_SLASH}`, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user_id: user_id, title: title }),
		});

		if (!response.ok) {
			throw new Error(`error! status: ${response.status}`);
		}

		const listData = await response.json();
		console.log(listData);

		return listData;
	} catch (error) {
		console.log('Ошибка при создании списка:', error);
	}
};

const DeleteTask = (task_id: number) => {
	try {
		fetch(`${SERVER_ADDRES__TASKS}${task_id}`, { method: 'DELETE' })
			.then((response) => {
				if (!response.ok) {
					throw new Error(`error! status: ${response.status}`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log('Ошибка при удалении таска:', error);
	}
};

export default InizializateTasks;
export { InizializateLists, ChangeTask, AddTask, AddList, DeleteTask };
