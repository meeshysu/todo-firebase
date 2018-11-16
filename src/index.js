// import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import createNavBar from './components/Navbar/navbar';
import login from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import getAllTasksFromDb from './helpers/dataGetter';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar();
  checkLoginStatus();
  login.loginButton();
  getAllTasksFromDb();
};
initializeApp();
