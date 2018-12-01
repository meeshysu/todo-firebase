import './navbar.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const navBarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#lists').hide();
        $('#show-task-form').hide();
        $('#completed').hide();
      })
        .catch((error) => {
          console.error('you are still logged in', error);
        });
    } else if (e.target.id === 'navbar-button-lists') {
      $('#auth').hide();
      $('#lists').show();
      $('#show-task-form').show();
      $('#completed').show();
    } else {
      $('#auth').show();
      $('#lists').hide();
    }
  });
};


const createNavBar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">To Do List</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a id="navbar-button-auth" class="nav-link">Authentication</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-lists" class="nav-link">List</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-logout" class="nav-link">Logout</a>
      </li>
    </ul>
  </div>
</nav>
  `;
  $('#navbar').html(domString);
  navBarEvents();
};

export default createNavBar;
