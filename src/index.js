import './css/welcome.css';
import './css/dashboard.css';
// eslint-disable-next-line
import {showElement, countDown, changeToDashboard, delay} from './logic/welcome';
import Cookies from 'js-cookie';
import {COOKIEDAYS, SECONDS, DELAY} from './logic/params';

// DOM
if (!window.location.href.endsWith('dashboard.html')) {
  console.log('index');
  const time = document.querySelector('h1');
  const form = document.querySelector('form');
  const name = document.getElementById('name');
  // Event Listeners
  form.addEventListener('change', () => {
    Cookies.set('name', name.value, {expires: COOKIEDAYS});
    changeToDashboard();
  });

  countDown(SECONDS, 500, time).then(() => {
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
  delay(DELAY).then(() => {
    loading.remove();
    // loadMap(vlc)
    // createTable
    // fetchData
    // printData
  });
}
