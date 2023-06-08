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
                                    <i class="fas fa-trash list-icon fa-ellipsis-vertical"></i>
                                </div>
                            </li>`;
      } else {
        this.list += ` <li data-index="${task.index}">
                                <div class="list-item">
                                    <input type="checkbox" id="checkbox${task.index}" class="checkbox"> 
                                    <label for="checkbox${task.index}"></label>
                                    <input  value="${task.value}" class="list-text">
                                    <i class="fas fa-sharp list-icon fa-ellipsis-vertical"></i>
                                </div>
                            </li>`;
      }
    });
    this.toDoListsDiv.innerHTML = '';
    this.toDoListsDiv.innerHTML = this.list;
        
    

  }
  updateBookData(collectionData) {
    localStorage.setItem('tasksList', JSON.stringify(collectionData));
    this.addListField.value = '';
    
  }
  addToList(value,completed,index) {
    this.toDoList.push({value,completed,index});
    this.updateBookData(this.toDoList); 
    this.displayLists(this.toDoList);               
  }
  checkBoxClick(event) {
    this.checkbox = event.target;
    this.checkboxId = this.checkbox.getAttribute('id');
    this.checkboxIcon = `<i class="fas fa-check checked" data-cbecked="true" id="${this.checkboxId}"></i>`;
    this.checkbox.style.display = 'none';
    this.checkbox.nextElementSibling.outerHTML = this.checkboxIcon;
    this.parent = this.checkbox.parentElement;
    this.parent.querySelector('.list-text').classList.add('underline');
    const index  = this.parent.parentElement.getAttribute('data-index');

    const checkedIcon = this.parent.querySelector('.checked');
    checkedIcon.addEventListener('click', (event) => this.checkedIconClick(event));
  
  }
  checkedIconClick(event) {
    const checkedIcon = event.target;
    const checkboxId = checkedIcon.getAttribute('id');
    const checkbox = document.getElementById(checkboxId);
    checkbox.style.display = 'block';
    checkedIcon.remove();
  }
  editList(index,value){
    const updatedTasks = this.toDoList.filter(tasks => {
        if (tasks.index === parseInt(index)) {
          tasks.value = value;
          return true;
        }
        return true;
      });
    this.toDoList = updatedTasks;  
    this.updateBookData(this.toDoList);
  }
  removeListitem(index){
        
    this.toDoList = this.toDoList.filter(task => {
      return task.index !== parseInt(index);
    });

    this.toDoList = this.toDoList.map((task, index) => {
      task.index = index + 1;
      return task;
    });
    this.updateBookData(this.toDoList);
  }
  updateLists() {
    
    this.displayLists(this.toDoList);
  }
  clearList(){
    localStorage.removeItem('tasksList');
    this.toDoList = [];
    this.displayLists(this.toDoList);
  }
}

export default ToDoTasks;