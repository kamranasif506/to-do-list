import removeListitem from './removeListitem.js';
import editList from './editList.js';
import markComplete from './markComplete.js';
import markUnComplete from './markUnComplete.js';

export default function displayLists(taskList) {
  let list = '';
  const toDoListsDiv = document.getElementById('to-do-lists');
  Object.values(taskList).forEach((task) => {
    if (task.completed) {
      list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox" checked="checked"> 
                                    <label for="checkbox${task.index}"></label>
                                    <input  value="${task.value}" class="list-text underline">
                                    <i class="fas fa-sharp list-icon fa-trash removeTask display"></i>
                                </div>
                            </li>`;
    } else {
      list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox"> 
                                    <label for="checkbox${task.index}"></label>
                                    <input  value="${task.value}" class="list-text">
                                    <i class="fas fa-sharp list-icon fa-trash removeTask display"></i>
                                </div>
                            </li>`;
    }
  });
  toDoListsDiv.innerHTML = '';
  toDoListsDiv.innerHTML = list;

  const listTextInputs = document.querySelectorAll('.list-text');
  listTextInputs.forEach((input) => {
    input.addEventListener('focus', (event) => {
      const parent = event.target.parentNode;
      parent.parentNode.classList.add('editing');
      event.target.classList.add('editing');
    });
    input.addEventListener('blur', (event) => {
      const parent = event.target.parentNode;
      parent.parentNode.classList.remove('editing');
      event.target.classList.remove('editing');
      const toDoList = JSON.parse(localStorage.getItem('tasksList')) || [];
      displayLists(toDoList);
    });
    input.addEventListener('input', (event) => {
      const index = event.target.parentNode.parentNode.getAttribute('data-index');
      const { value } = event.target;

      if (value === '') {
        removeListitem(index, taskList);
      } else {
        editList(index, value, taskList);
      }
    });
  });

  const removeTaskIcons = document.querySelectorAll('.list-icon');
  removeTaskIcons.forEach((removeTaskIcon) => {
    removeTaskIcon.addEventListener('click', (event) => {
      const listItem = event.target.closest('li');
      const index = listItem.getAttribute('data-index');
      removeListitem(index, taskList);
      const toDoList = JSON.parse(localStorage.getItem('tasksList')) || [];
      displayLists(toDoList);
    });
  });

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
        markComplete(event, taskList);
      } else {
        markUnComplete(event, taskList);
      }
    });
  });
}
