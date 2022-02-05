import '../../css/dashboard.css';
import {
  displayDate,
  getDayAndCsv,
  showElement,
  getCsvData,
  createTableRow,
  initMap,
  filterSearch,
  askLocation,
  filterByCity,
} from '../logic/functions';
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const map = initMap(39.47, -0.378);
const loading = document.getElementById('loading');
const table = document.getElementById('table');
const date = document.getElementById('date');
const ul = document.querySelector('.responsive-table');
const searchbar = document.getElementById('searchBar');
const geoButton = document.getElementById('geoloc');
const input = document.getElementById('searchBar');

const ciudades = document.querySelectorAll('a');
// prettier-ignore
ciudades.forEach((ciudad) =>
  ciudad.addEventListener(
      'click',
      (e) =>
        filterByCity(e.target.getAttribute('id'), document.querySelectorAll('li.table-row')) //eslint-disable-line
  ),
);

// prettier-ignore
searchbar.addEventListener(
    'keyup',
  () => filterSearch(input, document.querySelectorAll('div.indice-1')) //eslint-disable-line
);
// hacer promesa + quitar mapa y poner texto
geoButton.addEventListener('click', () => askLocation(map));

showElement(table);
delay(DELAY).then(() => {
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
          const dataArray = data.split('\n');
          dataArray.shift();
          for (let data of dataArray) {
            const newArray = data.split(';');
            const newLi = createTableRow();
            ul.appendChild(newLi);
            newArray.forEach((element, index) => {
              if (index === 0) {
                newLi.setAttribute('codi', element ?? 46);
              }
              if (index === 1 || index === 4 || index === 5) {
                let newDiv = document.createElement('div');
                newDiv.classList.add(`indice-${index}`);
                newDiv.innerText = element;
                newLi.appendChild(newDiv);
              }
              if (newLi.getAttribute('codi') === '') newLi.remove();
            });
            loading.remove();
          }
        });
    }); /* eslint-enable */

  // filtros
  // share btn
  // añadir catches
  // castello 12
  // alcoy 3
  // valencia 12
  // hacer response ok (pero en axios no)
  // refactorizar y arreglar
});
