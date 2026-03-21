'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const access_token = 'pk.c641c158fe6e6322dd0ef109a2388106';

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(2)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
   </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v2/name/${encodeURIComponent(country)}`,
  );
  request.send();

  request.addEventListener('load', function () {
    // Object destructuring
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country
    renderCountry(data);

    // Get Neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call neighbour
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

const country = 'Dominican Republic';
// getCountryAndNeighbour(country);
getCountryAndNeighbour('usa');
// getCountryData('usa');
*/

const country = 'Dominican Republic';
// const request = fetch(
//   `https://restcountries.com/v2/name/${encodeURIComponent(country)}`,
// );
// console.log(request);

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country not found ${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v2/name/${encodeURIComponent(country)}`,
    'Country not found',
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found',
      );
    })

    // then --> succeed
    .then(data => renderCountry(data, 'neighbour'))
    // then --> rejected
    .catch(err => {
      console.error(`${err} !!!`);
      renderError(`Something went wrong! ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function (lat, lng) {
  console.log(lat, lng);

  fetch(
    `https://api.locationiq.com/v1/reverse?key=${access_token}&lat=${lat}&lon=${lng}&format=json`,
  )
    .then(response => {
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      return response.json();
    })
    // .then(data => getCountryData(data.country))
    .then(data => getCountryData(data.address.country))
    .catch(err => alert(`Something went wrong! ${err.message} Try again!`))
    .finally(() => console.log('finished'));
};

// whereAmI(18.4882036, -69.847828).then(data => console.log(data.countryName));

// btn.addEventListener('click', function () {
//   whereAmI(18.4882036, -69.847828).then(data => console.log(data.countryName));
// });

btn.addEventListener('click', function () {
  whereAmI(18.4882036, -69.847828);
});

// const countryT = console.log(countryT);
