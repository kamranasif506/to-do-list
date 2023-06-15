import editList from '../modules/editList.js';
import updateBookData from '../modules/updateBookData.js';

jest.mock('../modules/updateBookData', () => jest.fn());

describe('editList', () => {
  let toDoList;

  beforeEach(() => {
    toDoList = [
      { index: 1, value: 'Task 1' },
      { index: 2, value: 'Task 2' },
      { index: 3, value: 'Task 3' },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the task value at the specified index and return the updated list', () => {
    const index = 2;
    const value = 'Updated Task';
    const expectedList = [
      { index: 1, value: 'Task 1' },
      { index: 2, value: 'Updated Task' },
      { index: 3, value: 'Task 3' },
    ];

    const result = editList(index, value, toDoList);

    expect(result).toEqual(expectedList);
  });

  it('should call updateBookData with the updated toDoList', () => {
    const index = 1;
    const value = 'Updated Task';

    editList(index, value, toDoList);

    expect(updateBookData).toHaveBeenCalledTimes(1);
    expect(updateBookData).toHaveBeenCalledWith(toDoList);
  });
});
