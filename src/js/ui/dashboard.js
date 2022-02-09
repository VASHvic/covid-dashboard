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
  sendComment,
  copyUrlToClipboard,
} from '../logic/functions';
import Cookies from 'js-cookie';
import {DELAY} from '../logic/params';
import {delay} from '../logic/functions';

const map = initMap(39.47, -0.378);

// DOM selectors
const loading = document.getElementById('loading');
const table = document.getElementById('table');
const date = document.getElementById('date');
const ul = document.querySelector('.responsive-table');
const searchbar = document.getElementById('searchBar');
const geoButton = document.getElementById('geoloc');
const input = document.getElementById('searchBar');
const ciudades = document.querySelectorAll('input[type="button"]');
const greeting = document.getElementById('greeting');
const commentTitle = document.getElementById('comment-title');
const commentArea = document.getElementById('comment');
const allowNotif = document.getElementById('allow-notif');
const commentBtn = document.getElementById('comment-btn');
const shareBtn = document.getElementById('share');

// Event Listeners
commentBtn.addEventListener('click', (e) => {
  e.target.innerText = 'Loading...';
  e.target.disabled = true;
  sendComment(name, commentTitle, commentArea).then(() => {
    commentBtn.disabled = false;
    commentBtn.innerHTML = 'Send';
  });
}); // eslint-disable-line
allowNotif.addEventListener('click', () => Notification.requestPermission());
// prettier-ignore
ciudades.forEach((ciudad) => // adds filter function to city buttons
  ciudad.addEventListener( 'click', (e) =>{
    for (ciudad of ciudades) { // changes  color of buttons
      ciudad.style.background= '#333';
    }
    e.target.style.background = 'red';
    filterByCity(e.target.getAttribute('id'),
        document.querySelectorAll('li.table-row'));
  }),
);

shareBtn.addEventListener('click', copyUrlToClipboard);

// prettier-ignore
searchbar.addEventListener( // adds filter function to search input
    'keyup', () => filterSearch(input,
        document.querySelectorAll('div.indice-1')),
);

geoButton.addEventListener('click', () => askLocation(map));

// main program
const name = Cookies.get('name');
if (!name) {
  window.location.href = '/';
}
greeting.innerHTML = `Hola ${name}`;
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
            filterByCity(
              sessionStorage.getItem('filter'),
              document.querySelectorAll('li.table-row')
            );
          }
        });
    }); /* eslint-enable */
});
