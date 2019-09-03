import { signOutUser } from '../controller/home-controller.js';
import { updateProfile, getData } from '../controller/profile-controller.js';
import { userCurrent } from '../model/controller-authentication.js';

export default () => {
  const profile = document.createElement('div');
  const profileContent = ` <header>
  <h2 class="white">Meet and Code</h2> 
    <nav class="nav-links flex menu-bar">
    <a  id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
      <ul id="show-hamb" class="hide list-menu">
      <!--<li><a id="user-name"><span class="icon-user">User</a></li>-->
        <li>
          <div class="only-flex">
          <img id="photo" class="photo-header">
          <a id="user-name">
          </a>
          </div>
        </li>
        <li><a href="#/codeMeet" id="homePag" >Home</a></li>
        <li><a id="setting">Setting</a></li>
        <li><a id="signOut"><span class="icon-exit"></span>Log Out</a></li>
      </ul>
    </nav>    
  </header>
   
    <div class="div-main-profile">  
    <h2 class="margin">Profile</h2> 
    <div class="flex-form-profile margin">
    ${userCurrent().photoURL !== null ? `<img class="img-user margin" src="${userCurrent().photoURL}">` : '<img class="img-avatar margin" src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg">'}
    <form class="form-profile">
    <label>Nombre</label>
    <input type="text" value="" class="inputForm" id="name">
    <label>Email</label>
    <input type="text" value="" disabled class="inputForm" id="email">
    <label>Ocupación</label>
    <input type="text" value="" class="inputForm" id="job">
    <label>Sobre ti</label>
    <textarea class="textarea-profile" id="description-text"></textarea>
    <input type="submit" class="button-login" id="button-save" value="Guardar">
    <input type="submit" class="button-login" id="button-return" value="Regresar">
    </form>
    </div>
    </div>
    `;

  profile.innerHTML = profileContent;
  const btnSignOut = profile.querySelector('#signOut');
  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  const job = profile.querySelector('#job');
  const descriptionText = profile.querySelector('#description-text');

  btnSignOut.addEventListener('click', signOutUser);

  getData(name, email, job, descriptionText);
  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = name.value;
    const newEmail = email.value;
    const newJob = job.value;
    const newDescription = descriptionText.value;

    updateProfile(newName, newEmail, newJob, newDescription).then(() => {
      window.location.hash = '#/codeMeet';
    });
  });

  const returnHome = profile.querySelector('#button-return');
  returnHome.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/codeMeet';
  });

  return profile;
};
