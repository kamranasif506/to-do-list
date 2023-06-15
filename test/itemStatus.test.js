import updateStatus from '../modules/updateStatus';
import updateBookData from '../modules/updateBookData';

jest.mock('../modules/updateBookData');

describe('updateStatus', () => {
  let toDoList;
  let index;
  let status;

  beforeEach(() => {
    toDoList = [
      { index: 1, value: 'Task 1', completed: false },
      { index: 2, value: 'Task 2', completed: false },
      { index: 3, value: 'Task 3', completed: false },
    ];

    index = '2';
    status = true;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the status of a task in the toDoList and call updateBookData', () => {
    const expectedUpdatedTasks = [
      { index: 1, value: 'Task 1', completed: false },
      { index: 2, value: 'Task 2', completed: true },
      { index: 3, value: 'Task 3', completed: false },
    ];

    const result = updateStatus(index, status, toDoList);

    expect(result).toEqual(expectedUpdatedTasks);
    expect(updateBookData).toHaveBeenCalledTimes(1);
    expect(updateBookData).toHaveBeenCalledWith(expectedUpdatedTasks);
  });

  it('should return the original toDoList if the index is not found', () => {
    const invalidIndex = '4';
  
    const result = updateStatus(invalidIndex, status, toDoList);
  
    expect(result).toEqual(toDoList);
    expect(updateBookData).not.toHaveBeenCalled();
  });
});
