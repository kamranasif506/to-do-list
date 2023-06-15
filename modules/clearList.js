import updateBookData from './updateBookData.js';
import displayLists from './displayLists.js';

export default function clearList(taskList) {
  const completedTasks = taskList.filter((task) => task.completed === true);

  if (completedTasks.length === 0) {
    taskList.length = 0;
    localStorage.removeItem('tasksList');
  } else {
    const updatedTaskList = taskList.filter((task) => task.completed === false)
      .map((task, index) => ({
        ...task,
        index: index + 1,
      }));

    taskList.length = 0;
    taskList.push(...updatedTaskList);

    updateBookData(taskList);
  }

  displayLists(taskList);
  return taskList;
}
