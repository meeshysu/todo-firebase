// import $ from 'jquery';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import createNavBar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import taskListPage from './components/ListsPage/listsPage';

import 'bootstrap';
import './index.scss';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar();
  loginButton();
  checkLoginStatus();
  taskListPage();
};
initializeApp();
