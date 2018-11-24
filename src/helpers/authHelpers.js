import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#lists').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-lists').show();
      $('#navbar-button-logout').show();
      // initializeListPage();
      // console.log('user exists');
    } else {
      $('#lists').hide();
      $('#auth').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-logout').hide();
      $('#navbar-button-lists').hide();
      // console.log('no user exists for now');
    }
  });
};


export default checkLoginStatus;
