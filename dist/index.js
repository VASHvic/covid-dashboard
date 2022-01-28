/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const time = document.createElement("span");
document.body.appendChild(time);

function delay(ms) {
  return new Promise((resolve) => setInterval(() => resolve(), ms));
}

async function count(ms, secs) {
  for (let i = 0; i <= secs; i++) {
    time.innerText = i;
    await delay(ms);
  }
}

count(500, 9);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY292aWQtZGFzaGJvYXJkLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aW1lKTtcclxuXHJcbmZ1bmN0aW9uIGRlbGF5KG1zKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRJbnRlcnZhbCgoKSA9PiByZXNvbHZlKCksIG1zKSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNvdW50KG1zLCBzZWNzKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2VjczsgaSsrKSB7XHJcbiAgICB0aW1lLmlubmVyVGV4dCA9IGk7XHJcbiAgICBhd2FpdCBkZWxheShtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5jb3VudCg1MDAsIDkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=