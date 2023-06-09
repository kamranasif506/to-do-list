import removeListitem from './removeListitem.js';
import updateLists from './updateLists.js';

export default function handleRemoveTaskClick(event, toDoList) {
  const listItem = event.target.closest('li');
  const index = listItem.getAttribute('data-index');
  removeListitem(index, toDoList);
  updateLists(toDoList);
}
