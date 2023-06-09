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
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox" checked="checked"> 
                                    <label for="checkbox${task.index}"></label>
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

    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
          this.markComplete(event);
        } else {
          this.markUnComplete(event);
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

  markComplete(event) {
    this.checkbox = event.target;

    this.parent = this.checkbox.parentElement;
    this.parent.querySelector('.list-text').classList.add('underline');
    this.label = this.parent.querySelector('label');
    this.label.classList.toggle('checked');
    this.index = this.parent.parentElement.getAttribute('data-index');
    this.updateStatus(this.index, true);
  }

  markUnComplete(event) {
    this.checkbox = event.target;
    this.parent = this.checkbox.parentElement;
    this.parent.querySelector('.list-text').classList.remove('underline');
    this.label = this.parent.querySelector('label');
    this.label.classList.toggle('checked');
    this.index = this.parent.parentElement.getAttribute('data-index');
    this.updateStatus(this.index, false);
  }

  updateStatus(index, status) {
    const updatedTasks = this.toDoList.filter((tasks) => {
      if (tasks.index === parseInt(index, 10)) {
        tasks.completed = status;
        return true;
      }
      return true;
    });
    this.toDoList = updatedTasks;
    this.updateBookData(this.toDoList);
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
    const filteredArray = this.toDoList.filter((obj) => obj.completed !== false);

    if (filteredArray.length === 0) {
      localStorage.removeItem('tasksList');
      this.toDoList = [];
    } else {
      this.toDoList = this.toDoList.filter((task) => task.completed !== true);

      this.toDoList = this.toDoList.map((task, index) => {
        task.index = index + 1;
        return task;
      });
      this.updateBookData(this.toDoList);
    }
    this.displayLists(this.toDoList);
  }

  refreshList() {
    localStorage.removeItem('tasksList');
    this.toDoList = [];
    this.displayLists(this.toDoList);
  }
}

export default ToDoTasks;