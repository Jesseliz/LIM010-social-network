import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import { allNotes, myPostNotes } from '../controller/post-controller.js';
import { recoverDataProfile } from '../controller/profile-controller.js';

export const codeMeet = () => {
  const headerDiv = document.createElement('div');
  const headerContent = `
  <header>
  <h2 class="white">Meet and Code</h2>
  <nav class="nav-links flex menu-bar">
    <a id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
      <li>
        <div class="only-flex">
          <img id="photo" class="photo-header">
          <a id="user-name"></a>
        </div>
      </li>
      <li><a id="homePag">Home</a></li>
      <li><a id="setting">Setting</a></li>
      <li><a id="signOut"><span class="icon-exit"></span>Log Out</a></li>
    </ul>
  </nav>
  </header>
  <main>
    <div id="user-perfil" class="user-perfil">
      <div>
        <img class="img-profile"
          src="https://s.savvysme.com/live/themes/fluid_design/img/category/search-engine-marketing.png">
      </div>
      <div>
        <div class="flex margin">
          <img id="user-photo" class="user-photo">
          <h2 id="profile-name"></h2>
        </div>
        <hr>
        <div class="margin">
          <div class="flex-align">
            <i class="fa fa-graduation-cap margin" aria-hidden="true"></i>
            <p id="job"></p>
          </div>
          <div class="flex-align">
            <i class="fa fa-tags margin" aria-hidden="true"></i>
            <p id="description"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-post" id="content-post">
    </div>
  </main>
  `;
  headerDiv.innerHTML = headerContent;
  const btnSignOut = headerDiv.querySelector('#signOut');
  const settingUser = headerDiv.querySelector('#setting');
  const btnMyPost = headerDiv.querySelector('#user-name');
  const profileName = headerDiv.querySelector('#profile-name');
  const homePag = headerDiv.querySelector('#homePag');
  const divPhotoUser = headerDiv.querySelector('#user-photo');
  const photo = headerDiv.querySelector('#photo');
  const job = headerDiv.querySelector('#job');
  const description = headerDiv.querySelector('#description');

  allNotes(headerDiv);
  homePag.addEventListener('click', () => {
    homePag.style.backgroundColor = '#9da9cf';
    btnMyPost.style.backgroundColor = '#40538e';
    allNotes(headerDiv);
  });

  btnMyPost.addEventListener('click', () => {
    myPostNotes(headerDiv);
    btnMyPost.style.backgroundColor = '#9da9cf';
    homePag.style.backgroundColor = '#40538e';
  });

  btnSignOut.addEventListener('click', signOutUser);

  recoverUserName(btnMyPost, profileName, divPhotoUser, photo);
  recoverDataProfile(job, description);
  settingUser.addEventListener('click', changeViewToProfile);

  const HambMenu = headerDiv.querySelector('#hamb-menu');
  const showHamb = headerDiv.querySelector('#show-hamb');
  let modoMenu = 0;

  HambMenu.addEventListener('click', () => {
    if (modoMenu === 0) {
      showHamb.classList.add('block');
      showHamb.classList.remove('hide');
      modoMenu = 1;
    } else {
      showHamb.classList.add('hide');
      showHamb.classList.remove('block');
      modoMenu = 0;
    }
  });
  return headerDiv;
};
