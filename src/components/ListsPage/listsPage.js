import $ from 'jquery';
import 'bootstrap';
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const printSingleTask = (tasks) => {
  const taskString = `
    <div>
    <h1>${tasks.task}</h1>
    <button class="btn btn-danger delete-button">X</button>
    </div>
    `;
  $('#lists').html(taskString);
};

const getSingleTask = (e) => {
  const taskId = e.target.dataset.dropdownId;
  axios.get(`${baseUrl}/todoTasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.taskId = taskId;
      printSingleTask(singleTask);
    })
    .catch((error) => {
      console.error(error);
    });
};

const buildDropDown = (taskArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick A Task To View
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  taskArray.forEach((task) => {
    dropdown += `<div class="dropdown-item" data-dropdown-id=${task.taskId}>${task.task}</div>`;
  });
  dropdown += '</div></div>';
  $('#dropDown').html(dropdown);
};

const getAllTasksFromDb = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/todoTasks.json`)
    .then((result) => {
      const allTasksObject = result.data;
      const allTasksArray = [];
      if (allTasksObject != null) {
        Object.keys(allTasksObject).forEach((taskId) => {
          allTasksObject[taskId].taskId = taskId;
          allTasksArray.push(allTasksObject[taskId]);
        });
      }
      buildDropDown(allTasksArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const bindEvents = () => {
  $('body').on('click', '.dropdown-item', getSingleTask);
};

const initializeListPage = () => {
  getAllTasksFromDb();
  bindEvents();
};

export default {
  initializeListPage,
};
