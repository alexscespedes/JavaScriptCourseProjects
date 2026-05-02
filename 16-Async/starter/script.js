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
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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

//const country = 'Dominican Republic';
// getCountryAndNeighbour(country);
//getCountryAndNeighbour('usa');
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

// btn.addEventListener('click', function () {
//   getCountryData(country);
// });

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotery draw is happening!!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN $$');
    } else {
      reject(new Error('You lose...'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err),
// );

/*
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);

      return fetch(
        `https://restcountries.com/v2/name/${encodeURIComponent(country)}`,
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} !`));
};

// whereAmI(18.4882036, -69.847828);

btn.addEventListener('click', whereAmI);
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Async/Await

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const responseGeo = await fetch(
      `https://api.locationiq.com/v1/reverse?key=${access_token}&lat=${lat}&lon=${lng}&format=json`,
    );
    if (!responseGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await responseGeo.json();

    // Country data
    const response = await fetch(
      `https://restcountries.com/v2/name/${encodeURIComponent(dataGeo.address.country)}`,
    );
    if (response.status != 200) {
      throw new Error('Problem getting contry');
    }
    const data = await response.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.address.city}, ${dataGeo.address.country}`;
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

/*
console.log('1: Will get location');

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} !`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${err.message} !`);
  }
  console.log('3: Finished getting location');
})();
*/

/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(
      `https://restcountries.com/v2/name/${encodeURIComponent(c1)}`,
    );
    const [data2] = await getJSON(
      `https://restcountries.com/v2/name/${encodeURIComponent(c2)}`,
    );
    const [data3] = await getJSON(
      `https://restcountries.com/v2/name/${encodeURIComponent(c3)}`,
    );

    console.log([data1.capital, data2.capital, data3.capital]);
    ------
    // Promise.all
    const data = await Promise.all([
      await getJSON(
        `https://restcountries.com/v2/name/${encodeURIComponent(c1)}`,
      ),
      await getJSON(
        `https://restcountries.com/v2/name/${encodeURIComponent(c2)}`,
      ),
      await getJSON(
        `https://restcountries.com/v2/name/${encodeURIComponent(c3)}`,
      ),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.error(error);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

// Promise.race
/*
(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/${encodeURIComponent('italy')}`),
    getJSON(`https://restcountries.com/v2/name/${encodeURIComponent('egypt')}`),
    getJSON(
      `https://restcountries.com/v2/name/${encodeURIComponent('mexico')}`,
    ),
  ]);
  console.log(response[0]);
})();


const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, seconds * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/${encodeURIComponent('italy')}`),
  timeout(0.1),
])
  .then(response => console.log(response[0]))
  .catch(err => console.error(err));
*/

/*
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(response => console.log(response))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(response => console.log(response))
  .catch(err => console.error(err));
*/
