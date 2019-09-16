import { changeView } from './controller-view/index.js';

const initRouter = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCWivbURhE6qmYSjZSqxbaYsrZwL2YQqLQ',
    authDomain: 'sosial-network-c0237.firebaseapp.com',
    databaseURL: 'https://sosial-network-c0237.firebaseio.com',
    projectId: 'sosial-network-c0237',
    storageBucket: 'sosial-network-c0237.appspot.com',
    messagingSenderId: '625296739587',
    appId: '1:625296739587:web:f5e413abb9ab5386',
  };
  firebase.initializeApp(firebaseConfig);
  initRouter();
};

window.onload = init();
