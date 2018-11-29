import $ from 'jquery';
import './editAddTask.scss';
import tasksData from '../../helpers/dataGetter';
import listsPage from '../ListsPage/listsPage';

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
  domString += '<button id="add-task" class="btn btn-info">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#lists').hide();
  $('#show-task-form').hide();
  $('#completed').hide();
};

// ADD A NEW TASK
const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  console.log(newTask);
  tasksData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#lists').show();
      listsPage.initializeListsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('keyup', '#form-task-name', (event) => {
  if (event.keyCode === 13) {
    addNewTask();
    // $('#add-task').click();
  }
});

// EDIT & UPDATE THE TASK
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId; // camel case data-single-edit-id
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit You Task:</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id} class="btn btn-info">Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#tasks').hide();
      $('#show-task-form').hide();
      $('#lists').hide();
      $('#completed').hide();
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
      // $('#single-container').html('');
      $('#lists').show();
      listsPage.initializeListsPage();
    })
    .catch((error) => {
      console.error('error in updating tasks', error);
    });
};


$('body').on('keyup', '#form-task-name', (event) => {
  if (event.keyCode === 13) {
    updateTask(); // pass in maybe a button to call it instead?
    // or another attribute into the input field
    // $('#add-edit-task').click();
  }
});


// CLICK EVENTS
$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default buildTaskForm;
