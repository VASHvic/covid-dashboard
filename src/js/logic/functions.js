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

export {
  countDown,
  showElement,
  changeToDashboard,
  delay,
  getDayAndCsv,
  displayDate,
  getCsvData,
};
