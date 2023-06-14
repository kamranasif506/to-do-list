import 'jest-localstorage-mock';
import addToList from './modules/addToList.js';
import displayLists from './modules/displayLists.js';
import updateBookData from './modules/updateBookData.js';

jest.mock('./modules/updateBookData.js');
jest.mock('./modules/displayLists.js');

describe('addToList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new item to the to-do list and call updateBookData and displayLists', () => {
    const value = 'New task';
    const completed = false;
    const index = 0;
    const toDoList = [];

    const updatedToDoList = addToList(value, completed, index, toDoList);

    expect(updatedToDoList).toEqual([{ value, completed, index }]);
    expect(updateBookData).toHaveBeenCalledWith(updatedToDoList);
    expect(displayLists).toHaveBeenCalledWith(updatedToDoList);
  });
});
