import '../../css/dashboard.css';
import {displayDate, getDayAndCsv, showElement, getCsvData} from '../logic/functions'; //eslint-disable-line
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const loading = document.getElementById('loading');
const table = document.getElementById('table');
const date = document.getElementById('date');

delay(DELAY).then(() => {
  loading.remove();
  showElement(table);
  /*eslint-disable */
  getDayAndCsv('https://dadesobertes.gva.es/api/3/action/package_search?q=id:5403e057-5b64-4347-ae44-06fa7a65e1b8') //prettier-ignore
    .then((json) => {
      const data = json.result.results[0];
      const resources = data.resources;
      const day = resources[resources.length - 1].name.slice(-10);
      displayDate(day, date);
      const csv = resources[resources.length - 1].url;
      getCsvData(csv)
        //prettier-ignore
        .then((data) => {
          const dataArray = data.split('\n'); //pensar si obj
          const newArray = dataArray[1].split(';');
          console.log(newArray);

          // for (let elem of dataArray) {
          //   console.log(elem);
          // }
          // console.log(dataArray);

          // console.log(dataArray);

          // console.log(dataArray);
        });
    }); /* eslint-enable */

  // loadMap(vlc)
  // createTable
  // printData
  // añadir catches
  // castello 12
  // alcoy 3
  // valencia 12
  // hacer response ok (pero en axios no)
});
