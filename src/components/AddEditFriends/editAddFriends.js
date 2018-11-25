import $ from 'jquery';
import tasksData from '../../helpers/dataGetter';
import initializeListsPage from '../ListsPage/listsPage';

const formBuilder = () => {
  const form = `
  <div class="form-group">
    <label for="form-task-name">Task Name:</label>
    <input type="text" class="form-control" id="form-task-name" placeholder="Wash the dogs">
  </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    task: $('#form-task-name').val(),
    isCompleted: false,
  };
  return task;
};

const buildTaskForm = () => {
  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder();
  domString += '<button id="add-task" class="btn btn-success">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#lists').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  tasksData.addNewTask(newTask)
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
