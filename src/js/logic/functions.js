import axios from 'axios';

/**
 * @param {*} ms
 * @return {promise} after ms miliseconds
 */
function delay(ms) {
  return new Promise((resolve) => setInterval(() => resolve(), ms));
}

/**
 * @param {*} num to show in countdown
 * @param {*} ms  for the countdown to last
 * @param {*} element to display the num
 */
async function countDown(num, ms, element) {
  for (let i = 0; i <= num; num--) {
    printText(element, num);
    await delay(ms);
  }
}

/**
 * @param {*} element to show
 */
function showElement(element) {
  element.style.display = 'block';
}

/**
 * @param {*} element to print
 * @param {*} print text to print in element
 */
function printText(element, print) {
  element.innerText = print;
}

/**
 *changes to the dashboard page;
 */
function changeToDashboard() {
  window.location.href = '/dashboard.html';
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
 * @param {*} date to display
 * @param {*} elem where to display it
 */
function displayDate(date, elem) {
  // juntar amb printtext?
  elem.innerText = date;
}
/**
 *
 * @param {*} url
 */
async function getCsvData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
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
 *
 * @param {*} cityNum
 * @param {*} arr
 */
function filterByCity(cityNum, arr) {
  if (cityNum === '*') {
    for (const city of arr) {
      city.style.display = 'flex';
    }
    return;
  }
  arr.forEach((element) => {
    const code = element.getAttribute('codi');
    if (!code.startsWith(cityNum)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  });
}
/**
 *
 * @param {*} input
 * @param {*} arr
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
 * @return {*} the map
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

// prettier-ignore
/**
 *
 * @param {*} map
 */
function askLocation(map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) =>{
      const {latitude, longitude} = position.coords;
      changePosition(map, latitude, longitude );
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
// add reverse geocoding
// http://nominatim.openstreetmap.org/reverse?format=xml&lat=[LATITUDE]&lon=[LONGITUDE]&zoom=18&addressdetails=1
/**
 * Position the coords in the map with a marker
 * @param {*} map
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} marker
 * @return {*} newMarker
 */
function changePosition(map, latitude, longitude, marker) {
  map.setView([latitude, longitude], 13);
  if (marker) {
    marker.removeFrom(map);
  }
  const newMarker = L.marker([latitude, longitude]).addTo(map);
  return newMarker;
}

export {
  countDown,
  showElement,
  changeToDashboard,
  delay,
  getDayAndCsv,
  displayDate,
  getCsvData,
  createTableRow,
  initMap,
  filterSearch,
  askLocation,
  filterByCity,
};
