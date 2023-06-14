export default function updateBookData(collectionData) {
  const addListField = document.getElementById('addList');
  localStorage.setItem('tasksList', JSON.stringify(collectionData));
  const tasksList = JSON.parse(localStorage.getItem('tasksList'));
  return tasksList;
  addListField.value = '';
}
