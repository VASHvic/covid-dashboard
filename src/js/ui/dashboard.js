import '../../css/dashboard.css';
import {getDayAndCsv, showElement} from '../logic/functions';
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const loading = document.getElementById('loading');
const table = document.getElementById('table');

delay(DELAY).then(() => {
  loading.remove();
  showElement(table);
  /*eslint-disable */
  getDayAndCsv('https://dadesobertes.gva.es/api/3/action/package_search?q=id:5403e057-5b64-4347-ae44-06fa7a65e1b8') //prettier-ignore
    .then((json) => {
      const data = json.result.results[0];
      const resources = data.resources;
      const day = resources[resources.length - 1].name.slice(-10);
      const csv = resources[resources.length - 1].url;
      console.log(day);
      console.log(csv);
    }); /* eslint-enable */
  // show day
  // get csv data
  // loadMap(vlc)
  // createTable
  // fetchData
  // printData
});
