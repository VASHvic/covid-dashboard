import './css/dashboard.css';
import {showElement} from './logic/functions';
import {DELAY} from './logic/params';
import {delay} from './logic/functions';

const loading = document.getElementById('loading');
const table = document.getElementById('table');

delay(DELAY).then(() => {
  loading.remove();
  showElement(table);
  // loadMap(vlc)
  // createTable
  // fetchData
  // printData
});
