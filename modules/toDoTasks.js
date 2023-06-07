class ToDoTasks {
  constructor(toDoList) {
    this.toDoListsDiv = document.getElementById('to-do-lists');
    this.toDoList = toDoList;
    this.list = '';
  }

  displayLists() {
    this.toDoList.forEach((task) => {
      if (task.completed) {
        this.list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <i class="fas fa-check checked" id="checkbox${task.index}" ></i> 
                                    <input  value="${task.description}" class="list-text underline">
                                    <i class="fas fa-trash list-icon fa-ellipsis-vertical"></i>
                                </div>
                            </li>`;
      } else {
        this.list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox"> 
                                    <label for="checkbox${task.index}"></label>
                                    <input  value="${task.description}" class="list-text">
                                    <i class="fas fa-sharp list-icon fa-ellipsis-vertical"></i>
                                </div>
                            </li>`;
      }
    });
    this.toDoListsDiv.innerHTML = this.list;
  }

  checkBoxClick(event) {
    this.checkbox = event.target;
    this.checkboxId = this.checkbox.getAttribute('id');
    this.checkboxIcon = `<i class="fas fa-check checked" id="${this.checkboxId}"></i>`;

    this.checkbox.style.display = 'none';
    this.checkbox.nextElementSibling.outerHTML = this.checkboxIcon;
  }
}

export default ToDoTasks;