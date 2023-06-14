export default function updateBookData(collectionData) {
  localStorage.setItem('tasksList', JSON.stringify(collectionData));
  const tasksList = JSON.parse(localStorage.getItem('tasksList'));

  const addListField = document.getElementById('addList');
  if (addListField) {
    addListField.value = '';
  }

  return tasksList;
}
