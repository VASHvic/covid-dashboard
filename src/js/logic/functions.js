import axios from 'axios';

/**
 * @param {int} ms
 * @return {promise} after miliseconds
 */
function delay(ms) {
  return new Promise((resolve) => setInterval(() => resolve(), ms));
}

/**
 * @param {int} num to show in countdown
 * @param {int} ms for the countdown to last
 * @param {HTML} element to display the num
 */
async function countDown(num, ms, element) {
  for (let i = 0; i <= num; num--) {
    printText(element, num);
    await delay(ms);
  }
}

/**
 * @param {HTML} element to show
 */
function showElement(element) {
  element.style.display = 'block';
}

/**
 * @param {HTML} element to print
 * @param {string} print text to print in element
 */
function printText(element, print) {
  element.innerText = print;
}

/**
 * @param {string} url
 */
function changeURL(url) {
  window.location.href = url;
}
/**
 * @param {*} url
 * @return {*} promise of the json object
 */
async function getDayAndCsv(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}
/**
 * @param {string} url to fetch
 * @return {data}
 */
async function getCsvData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    alert(error);
  }
}
/**
 * @return {*} li tag with table row class
 */
function createTableRow() {
  const newLi = document.createElement('li');
  newLi.classList.add('table-row');
  return newLi;
}
/**
 * @param {*} cityNum code of the city
 * @param {*} arr of cities (html elements)
 */
function filterByCity(cityNum, arr) {
  sessionStorage.setItem('filter', cityNum);
  if (cityNum === '*') {
    for (const city of arr) {
      city.style.display = 'flex';
    }
    return;
  }
  arr.forEach((element) => {
    let code = element.getAttribute('codi');
    // to solve the problem of alicante data changing
    if (code.startsWith('3')) code = '03';
    if (!code.startsWith(cityNum)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  });
}
/**
 * @param {*} input box to search
 * @param {*} arr of elements to filter
 */
function filterSearch(input, arr) {
  arr.forEach((elem) => {
    if (elem.innerText.toUpperCase().includes(input.value.toUpperCase())) {
      elem.parentElement.style.display = 'flex';
    } else {
      elem.parentElement.style.display = 'none';
    }
  });
}
// prettier-ignore
/**
 * Creates the map
 * @param {*} latitude
 * @param {*} longitude
 * @return {map} the map
 */
function initMap(latitude, longitude) {
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
        'pk.eyJ1IjoieGF2aTEycC1wcm9mZSIsImEiOiJja3kxbnhrZjAwZDdkMnhybTVheWpzOXVrIn0.6tgSdQGqA4w9VQ0kY4xrlA', //eslint-disable-line
      },
  ).addTo(map);

  return map;
}
// hacer funcion asyncrona que devuelva una promesa con las coordenadas
// prettier-ignore
/**
 * @param {*} map
 */
function askLocation(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) =>{
      const {latitude, longitude} = position.coords;
      await changePosition(map, latitude, longitude );
      fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`)
          .then((data) => data.json())
          .then((json) => {
            const searchBar = document.getElementById('searchBar');
            const keyupEvent = new Event('keyup');
            searchBar.value = json.features[0].properties.address.town ??
          json.features[0].properties.address.city;
            searchBar.dispatchEvent(keyupEvent);
          });
    },
    ()=> {
      document.getElementById('map').remove();
      printText(document.getElementById('map-msg'),
          'User didn\'t allow for geolocation');
    });
  } else {
    alert('Geolocation not supported by the browser');
  }
}

/**
 * Position the coords in the map with a marker
 * @param {*} map
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} marker
 * @return {marker} newMarker updated
 */
function changePosition(map, latitude, longitude, marker) {
  map.setView([latitude, longitude], 13);
  if (marker) {
    marker.removeFrom(map);
  }
  const newMarker = L.marker([latitude, longitude]).addTo(map);
  return newMarker;
}
/**
 * @param {*} user stored in cookies
 * @param {*} title of the post
 * @param {*} comment to send
 */
async function sendComment(user, title, comment) {
  const error = document.getElementById('form-error');
  // prettier-ignore
  if (Notification.permission === 'granted' &&
   comment.value != '' && title.value != '') {
    // disable post button + loading text
    const post = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: title.value,
        body: comment.value,
        userId: user,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await post.json();
    new Notification(response.title, {
      body: `Message from ${response.userId}:\n ${response.body}`,
    });
    error.textContent= '';
    return;
  }
  if (title.value === '') {
    title.focus();
  }
  if (comment.value === '') {
    comment.focus();
  }
  // prettier-ignore
  printText(error, 'Fields can\'t be empty and notifications must be allowed');
}
/**
 * copies the url and shows it with an alert
 */
function copyUrlToClipboard() {
  navigator.clipboard.writeText(window.location.href);
  alert(`${window.location.href} copied to clipbard`);
}
/**
 * @param {*} arr
 * @return {int} of elements that are displayed
 */
function countCities(arr) {
  let num = 0;
  for (const city of arr) {
    if (city.style.display === 'flex') num++;
  }
  return num;
}

export {
  countDown,
  showElement,
  changeURL,
  delay,
  getDayAndCsv,
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
};
