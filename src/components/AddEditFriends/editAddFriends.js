import $ from 'jquery';
import getAllTasksFromDb from '../../helpers/dataGetter';
import initializeListsPage from '../ListsPage/listsPage';

const formBuilder = (task) => {
  const form = `
  <div class="form-group">
    <label for="form-task-name">Task Name:</label>
    <input type="text" class="form-control" value="${task.task}" id="form-task-name" placeholder="Wash the dogs">
  </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    task: $('#form-task-name').val(),
  };
  return task;
};

const buildTaskForm = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task" class="btn btn-success">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  // $('#lists').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  getAllTasksFromDb.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#lists').show();
      initializeListsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);

export default buildTaskForm;
