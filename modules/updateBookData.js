export default function updateBookData(collectionData) {
  localStorage.setItem('tasksList', JSON.stringify(collectionData));
  const tasksList = JSON.parse(localStorage.getItem('tasksList'));

  // Clear the value of the input field with id 'addList'
  const addListField = document.getElementById('addList');
  if (addListField) {
    addListField.value = '';
  }

  return tasksList;
}
