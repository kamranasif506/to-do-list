import addToList from './modules/addToList.js';
import updateBookData from './modules/updateBookData.js';
import displayLists from './modules/displayLists.js';
import 'jest-localstorage-mock';


jest.mock('./modules/updateBookData.js');
jest.mock('./modules/displayLists.js');
 
  
describe('addToList', () => {
  let toDoList;
  
  beforeEach(() => {
    toDoList = [];
    localStorage.clear(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); 
  });

  it('should add a new item to the localStorage array and update the display', () => {
    const value = 'New task';
    const completed = false;
    const index = 0;

    const updatedToDoList = addToList(value, completed, index, toDoList);

    expect(updatedToDoList).toEqual([{ value, completed, index }]);
    expect(updateBookData).toHaveBeenCalledWith(updatedToDoList);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasksList',JSON.stringify(updatedToDoList));
    expect(displayLists).toHaveBeenCalledWith(updatedToDoList);
    
    
  });
});
