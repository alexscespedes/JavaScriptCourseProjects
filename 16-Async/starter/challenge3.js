'use strict';

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    // Image 1
    let img = await createImage('/img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    console.log('after async await 1');
    img.style.display = 'none';

    // Image 2
    img = await createImage('/img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    console.log('after async await 2');
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));

    const data = await Promise.all(imgs);

    data.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

loadAll(['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg']);
