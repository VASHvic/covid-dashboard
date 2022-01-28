const time = document.querySelector("span");
const form = document.querySelector("form");

count(5, 500).then(() => showLogin());

function delay(ms) {
  return new Promise((resolve) => setInterval(() => resolve(), ms));
}

async function count(secs, ms) {
  for (let i = 0; i <= secs; secs--) {
    time.innerText = secs;
    await delay(ms);
  }
}
function showLogin() {
  time.remove();
  form.style.display = "block";
}
