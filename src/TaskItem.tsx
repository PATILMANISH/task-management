import React, { useState } from 'react';
import TaskMenu from './TaskMenu';


interface Task { id: number; title: string; completed: boolean; addedBy: string; }

interface TaskItemProps { task: Task; onDelete: () => void; onToggleCompletion: () => void; onEditSave: (taskId: number, newTitle: string) => void; filteredTasks: Task[]; }

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleCompletion, onEditSave, filteredTasks, }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleEditToggle = () => setIsEditing(!isEditing);
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEditedTitle(e.target.value);

	const handleSave = () => {
		onEditSave(task.id, editedTitle);
		setIsEditing(false);
	};

	return (
		<div className={`task-item ${task.completed ? 'completed' : ''} mb-4`}>
			<input type="checkbox" checked={task.completed} onChange={onToggleCompletion} className="mr-2" />
			<div className={`task-content ${isEditing ? 'editing' : ''}`} onClick={handleEditToggle} >
				{isEditing
					? <input type="text" value={editedTitle} onChange={handleTitleChange} onBlur={handleSave} autoFocus className="border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />
					:
					<p className='text-l font-semibold'>{task.title}</p>
				}
			</div>
			<TaskMenu onMarkAsComplete={onToggleCompletion} onDelete={onDelete} />
		</div>
	);
};

export default TaskItem;
