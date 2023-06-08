import updateBookData from './updateBookData.js';

export default function updateStatus(index, status, toDoList) {
  const updatedTasks = toDoList.filter((tasks) => {
    if (tasks.index === parseInt(index, 10)) {
      tasks.completed = status;
      return true;
    }
    return true;
  });
  toDoList = updatedTasks;
  updateBookData(toDoList);
}
