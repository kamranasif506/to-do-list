import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoTasks from '../modules/toDoTasks.js';

const taskList = JSON.parse(localStorage.getItem('tasksList')) || [];
const toDoTasks = new ToDoTasks(taskList);
toDoTasks.displayLists(taskList);
const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((checkbox) => {
  // checkbox.addEventListener('click', (event) => toDoTasks.checkBoxClick(event));
});


const addListField = document.getElementById('addList');
const addListBtn = document.getElementById('addListBtn');
const toDoListsDiv = document.getElementById('to-do-lists');
const clearlist = document.getElementById('clear-list');
addListBtn.addEventListener('click', () => {
  let childCount = toDoListsDiv.childElementCount; 
  const value = addListField.value;
  childCount = childCount + 1;
  toDoTasks.addToList(value,false,childCount);
})
addListField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let childCount = toDoListsDiv.childElementCount; 
    const value = addListField.value;
    childCount = childCount + 1;
    console.log(childCount);
    toDoTasks.addToList(value,false,childCount);
  }
});
clearlist.addEventListener('click', () => {
  toDoTasks.clearList();
})