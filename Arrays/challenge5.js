// Test DATA:

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Project setup
// const checkEatingTooMuchTooLittle = function (dog) {
//   if (dog.curFood > dog.recFood) {
//     return `The dog of ${dog.owners} is eating too much.`;
//   } else {
//     return `The dog of ${dog.owners} is eating too little.`;
//   }
// };

// const checkIfEatingTooMuch = function (dog) {
//   if (dog.curFood > dog.recFood) {
//     return true;
//   } else {
//     return false;
//   }
// };

const checkRecommendedAmountFood = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
/*
const recommendedDogFood = weight => weight ** 0.75 * 28;

const dogWeight = 22;
const currentDogPortion = 250;

const checkTenPercentRangePortion = function () {
  if (
    currentDogPortion > recommendedDogFood(dogWeight) * 0.9 &&
    currentDogPortion < recommendedDogFood(dogWeight) * 1.1
  ) {
    return 'Portion between 90% and 110% of the recommended portion';
  } else {
    return 'Current portion food is larger or too little than the recommended portion';
  }
};

console.log(recommendedDogFood(dogWeight));
console.log(checkTenPercentRangePortion());
*/

// 1.

// Without Mutating (Best practice)
/*
const dogExtended = dogs.map(dog => ({
  ...dog,
  recFood: dog.weight ** 0.75 * 28,
}));

console.log(dogExtended);
console.log(dogs);
*/
// Mutating
dogs.forEach(dog => (dog.recFood = Math.floor(dog.weight ** 0.75 * 28)));
// console.log(dogs);

2;

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(sarahDog);
// console.log(
//   `Sarah's dog eats too ${
//     sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'
//   }`
// );

// 3.
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const ownersTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// console.log(ownersTooMuch);
// console.log(ownersTooLittle);

// 4.

// console.log(`${ownersTooMuch.join(' and ')}'s dogs eat too much`);
// console.log(`${ownersTooLittle.join(' and ')}'s dogs eat too little`);

// 5;
// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6;
// console.log(dogs.every(dog => checkRecommendedAmountFood(dog)));

// 7.
const dogsEatingWell = dogs.filter(dog => checkRecommendedAmountFood(dog));
// console.log(dogsEatingWell);

// 8.

// --- GROUP BY ---

const dogsGroupedByPortion = Object.groupBy(dogs, dog => {
  if (dog.curFood > dog.recFood) {
    return 'tooMuch';
  } else if (dog.curFood < dog.recFood) {
    return 'tooLittle';
  } else {
    return 'exact';
  }
});

// console.log(dogsGroupedByPortion);

// 9.
const dogsGroupedByNumberOfOwners = Object.groupBy(
  dogs,
  dog => `${dog.owners.length}--owners`
);

// console.log(dogsGroupedByNumberOfOwners);

// 10.
const dogsSorted = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
