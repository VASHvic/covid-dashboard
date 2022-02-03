import '../../css/dashboard.css';
import {
  displayDate,
  getDayAndCsv,
  showElement,
  getCsvData,
  createTableRow,
  initMap,
} from '../logic/functions';
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const loading = document.getElementById('loading');
const table = document.getElementById('table');
const date = document.getElementById('date');
const ul = document.querySelector('.responsive-table');

showElement(table);
initMap(39.47, -0.378);
delay(DELAY).then(() => {
  /*eslint-disable */
  getDayAndCsv('https://dadesobertes.gva.es/api/3/action/package_search?q=id:5403e057-5b64-4347-ae44-06fa7a65e1b8') //prettier-ignore
    .then((json) => {
      const data = json.result.results[0];
      const resources = data.resources;
      const day = resources[resources.length - 1].name.slice(-10);
      displayDate(day, date);
      const csv = resources[resources.length - 1].url;
      console.log(csv);
      getCsvData(csv)
        //prettier-ignore
        .then((data) => {
          const dataArray = data.split('\n'); //pensar si obj
          dataArray.shift();
          for (let data of dataArray) {
            const newArray = data.split(';');
            const newLi = createTableRow();
            ul.appendChild(newLi);
            //add id with codi?
            newArray.forEach((element, index) => {
              if (index === 1 || index === 4 || index === 5) {
                let newDiv = document.createElement('div');
                newDiv.innerText = element;
                newLi.appendChild(newDiv);
              }
            });
            loading.remove();
          }
        });
    }); /* eslint-enable */

  // loadMap(vlc)
  // añadir catches
  // castello 12
  // alcoy 3
  // valencia 12
  // hacer response ok (pero en axios no)
});
