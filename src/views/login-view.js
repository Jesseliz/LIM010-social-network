import {
  loginFunction, signInFacebook, signInGoogle, showPassword,
} from '../controller/login-controller.js';

export default () => {
  const formLogin = document.createElement('div');
  formLogin.className = 'container-login';
  const divLogin = `
  <div class="section-image flex">
  </div>
  <div class="login">
    <form id="form-autenticacion" class="flex-form">
      <img src="img/logo.png" class="img-logo" alt="Logo meet and code">
      <p class="slogan-coders">¡Bienvenido a <strong>Meet and Code</strong>, la red de coders en acción!</p>
      <div class="inputForm">
        <input type="text" name="email" value="" placeholder="Email" class="inputForm1" id="email">
      </div>
      <div class="inputForm">
        <input type="password" name="password" value="" placeholder="Password" class="inputForm1" id="password">
        <span id="show-eye" class="eye-class"><i class="fa fa-eye" aria-hidden="true"></i></span>
      </div>
      <input type="submit" name="" class="button-login" value="Log In">
      <label id="LoginMessageError"></label>
    </form>
    <div class="flex-form">
      <p>O bien ingresa con...</p>
      <div class="div-icon">
        <span id="facebook"><i class="fa fa-facebook iconfb" aria-hidden="true"></i></span>
        <span id="google"><i class="fa fa-google iconGoogle" aria-hidden="true"></i></span>
      </div>
      <p>¿No tienes una cuenta?&nbsp;<a href="#/register"><span id="register" class="register-href">Registrate</span></a></p>
    </div>
  </div>
  `;
  formLogin.innerHTML = divLogin;

  const formAutenticacion = formLogin.querySelector('#form-autenticacion');
  const loginFacebook = formLogin.querySelector('#facebook');
  const loginGoogle = formLogin.querySelector('#google');
  const showEye = formLogin.querySelector('#show-eye');

  formAutenticacion.addEventListener('submit', loginFunction);
  loginFacebook.addEventListener('click', signInFacebook);
  loginGoogle.addEventListener('click', signInGoogle);
  showEye.addEventListener('click', showPassword);
  return formLogin;
};
