import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import initializeListsPage from '../components/ListsPage/listsPage';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#lists').show();
      $('#auth').hide();
      $('#show-task-form').show();
      $('#completed-title').show();
      $('#completed-title').show();
      $('#add-edit-task').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-lists').show();
      $('#navbar-button-logout').show();
      initializeListsPage();
    } else {
      $('#lists').hide();
      $('#auth').show();
      $('#title').hide();
      $('#completed').hide();
      $('#completed-title').hide();
      $('#lists-title').hide();
      $('#show-task-form').hide();
      $('#add-edit-task').hide();
      $('#single-container').hide();
      $('#navbar-button-auth').show();
      $('#navbar-button-logout').hide();
      $('#navbar-button-lists').hide();
      // console.log('no user exists for now');
    }
  });
};


export default checkLoginStatus;
