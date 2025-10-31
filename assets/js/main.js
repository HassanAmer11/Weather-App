var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let cityInput = document.querySelector(".cityInput");
let rowData = document.querySelector(".rowData");

cityInput.addEventListener("input", function (event) {
  searchByCityName(event.target.value);
});

async function searchByCityName(city = "cairo") {
  debugger;
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
  );
  const data = await res.json();
  setValuesOfToday(data);
  setValuesForNexDays(data.forecast.forecastday);
}

searchByCityName();

function getDayAsString(strDate) {
  const d = new Date(strDate);
  const dayName = days[d.getDay()];
  return dayName;
}

function setValuesOfToday(data) {
  const forecast = data.forecast.forecastday[0];
  const current = data.current;

  const date = new Date(forecast.date);
  const day = date.getDate(); // 31
  const month = date.toLocaleString("default", { month: "long" }); // "October"

  const formatted = `${day} ${month}`;


  rowData.innerHTML = `
    <div class="card text-white col-lg-4">
        <div class="card-header d-flex justify-content-between text-gray">
            <span id="dayName">${getDayAsString(forecast.date)}</span>
            <span id="currentDate">${formatted}</span>
        </div>
        <div class="card-body">
            <h5 class="card-title text-gray" id="cityName">${
              data.location.name
            }</h5>
            <p class="card-text fw-bold d-inline-block">
                <span id="temperatureDeg">${current.temp_c}</span><sup>o</sup>C
            </p>
            <img src="https:${current.condition.icon}" width="90" alt="...">
            <p class="main-color" id="weatherStatus">${
              current.condition.text
            }</p>
            <div class="group-icons d-flex">
                <div class="icon d-flex align-items-center gap-1 me-3">
                    <img src="./assets/images/icon-umberella@2x.png" alt="..." width="25">
                    <div class="umbrella-value text-gray">
                        ${current.gust_kph}%
                    </div>
                </div>
                <div class="icon d-flex align-items-center gap-1 me-3">
                    <img src="./assets/images/icon-wind@2x.png" alt="..." width="25">
                    <div class="wind-value text-gray">
                        ${current.wind_kph}km/h
                    </div>
                </div>
                <div class="icon d-flex align-items-center gap-1 me-3">
                    <img src="./assets/images/icon-compass@2x.png" alt="..." width="25">
                    <div class="compass-value text-gray">
                        East
                    </div>
                </div>

            </div>
        </div>
    </div>
    `;
}

function setValuesForNexDays(arr) {
  for (let i = 1; i < arr.length; i++) {
    const forecast = arr[i];
    let box = `
        <div class="card text-white col-lg-4">
            <div class="card-header text-center">
                <span>Saturday</span>
            </div>
            <div class="card-body d-flex align-items-center justify-content-center flex-column gap-3 text-center">

                <img src="${
                  "https:" + forecast.day.condition.icon
                }" class="d-block" alt="..." width="48">
                <div class="card-title">
                    <h5 class="fw-bold">
                        <span>${forecast.day.maxtemp_c}</span><sup>o</sup>C
                    </h5>
                    <p class="m-0 text-gray">${
                      forecast.day.mintemp_c
                    }<sup>o</sup></p>
                </div>
                <p class="main-color">${forecast.day.condition.text}</p>
            </div>
        </div>`;
    rowData.innerHTML += box;
  }
}
