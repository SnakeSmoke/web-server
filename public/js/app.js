const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastOutput1 = document.querySelector(".forecast1");
const forecastOutput2 = document.querySelector(".forecast2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  console.log(location);

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then(({ error, forecast, location, address }) => {
      if (error) {
        forecastOutput1.textContent = error;
        forecastOutput2.textContent = "";
      } else {
        forecastOutput1.textContent = location + ", " + address;
        forecastOutput2.textContent = forecast;
      }
    });
  });
});
