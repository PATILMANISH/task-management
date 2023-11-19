import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task { id: number; title: string; completed: boolean; addedBy: string; }

export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = () => {
  const tasksString = localStorage.getItem('tasks');
  return tasksString ? JSON.parse(tasksString) : [];
};

export const isOnline = () => {
  return navigator.onLine;
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      saveTasksToLocalStorage(action.payload);
      return action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const updatedTasks = [...state, action.payload];
			// console.log(updatedTasks)
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    },
  },
});

export const { setTasks, addTask } = taskSlice.actions;
export default taskSlice.reducer;
