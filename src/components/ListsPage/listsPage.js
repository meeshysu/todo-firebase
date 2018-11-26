import $ from 'jquery';
import './listsPage.scss';
// import axios from 'axios';
// import apiKeys from '../../../db/apiKeys.json';
import dataGetter from '../../helpers/dataGetter';
import trashImage from './TrashIcon.png';
import editImage from './EditIcon.jpg';


// const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const printTasks = (allTasksArray) => {
  let domString = '';
  allTasksArray.forEach((task) => {
    domString += `<div>
        <label for="toggle-1" class="taskChecked">
        <input type="checkbox" class="task" id="toggle-1"></input>
          <p class="task">${task.task}<br>
          <input class="delete-btn task" data-delete-id=${task.id} type="image" src="${trashImage}"></input>
          <input class="edit-btn task" data-edit-id=${task.id} type="image" src="${editImage}"></input>
          </p>
        </label>
        </div>
        `;
    $('#lists').html(domString);
  });
};

const taskListPage = () => {
  dataGetter.getAllTasksFromDb()
    .then((data) => {
      printTasks(data);
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

// const checkedBox = () => {
//   $('.task').on('click', () => {
//     if ($(this).is(':checked')) {
//       $('#taskContainer').append('#completed');
//     }
//   });
// };

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeListsPage = () => {
  taskListPage();
  bindEvents();
  // checkedBox();
};

export default { initializeListsPage };

// const gettingSingleTask = (isFinished, taskToUpdate) => {
//   const task = {
//     task: $(taskToUpdate).text(),
//     isCompleted: isFinished,
//   };
//   return task;
// };
