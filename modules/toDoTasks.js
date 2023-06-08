class ToDoTasks {
  constructor(taskList) {
    this.toDoListsDiv = document.getElementById('to-do-lists');
    this.toDoList = taskList;
    this.addListField = document.getElementById('addList');
    this.inputListitem = document.getElementById('addList');
  }

  displayLists(taskList) {
    this.list = '';
    Object.values(taskList).forEach((task) => {
      if (task.completed) {
        this.list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <i class="fas fa-check checked" id="checkbox${task.index}" ></i> 
                                    <input  value="${task.value}" class="list-text underline">
                                    <i class="fas fa-sharp list-icon fa-trash removeTask display"></i>
                                </div>
                            </li>`;
      } else {
        this.list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox"> 
                                    <label for="checkbox${task.index}"></label>
                                    <input  value="${task.value}" class="list-text">
                                    <i class="fas fa-sharp list-icon fa-trash removeTask display"></i>
                                </div>
                            </li>`;
      }
    });
    this.toDoListsDiv.innerHTML = '';
    this.toDoListsDiv.innerHTML = this.list;

    const listTextInputs = document.querySelectorAll('.list-text');

    listTextInputs.forEach((input) => {
      input.addEventListener('focus', (event) => {
        const parent = event.target.parentNode;
        parent.parentNode.classList.add('editing');
        event.target.classList.add('editing');
        // parent.querySelector('.list-icon').style.cursor = 'pointer';
      });

      input.addEventListener('blur', (event) => {
        const parent = event.target.parentNode;
        parent.parentNode.classList.remove('editing');
        event.target.classList.remove('editing');

        this.updateLists();
      });

      input.addEventListener('input', (event) => {
        const index = event.target.parentNode.parentNode.getAttribute('data-index');
        const { value } = event.target;
        if (value === '') {
          this.removeListitem(index);
        } else {
          this.editList(index, value);
        }
      });
    });

    
  }

  updateBookData(collectionData) {
    localStorage.setItem('tasksList', JSON.stringify(collectionData));
    this.addListField.value = '';
  }

  addToList(value, completed, index) {
    this.toDoList.push({ value, completed, index });
    this.updateBookData(this.toDoList);
    this.displayLists(this.toDoList);
  }

  checkBoxClick(event) {
    this.checkbox = event.target;

    this.parent = this.checkbox.parentElement;
    this.parent.querySelector('.list-text').classList.add('underline');
  }

  editList(index, value) {
    const updatedTasks = this.toDoList.filter((tasks) => {
      if (tasks.index === parseInt(index, 10)) {
        tasks.value = value;
        return true;
      }
      return true;
    });
    this.toDoList = updatedTasks;
    this.updateBookData(this.toDoList);
  }

  removeListitem(index) {
    this.toDoList = this.toDoList.filter((task) => task.index !== parseInt(index, 10));

    this.toDoList = this.toDoList.map((task, index) => {
      task.index = index + 1;
      return task;
    });
    this.updateBookData(this.toDoList);
  }

  updateLists() {
    this.displayLists(this.toDoList);
    const removeTaskIcons = document.querySelectorAll('.list-icon');
    removeTaskIcons.forEach((removeTaskIcon) => {
      removeTaskIcon.addEventListener('click', (event) => {
        const listItem = event.target.closest('li');
        const index = listItem.getAttribute('data-index');
        this.removeListitem(index);
        this.updateLists();
      });
    });
  }

  clearList() {
    localStorage.removeItem('tasksList');
    this.toDoList = [];
    this.displayLists(this.toDoList);
  }
}

export default ToDoTasks;