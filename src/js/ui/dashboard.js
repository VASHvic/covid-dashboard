import '../../css/dashboard.css';
import {showElement} from '../logic/functions';
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const loading = document.getElementById('loading');
const table = document.getElementById('table');

delay(DELAY).then(() => {
  loading.remove();
  showElement(table);
  // prettier-ignore
  (async ()=> {
    const result = await fetch('https://dadesobertes.gva.es/api/3/action/package_search?q=id:5403e057-5b64-4347-ae44-06fa7a65e1b8');
    const json = result.json();
    return json;
  })()
      .then((e) => {
        const data = e.result.results[0];
        const resources = data.resources;
        console.log(resources);
      });

  // loadMap(vlc)
  // createTable
  // fetchData
  // printData
});
