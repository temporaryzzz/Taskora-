//Инициализация тасков для рендера
const InizializateTasks = async (list_id: number) => {
    
    try {
        const response = await fetch(`http://localhost:8080/api/task/tasks/${list_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
        }

        const tasks = await response.json();
        console.log(tasks);
        return tasks

    } 
    catch (error) {
        console.error('Ошибка при получении тасков:', error);
    }
}

const InizializateLists = async (user_id: number) => {

    try {
        const response = await fetch(`http://localhost:8080/api/task/lists/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
        }

        const lists = await response.json();
        console.log(lists);
        return lists

    } 
    catch (error) {
        console.error('Ошибка при получении списков:', error);
    }


}

const ChangeTask = (task_id: number, title : string, description : string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => {
    try {
        fetch(`http://localhost:8080/api/task/update/${task_id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description, date: date,  priority: priority}),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`error! status: ${response.status}`)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    catch (error) {
        console.error('Ошибка при изменении таска:', error);
    }
}

//Смена состояний таска(активен/выполнен)
const ChangeStateTask = (state: boolean, task_id: number) => {

    if(state === true) {
        try {
            fetch(`http://localhost:8080/api/task/update/${task_id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({completed: false}),
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`error! status: ${response.status}`)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        catch (error) {
            console.error('Ошибка при изменении таска:', error);
        }
    }

    else {
        try {
            fetch(`http://localhost:8080/api/task/update/${task_id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({completed: true}),
            })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`error! status: ${response.status}`)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        catch (error) {
            console.error('Ошибка при изменении таска:', error);
        }
    }
}

const AddTask = (list_id: number, title : string) => {
    try {
        fetch(`http://localhost:8080/api/task/create`, { 
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({list_id: list_id, title: title}) 
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`error! status: ${response.status}`)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    catch (error) {
        console.log('Ошибка при создании таска:', error)
    }
}

const DeleteTask = (task_id: number) => {
    try {
        fetch(`http://localhost:8080/api/task/delete/${task_id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`error! status: ${response.status}`)
            }
        })
        .catch((error) => {
            console.log(error)
        })

    }
    catch (error) {
        console.log('Ошибка при удалении таска:', error)
    }
}

export default InizializateTasks
export {InizializateLists, ChangeStateTask, ChangeTask, AddTask, DeleteTask}