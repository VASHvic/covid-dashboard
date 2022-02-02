import '../../css/welcome.css';
import {showElement, countDown, changeToDashboard} from '../logic/functions'; // eslint-disable-line
import Cookies from 'js-cookie';
import {COOKIEDAYS, SECONDS} from '../logic/params';

// DOM selections
const time = document.querySelector('h1');
const form = document.querySelector('form');
const name = document.getElementById('name');

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
});
form.addEventListener('change', () => {
  Cookies.set('name', name.value, {expires: COOKIEDAYS});
  changeToDashboard();
});

// main program
countDown(SECONDS, 500, time).then(() => {
  time.remove();
  if (Cookies.get('name')) {
    // changeToDashboard();
    alert('alreadylogged');
  }
  showElement(form);
});
