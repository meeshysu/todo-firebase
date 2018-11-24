import $ from 'jquery';
import './listsPage.scss';
// import bootstrap from 'bootstrap';
import dataGetter from '../../helpers/dataGetter';


const printTasks = (allTasksArray) => {
  let domString = '';
  allTasksArray.forEach((task) => {
    domString += `
      <div class="cardTitle">Tasks</div>
        <div class="cardContent">
          <p class="tasks">${task.task}</p>
          <button class="btn btn-danger">X</button>
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


export default taskListPage;
