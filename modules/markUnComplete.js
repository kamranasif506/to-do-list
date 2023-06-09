import updateStatus from './updateStatus.js';

export default function markUnComplete(event, toDoList) {
  const checkbox = event.target;
  const parent = checkbox.parentElement;
  parent.querySelector('.list-text').classList.remove('underline');
  const label = parent.querySelector('label');
  label.classList.toggle('checked');
  const index = parent.parentElement.getAttribute('data-index');
  updateStatus(index, false, toDoList);
}