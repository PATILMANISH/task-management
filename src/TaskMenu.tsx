import React from 'react';

interface TaskMenuProps {
	onMarkAsComplete: () => void;
	onDelete: () => void;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ onMarkAsComplete, onDelete }) => (
	<div className="task-menu ml-auto space-x-2">
		<button onClick={onMarkAsComplete} className="bg-green-500 text-white font-medium px-3 py-1 rounded focus:outline-none hover:bg-green-600" >
			<i data-feather="circle"></i>Mark as Complete </button>
		<button onClick={onDelete} className="bg-red-500 text-white font-medium px-3 py-1 rounded focus:outline-none hover:bg-red-600" > Delete </button>
	</div>
);

export default TaskMenu;
