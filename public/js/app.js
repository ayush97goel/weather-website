console.log('connected');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
  let address = search.value;
  address = encodeURIComponent(address);
  const url = `http://127.0.0.1:3000/weather?address=${address}`;
  messageOne.textContent = "loading Forecast...";
  messageTwo.textContent = "";

  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      })
    }
    );
  e.preventDefault();
});