import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';
import 'bootstrap';

import googleImage from './Google2.png';

const loginButton = () => {
  const domString = `
    <button id="google-auth" class="btn btn-light">
    <img class="buttonId" src="${googleImage}"/>
    </button>
  `;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
