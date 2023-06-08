import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoTasks from '../modules/toDoTasks.js';

const taskList = JSON.parse(localStorage.getItem('tasksList')) || [];
const toDoTasks = new ToDoTasks(taskList);
toDoTasks.displayLists(taskList);


const addListField = document.getElementById('addList');
const addListBtn = document.getElementById('addListBtn');
const toDoListsDiv = document.getElementById('to-do-lists');
const clearlist = document.getElementById('clear-list');
const recycle = document.getElementById('recycle');
addListBtn.addEventListener('click', () => {
  let childCount = toDoListsDiv.childElementCount;
  const { value } = addListField;
  childCount += 1;
  toDoTasks.addToList(value, false, childCount);
});
addListField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let childCount = toDoListsDiv.childElementCount;
    const { value } = addListField;
    childCount += 1;
    toDoTasks.addToList(value, false, childCount);
  }
});
clearlist.addEventListener('click', () => {
  toDoTasks.clearList();
});
recycle.addEventListener('click', () => {
  toDoTasks.refreshList();
})