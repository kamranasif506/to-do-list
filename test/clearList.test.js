import clearList from '../modules/clearList';
import updateBookData from '../modules/updateBookData';
import displayLists from '../modules/displayLists';

jest.mock('../modules/updateBookData');
jest.mock('../modules/displayLists');

describe('clearList', () => {
  let taskList;

  beforeEach(() => {
    taskList = [
      { index: 1, value: 'Task 1', completed: true },
      { index: 2, value: 'Task 2', completed: false },
      { index: 3, value: 'Task 3', completed: true },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear the task list and localStorage when there are no completed tasks', () => {
    const emptyTaskList = [];

    clearList(emptyTaskList);

    expect(emptyTaskList.length).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith('tasksList');
    expect(updateBookData).not.toHaveBeenCalled();
    expect(displayLists).toHaveBeenCalledWith(emptyTaskList);
  });

  it('should remove completed tasks, update indexes, update task list, and call updateBookData when there are completed tasks', () => {
    const updatedTaskList = [
      { index: 1, value: 'Task 2', completed: false },
      { index: 2, value: 'Task 4', completed: false },
    ];

    clearList(taskList);

    expect(taskList).toEqual(updatedTaskList);
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(updateBookData).toHaveBeenCalledWith(taskList);
    expect(displayLists).toHaveBeenCalledWith(taskList);
  });
});
