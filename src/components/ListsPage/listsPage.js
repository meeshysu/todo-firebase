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
    domString += `
      <div class="cardTitle">Tasks</div>
        <div class="cardContent">
          <p class="tasks">${task.task}</p>
          <button class="btn btn-light delete-btn" data-edit-id=${task.id}>
            <img class="image" src="${trashImage}"/>
          </button>
          <button class="btn btn-light edit-btn" data-edit-id=${task.id}>
            <img class="image" src="${editImage}"/>
          </button>
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

const bindEvents = () => {
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeListsPage = () => {
  taskListPage();
  bindEvents();
};

export default initializeListsPage;
