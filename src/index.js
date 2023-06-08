import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import addToList from '../modules/addToList.js';
import clearList from '../modules/clearList.js';
import refreshList from '../modules/refreshList.js';
import displayLists from '../modules/displayLists.js';

const taskList = JSON.parse(localStorage.getItem('tasksList')) || [];
displayLists(taskList);

const addListField = document.getElementById('addList');
const addListBtn = document.getElementById('addListBtn');
const toDoListsDiv = document.getElementById('to-do-lists');
const clearlist = document.getElementById('clear-list');
const recycle = document.getElementById('recycle');
addListBtn.addEventListener('click', () => {
  let childCount = toDoListsDiv.childElementCount;
  const { value } = addListField;
  childCount += 1;
  const refreshTaskList = JSON.parse(localStorage.getItem('tasksList')) || [];
  addToList(value, false, childCount, refreshTaskList);
});
addListField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let childCount = toDoListsDiv.childElementCount;
    const { value } = addListField;
    childCount += 1;
    const refreshTaskList = JSON.parse(localStorage.getItem('tasksList')) || [];
    addToList(value, false, childCount, refreshTaskList);
  }
});
clearlist.addEventListener('click', () => {
  const refreshTaskList = JSON.parse(localStorage.getItem('tasksList')) || [];
  clearList(refreshTaskList);
});
recycle.addEventListener('click', () => {
  const refreshTaskList = JSON.parse(localStorage.getItem('tasksList')) || [];
  refreshList(refreshTaskList);
});