import { changeView } from './controller-view/index.js';

const initRouter = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDRfwgljtnkk2mUrYDMcSEumDulfkHe9Uk',
    authDomain: 'social-network-2c5f9.firebaseapp.com',
    databaseURL: 'https://social-network-2c5f9.firebaseio.com',
    projectId: 'social-network-2c5f9',
    storageBucket: 'social-network-2c5f9.appspot.com',
    messagingSenderId: '319072321809',
    appId: '1:319072321809:web:c6c4023a67eb540e',
  };
  firebase.initializeApp(firebaseConfig);
  initRouter();
};

window.onload = init();
