// import $ from 'jquery';
import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';
import createNavBar from './components/Navbar/navbar';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar();
};
initializeApp();
