import updateStatus from './updateStatus.js';

export default function markComplete(event, toDoList) {
  const checkbox = event.target;

  const parent = checkbox.parentElement;
  parent.querySelector('.list-text').classList.add('underline');
  const label = parent.querySelector('label');
  label.classList.toggle('checked');
  const index = parent.parentElement.getAttribute('data-index');
  updateStatus(index, true, toDoList);
}