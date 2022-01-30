import './css/welcome.css';
import './css/dashboard.css';
import {showElement, countDown, changeToDashboard} from './logic/welcome';

const time = document.querySelector('h1');
const form = document.querySelector('form');
form.addEventListener('click', () => {
  changeToDashboard();
});

countDown(1, 500, time).then((value) => {
  value.remove();
  showElement(form);
});
