import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from '../../App';
import { AddList } from '../../scripts/dataTaskManager';

function CreateListForm() {
	const taskManagerContext = useContext(TaskInfoContext);
	const inputTitleListRef = useRef<HTMLInputElement>(null);
	const [listTitle, setListTitle] = useState<string>('');

	const createList = (event: FormEvent) => {
		event.preventDefault();

		// /\S/ - любой символ кроме пробела
		if (/\S/.test(listTitle ?? '')) {
			if (
				taskManagerContext &&
				taskManagerContext.user &&
				taskManagerContext.lists != undefined
			) {
				let id;

				AddList(taskManagerContext.user?.user_id, listTitle ?? '').then((listData) => {
					id = Number(listData.id);
					if (!taskManagerContext.lists) {
						return;
					}
					const updatedLists = taskManagerContext.lists;

					if (taskManagerContext.user?.user_id) {
						taskManagerContext.lists?.push({
							id: id,
							owner_id: taskManagerContext.user?.user_id,
							title: listTitle,
						});
						taskManagerContext.updateLists(updatedLists);
						taskManagerContext.LoadTasks(id);
					}
				});

				if (inputTitleListRef.current) inputTitleListRef.current.value = '';
			}
		}
	};

	return (
		<form className="create-task-form" onSubmit={(event) => createList(event)}>
			<input
				className="create-task-form__title-input"
				placeholder="Добавить список..."
				ref={inputTitleListRef}
				onChange={(e) => {
					setListTitle(e.target.value);
				}}></input>
		</form>
	);
}

export default CreateListForm;
