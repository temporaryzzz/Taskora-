import '../../styles.scss';

type TaskInfo = {
    id: number;
    title: string;
    description: string;
    time: string;
    completed: string;
}

function Task(task: TaskInfo) {


    return (
        <div className='task-list__task'> 
            <input type='checkbox' id='completed'></input>
            <h4>{task.title}</h4> 
            <p>{task.description}</p>
        </div>    
    )
}

export default Task;