import $ from 'jquery';
import './listsPage.scss';
// import axios from 'axios';
// import apiKeys from '../../../db/apiKeys.json';
import dataGetter from '../../helpers/dataGetter';
import trashImage from './trash.png';
import editImage from './pen.png';


// const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const printTasks = (allTasksArray) => {
  let domString = '';
  // console.log(allTasksArray);
  allTasksArray.forEach((task) => {
    domString += `<div>
        <label for="toggle-1" class="taskChecked">
        <input type="checkbox" class="task-is-finished-check-box" id="${task.id}"></input>
          <p class="task">${task.task}<br>
          <input class="delete-btn task" data-delete-id=${task.id} type="image" src="${trashImage}"></input>
          <input class="edit-btn task" data-edit-id=${task.id} type="image" src="${editImage}"></input>
          </p>
        </label>
        </div>
        `;
    $('#lists').html(domString);
    if (task.isCompleted) {
      // $('#completed').append(true);
      // console.log('you checked');
      $('.task-is-finished-check-box').attr('checked', true);
    }
  });
};

const printCompletedTasks = (completed) => {
  let domString = '';
  // console.log(completed);
  completed.forEach((task) => {
    domString += `
    <div class="form-check form-check-inline">
    <p class="task">${task.task}
      <input class="delete-btn task" data-delete-id=${task.id} type="image" src="${trashImage}"></input>
      </p>
    </div>
    `;
    $('#completed').html(domString);
  });
};

const updateIsCompleted = (e) => {
  const checkedId = e.target.id;
  const isChecked = e.target.checked;
  // console.log(isChecked);
  dataGetter.updatedIsChecked(checkedId, isChecked)
    .then(() => {
      // $('#completed').html(printCompletedTasks);
      dataGetter.getAllTasksFromDb()
        .then((data) => {
          const completedTasks = data.filter(x => x.isCompleted);
          const notCompletedTasks = data.filter(x => !x.isCompleted);
          printTasks(notCompletedTasks);
          printCompletedTasks(completedTasks);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  // console.log('you clicked me');
};

const taskListPage = () => {
  dataGetter.getAllTasksFromDb()
    .then((data) => {
      const completedTasks = data.filter(x => x.isCompleted);
      const notCompletedTasks = data.filter(x => !x.isCompleted);
      printTasks(notCompletedTasks);
      printCompletedTasks(completedTasks);
    })
    .catch((error) => {
      console.error('error in getting the tasks', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  dataGetter.deleteTask(idToDelete)
    .then(() => {
      taskListPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.task-is-finished-check-box', updateIsCompleted);
};

const initializeListsPage = () => {
  taskListPage();
  bindEvents();
};

export default { initializeListsPage };
