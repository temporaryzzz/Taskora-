//Инициализация тасков для рендера
const InizializateTasks = async () => {
    
    const response = await fetch('http://localhost:3002/tasks');
    const dataValues = await response.json();

    return dataValues
}

const InizializateLists = async (user_id: number) => {

    try {
        const response = await fetch(`http://localhost:8080/task/tasks/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const lists = await response.json();
        console.log(lists);
        return lists

    } 
    catch (error) {
        console.error('Ошибка при получении пользователя:', error);
    }


}

const ChangeTask = (id: string, title : string, description : string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => {

    fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({title: title, description: description, date: date,  priority: priority}),
    })
}

//Смена состояний таска(активен/выполнен)
const ChangeStateTask = (state: boolean, id: string) => {

    if(state === true) {
        fetch(`http://localhost:3002/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: false}),
        })
    }

    else {
        fetch(`http://localhost:3002/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: true}),
        })
    }
}

const AddTask = (id: string, title : string, description : string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => {
    fetch(`http://localhost:3002/tasks`,
    { method: 'POST', body: JSON.stringify({id: id, 
                                            title: title, 
                                            description: description, 
                                            date: date,
                                            completed: false,
                                            priority: priority }) })
}

//Найти таск по id
const FindTask = async (id: string) => {
    const response = await fetch(`http://localhost:3002/tasks/${id}`);
    const dataValues = await response.json();

    return dataValues
}

const DeleteTask = (id: string) => {
    fetch(`http://localhost:3002/tasks/${id}`, {method: 'DELETE'})
}

export default InizializateTasks
export {InizializateLists, ChangeStateTask, ChangeTask, FindTask, AddTask, DeleteTask}