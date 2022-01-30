import './css/welcome.css';
import './css/dashboard.css';
// eslint-disable-next-line
import {showElement, countDown, changeToDashboard, delay} from './logic/welcome';
import Cookies from 'js-cookie';

// DOM
if (!window.location.href.endsWith('dashboard.html')) {
  console.log('index');
  const time = document.querySelector('h1');
  const form = document.querySelector('form');
  const name = document.getElementById('name');
  // Event Listeners
  form.addEventListener('change', () => {
    Cookies.set('name', name.value, {expires: 1});
    changeToDashboard();
  });

  countDown(1, 500, time).then(() => {
    time.remove();
    if (Cookies.get('name')) {
      // changeToDashboard();
      console.log('alreadylogged');
    }
    showElement(form);
  });
}
if (window.location.href.endsWith('dashboard.html')) {
  const loading = document.getElementById('loading');
  delay(2000).then(() => loading.remove());
  console.log('aaa');
}
