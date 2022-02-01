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

export {countDown, showElement, changeToDashboard, delay};
