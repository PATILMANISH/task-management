import React from 'react';

interface TaskProps {
	task: {
		id: number;
		title: string;
	};
}

const Task: React.FC<TaskProps> = ({ task }) => {
	return (
		<div>
			<h3>{task.title}</h3>
		</div>
	);
};

export default Task;
