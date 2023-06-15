import 'jest-localstorage-mock';
import addToList from '../modules/addToList.js';
import displayLists from '../modules/displayLists.js';
import updateBookData from '../modules/updateBookData.js';
import removeListitem from '../modules/removeListitem.js';

jest.mock('../modules/updateBookData.js');
jest.mock('../modules/displayLists.js');

describe('addToList', () => {
  let toDoList;

  beforeEach(() => {
    toDoList = [
      { value: 'Task 1', completed: false, index: 1 },
      { value: 'Task 2', completed: false, index: 2 },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adds a new item to the to-do list', () => {
    const newItem = { value: 'Task 3', completed: false, index: 3 };

    const updatedList = addToList(newItem.value, newItem.completed, newItem.index, toDoList);

    expect(updatedList).toEqual([
      { value: 'Task 1', completed: false, index: 1 },
      { value: 'Task 2', completed: false, index: 2 },
      { value: 'Task 3', completed: false, index: 3 },
    ]);

    expect(updateBookData).toHaveBeenCalledWith(updatedList);

    expect(displayLists).toHaveBeenCalledWith(updatedList);
  });
});

describe('removeListitem', () => {
  let toDoList;

  beforeEach(() => {
    toDoList = [
      { index: 1, task: 'Task 1' },
      { index: 2, task: 'Task 2' },
      { index: 3, task: 'Task 3' },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes the specified item from the to-do list', () => {
    const indexToRemove = 2;

    const updatedList = removeListitem(indexToRemove, toDoList);

    expect(updatedList).toEqual([
      { index: 1, task: 'Task 1' },
      { index: 2, task: 'Task 3' },
    ]);

    expect(updateBookData).toHaveBeenCalledWith(updatedList);
  });

  it('reindexes the tasks after removing an item', () => {
    const indexToRemove = 1;

    const updatedList = removeListitem(indexToRemove, toDoList);

    expect(updatedList).toEqual([
      { index: 1, task: 'Task 2' },
      { index: 2, task: 'Task 3' },
    ]);

    expect(updateBookData).toHaveBeenCalledWith(updatedList);
  });
});
