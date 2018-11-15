import firebase from 'firebase/app';
import 'firebase/auth';
// import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user exists');
    } else {
      console.log('no user exists for now');
    }
  });
};

export default checkLoginStatus;
