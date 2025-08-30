/* CHALLENGE #1
const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const arrCopyJulia = dogsJulia.slice();
  arrCopyJulia.splice(0, 1);
  arrCopyJulia.splice(-2);
  //const updatedDogsData = [...arrCopyJulia.splice(1, 2), ...dogsKate];
  const updatedDogsData = [...arrCopyJulia, ...dogsKate];
  updatedDogsData.forEach(function (age, index) {
    if (age >= 3) {
      console.log(`Dog number ${index} is an adult and is ${age} years old`);
    } else if (age < 3) {
      console.log(
        `Dog number ${index} is still a puppy and is ${age} years old`
      );
      console.log();
    } else if (age <= 0) {
      console.log('Invalid data');
    }
  });
};

checkDogs(juliaData1, kateData1);
checkDogs(juliaData2, kateData2);

// console.log(juliaData.splice(1, 2));
*/

// CHALLENGE #2
const juliaData = [5, 2, 4, 1, 15, 8, 3];
const kateData = [16, 6, 10, 5, 6, 1, 4];

//note: deep in the doc per each method

const calcAverageHumanAge = function (array) {
  // Task 1: with Map method
  const humanAge = array.map(dogAge => {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });

  // Alternative (Teacher) - Map method
  //array.map(age => age <= 2 ? 2 * age : 16 + age * 4);

  // Task 2: with Filter method
  const adultDogs = humanAge.filter(age => age >= 18);

  // Task 3: with Reduce
  return adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;

  //Alternative (Teacher) - Reduce method
  /*const average = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  */
};

// console.log(calcAverageHumanAge(juliaData));

// CHALLENGE #3
const calcAverageHumanAgeArrowFunction = array =>
  array
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAgeArrowFunction(kateData));
