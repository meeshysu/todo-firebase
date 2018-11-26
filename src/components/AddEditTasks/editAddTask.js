import $ from 'jquery';
import './editAddTask.scss';
import tasksData from '../../helpers/dataGetter';
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
    isCompleted: false,
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
  $('#lists').hide();
  $('#show-task-form').hide();
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

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId; // camel case data-single-edit-id
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit You Task:</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id} class="btn btn-success">Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#tasks').hide();
    })
    .catch((error) => {
      console.error('error in getting single task for edit', error);
    });
};

const updateTask = (e) => {
  const updatedTask = gettingTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#single-container').html('');
      $('#lists').show();
      initializeListsPage();
    })
    .catch((error) => {
      console.error('error in updating tasks', error);
    });
};

$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default buildTaskForm;
