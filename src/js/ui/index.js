import '../../css/welcome.css';
import {showElement, countDown, changeURL} from '../logic/functions';
import Cookies from 'js-cookie';
import {params} from '../logic/params';

// DOM selections
const time = document.querySelector('h1');
const form = document.querySelector('form');
const name = document.getElementById('name');

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
});
form.addEventListener('change', () => {
  Cookies.set('name', name.value, {expires: params.cookieDays});
  changeURL('/dashboard.html');
});

// main program
countDown(params.seconds, 500, time).then(() => {
  time.remove();
  if (Cookies.get('name')) {
    changeURL('/dashboard.html');
  } else {
    showElement(form);
  }
});
