import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';

import googleImage from './Sign-In.png';
import allTasksArray from '../../helpers/dataGetter';

const loginButton = () => {
  const domString = `
    <button id="google-auth" class="btn btn-light">
    <img src="${googleImage}"/>
    </button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};


const showList = (task) => {
  let domString = '';
  domString = `
  <div id="list" class="printedList>
    <h4>${task.task}</h4>
  </div>
  `;
  if (task.isCompleted === true) {
    $('#lists').html(domString);
  }
};

const initlializeLists = () => {
  allTasksArray()
    .then((data) => {
      showList(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  loginButton, initlializeLists,
};
