export default function updateBookData(collectionData) {
  const addListField = document.getElementById('addList');
  localStorage.setItem('tasksList', JSON.stringify(collectionData));
  addListField.value = '';
}
