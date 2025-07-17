//Инициализация тасков для рендера
const InizializateTasks = async () => {
    
    const response = await fetch('http://localhost:3002/tasks');
    const dataValues = await response.json();

    return dataValues
}

const ChangeTask = (id: number, title : string, description : string, time : string) => {
    fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({title: title, description: description, time: time}),
    })

}

//Смена состояний таска(активен/выполнен)
const ChangeStateTask = (state: boolean, id: number) => {

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

const AddTask = (id: number, title : string, description : string, time : string) => {
    fetch(`http://localhost:3002/tasks`,
    { method: 'POST', body: JSON.stringify({id: String(id), 
                                            title: title, 
                                            description: description, 
                                            time: time,
                                            completed: false }) })
}

//Найти таск по id
const FindTask = async (id: number) => {
    const response = await fetch(`http://localhost:3002/tasks/${id}`);
    const dataValues = await response.json();

    return dataValues
}

export default InizializateTasks
export {ChangeStateTask, ChangeTask, FindTask, AddTask}