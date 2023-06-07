import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import ToDoTasks from '../modules/toDoTasks.js';

const listOftasks = [
  {
    description: 'Double-Tap to edit.',
    completed: false,
    index: 1,
  },
  {
    description: 'Drag in drop to reorder your list.',
    completed: false,
    index: 2,
  },
  {
    description: 'Resync to clear out the old.',
    completed: false,
    index: 4,
  },
  {
    description: 'Manage All your list in one place.',
    completed: false,
    index: 3,
  },
];
listOftasks.sort((task1, task2) => task1.index - task2.index);
const toDoTasks = new ToDoTasks(listOftasks);
toDoTasks.displayLists();
const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', (event) => toDoTasks.checkBoxClick(event));
});