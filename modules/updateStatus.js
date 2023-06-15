import updateBookData from './updateBookData.js';

export default function updateStatus(index, status, toDoList) {
  const taskIndex = toDoList.findIndex((task) => task.index === parseInt(index, 10));

  if (taskIndex === -1) {
    return toDoList;
  }

  toDoList[taskIndex].completed = status;
  updateBookData(toDoList);
  return toDoList;
}
