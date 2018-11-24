// import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import createNavBar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import getSingleTask from './components/ListsPage/listsPage';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar();
  checkLoginStatus();
  loginButton();
  getSingleTask.initializeListPage();
};
initializeApp();
