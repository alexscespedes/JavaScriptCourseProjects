'use strict';

const image = document.createElement('img');

//
const createImage = function (imagePath) {
  return new Promise(function (resolve, reject) {
    image.src = imagePath;

    image.addEventListener('load', () => {
      document.querySelector('.images').appendChild(image);
      resolve(image);
    });

    image.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

createImage('/img/img-1.jpg').then(img => {
  wait(2)
    .then(() => {
      console.log('2 seconds have passed');
      img.style.display = 'none';
      return wait(2);
    })
    .then(() => {
      console.log('2 more seconds have passed');
      img.src = '/img/img-2.jpg';
      img.style.display = '';
      return wait(2);
    })
    .then(() => (img.style.display = 'none'));
});

// createImage('/img/img-1.jpg').then(img => (img.style.display = 'none'));

/*

createImage('/img/img-1.jpg')
  .then(() => {
    console.log('Image 1 loaded');
    wait(2).then(() => {
      console.log('2 seconds passed');
    });
  })
  .catch(err => {
    console.error('Error loading image:', err);
  });

*/
