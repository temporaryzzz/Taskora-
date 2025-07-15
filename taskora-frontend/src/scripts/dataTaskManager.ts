//Инициализация тасков для рендера
const InizializateTasks = async () => {

    const response = await fetch('http://localhost:3002/tasks');
    const dataValues = await response.json();

    return dataValues
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

//Найти таск по id
const FindTask = async (id: number) => {
    const response = await fetch(`http://localhost:3002/tasks/${id}`);
    const dataValues = await response.json();

    return dataValues
}

export default InizializateTasks
export {ChangeStateTask, FindTask}