import displayLists from './displayLists.js';

export default function refreshList(toDoList) {
  localStorage.removeItem('tasksList');
  toDoList.length = 0;
  displayLists(toDoList);
}
