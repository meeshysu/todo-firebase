import './navbar.scss';
import $ from 'jquery';
// import firebase from 'firebase/app';
import 'firebase/auth';

const navBarEvents = () => {
  $('.nav-link').on('click', (e) => {
    console.log(e.target.id === 'navbar-button-auth');
  });
};
navBarEvents();

const createNavBar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">To Do List</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a id="navbar-button-auth" class="nav-link">Authentication</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-auth" class="nav-link">Logout</a>
      </li>
    </ul>
  </div>
</nav>
  `;
  $('#navbar').html(domString);
  navBarEvents();
};

export default createNavBar;
