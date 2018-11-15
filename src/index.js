import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  $('#list').html('this prints');
};
initializeApp();
