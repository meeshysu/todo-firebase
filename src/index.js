import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import createNavBar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import initializeListsPage from './components/ListsPage/listsPage';
import showAddForm from './components/AddEditTasks/editAddTask';

import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar();
  loginButton();
  checkLoginStatus();
  initializeListsPage.initializeListsPage();
  $('#show-task-form').on('click', showAddForm);
};
initializeApp();
