//Инициализация тасков для рендера
const InizializateTasks = async () => {

    const response = await fetch('http://localhost:3002/tasks');
    const dataValues = await response.json();

    return dataValues
}

export default InizializateTasks