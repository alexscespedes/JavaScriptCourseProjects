const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1.
/* my solution.
const husky = breeds.find(dog => dog.breed === 'Husky');
const huskyWeight = husky.averageWeight;
*/

// best approach
const huskyWeight = breeds.find(dog => dog.breed === 'Husky').averageWeight;

// 2.
const dogBothActivities = breeds.find(
  dog => dog.activities.includes('running') && dog.activities.includes('fetch')
);

// 3.
const allActivities = breeds.flatMap(dog => dog.activities);

// 4.
const uniqueActivities = [...new Set(breeds.flatMap(dog => dog.activities))];

// 5.
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter(dog => dog.activities.includes('swimming'))
      .flatMap(dog => dog.activities)
      .filter(activity => activity !== 'swimming')
  ),
];

console.log(swimmingAdjacent);

// 6.
console.log(breeds.every(dog => dog.averageWeight > 10));

// 7.
console.log(breeds.some(dog => dog.activities.length >= 3));

// Bonus
const fetchWeights = breeds
  .filter(dog => dog.activities.includes('fetch'))
  .map(dog => dog.averageWeight);

const heaviestAverageWeight = Math.max(...fetchWeights);
console.log(heaviestAverageWeight);
