//Инициализация тасков для рендера
const InizializateTasks = async () => {
    
    const response = await fetch('http://localhost:3002/tasks');
    const dataValues = await response.json();

    return dataValues
}

const ChangeTask = (id: string, title : string, description : string, time : string, priority: 'red' | 'blue' | 'green' | 'default') => {
    fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({title: title, description: description, time: time, priority: priority}),
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

const AddTask = (id: string, title : string, description : string, time : string, priority: 'red' | 'blue' | 'green' | 'default') => {
    fetch(`http://localhost:3002/tasks`,
    { method: 'POST', body: JSON.stringify({id: id, 
                                            title: title, 
                                            description: description, 
                                            time: time,
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
export {ChangeStateTask, ChangeTask, FindTask, AddTask, DeleteTask}