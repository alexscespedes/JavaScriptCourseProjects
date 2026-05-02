'use strict';

const wait = async function (seconds) {
  return await new Promise(function (resolve) {
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
    const img1 = await createImage('/img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    console.log('after async await 1');
    img1.style.display = 'none';

    // Image 2
    const img2 = await createImage('/img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    console.log('after async await 2');
    img2.style.display = 'none';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  const imgs = imgArr.map(img => createImage(img));
  const data = await Promise.all(imgs);
  data.map(img => {
    img.classList.add('parallel');
    console.log(img);
  });
  // const newData = data.map(img => img.classList.add('paralell'));
  // newData.map(img => console.log(img));
};

loadAll(['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg']);
