import removeListitem from './removeListitem.js';
import displayLists from './displayLists.js';

export default function updateLists(toDoList) {
  displayLists(toDoList);

  const removeTaskIcons = document.querySelectorAll('.list-icon');
  function handleRemoveTaskClick(event) {
    const listItem = event.target.closest('li');
    const index = listItem.getAttribute('data-index');
    removeListitem(index, toDoList);
  }

  removeTaskIcons.forEach((removeTaskIcon) => {
    removeTaskIcon.removeEventListener('click', handleRemoveTaskClick);
    removeTaskIcon.addEventListener('click', handleRemoveTaskClick);
  });
}
