import updateBookData from './updateBookData.js';
import displayLists from './displayLists.js';

export default function clearList(taskList) {
  const filteredArray = taskList.filter((task) => task.completed !== false);
  const filteredArray2 = taskList.filter((task) => task.completed !== true);

  if (filteredArray.length === 0) {
    taskList.length = 0;
    localStorage.removeItem('tasksList');
  } else {
    taskList.length = 0;
    filteredArray2.forEach((task, index) => {
      task.index = index + 1;
      taskList.push(task);
    });

    updateBookData(taskList);
  }

  displayLists(taskList);
}
