'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const BASE_URL = 'https://api.locationiq.com/v1/reverse';
// const access_token = 'pk.c641c158fe6e6322dd0ef109a2388106';

/*
const whereAmI = function (lat, lng) {
  console.log(lat, lng);

  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  ).then(response => {
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    return response.json();
  });
  // .catch(err => alert(`Something went wrong! ${err.message} Try again!`));
};

const data = whereAmI(18.4882036, -69.847828).then(data => data.countryName);
console.log(data);

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=18.4882036&longitude=-69.847828

// https://api.locationiq.com/v1/reverse?key=${access_token}&lat=${lat}&lon=${lng}&format=json
*/

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

whereAmI(18.4882036, -69.847828);

// whereAmI(18.4882036, -69.847828).then(data => console.log(data.countryName));

// btn.addEventListener('click', function () {
//   whereAmI(18.4882036, -69.847828).then(data => console.log(data.countryName));
// });
