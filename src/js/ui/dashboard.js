import '../../css/dashboard.css';
import {
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
  printText,
  countCities,
} from '../logic/functions';
import Cookies from 'js-cookie';
import {params} from '../logic/params';
import {delay} from '../logic/functions';

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
const totalCities = document.getElementById('total-cities');
const map = initMap(39.47, -0.378);
// Event Listeners
commentBtn.addEventListener('click', (e) => {
  e.target.textContent = 'Loading...';
  e.target.disabled = true;
  sendComment(name, commentTitle, commentArea).then(() => {
    commentBtn.disabled = false;
    commentBtn.innerHTML = 'Send';
  });
});
allowNotif.addEventListener('click', () => Notification.requestPermission());
// prettier-ignore
ciudades.forEach((ciudad) => // adds filter function to city buttons
  ciudad.addEventListener( 'click', (e) =>{
    searchbar.value = '';
    for (ciudad of ciudades) { // changes  color of buttons
      ciudad.style.background= '#333';
    }
    e.target.style.background = 'red';
    filterByCity(e.target.getAttribute('id'),
        document.querySelectorAll('li.table-row'));
    printText( // show the city number after filtering
        totalCities,
        ' Showing ' +
            countCities(document.querySelectorAll('li.table-row')) +
            ' cities.',
    );
  }),
);

shareBtn.addEventListener('click', copyUrlToClipboard);

/*eslint-disable */
searchbar.addEventListener('keyup', () => {
  // adds filter function to search input
  filterSearch(input, document.querySelectorAll('div.indice-1'));
  printText(
    totalCities,
    `Showing ${countCities(document.querySelectorAll('li.table-row'))} cities`
  );
  if (ciudades[0].style.background != 'red') {
    // show "All" button red
    for (let ciudad of ciudades) {
      ciudad.style.background = '#333';
    }
    ciudades[0].style.background = 'red';
  }
});

geoButton.addEventListener('click', () => askLocation(map)); /* eslint-enable */

// main program
const name = Cookies.get('name');
if (!name) {
  window.location.href = '/'; // return to login if user not registered
}
greeting.innerHTML = `Hola ${name}`;
showElement(table);
delay(params.delay).then(() => {
  /*eslint-disable */
  getDayAndCsv('https://dadesobertes.gva.es/api/3/action/package_search?q=id:5403e057-5b64-4347-ae44-06fa7a65e1b8') //prettier-ignore
    .then((json) => {
      const data = json.result.results[0];
      const resources = data.resources;
      const day = resources[resources.length - 1].name.slice(-10);
      const csv = resources[resources.length - 1].url;
      printText(date, day);
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
              // put code of city as html attribute
              if (index === 0) {
                newLi.setAttribute('codi', element);
              }
              if (index === 1 || index === 4 || index === 5) {
                // create a new row for the table
                let newDiv = document.createElement('div');
                newDiv.classList.add(`indice-${index}`);
                newDiv.textContent = element;
                newLi.appendChild(newDiv);
              }
              if (newLi.getAttribute('codi') === '') newLi.remove();
            });
            loading.remove();
            if (sessionStorage.getItem('filter')) {
              // check for filters in storage
              filterByCity(
                sessionStorage.getItem('filter'),
                document.querySelectorAll('li.table-row')
              );
              for (let ciudad of ciudades) {
                // paint last selected filter
                if (ciudad.id === sessionStorage.getItem('filter')) {
                  ciudad.style.background = 'red';
                }
              }
            } else {
              //if no filters saved show all
              filterByCity('*', document.querySelectorAll('li.table-row'));
            }
          }
          printText(
            totalCities,
            ' Showing ' +
              countCities(document.querySelectorAll('li.table-row')) +
              ' cities.'
          );
          if (searchbar.value !== '') {
            // refresh searchbar
            const keyupEvent = new Event('keyup');
            searchbar.dispatchEvent(keyupEvent);
          }
        })
        .catch((err) => alert(err));
    })
    .catch((err) => alert(err));
});
