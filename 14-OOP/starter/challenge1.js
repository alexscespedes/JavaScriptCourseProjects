'use strict';

// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const civic = new Car('Honda', 90);
console.log(civic);

// 2.
Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

console.log(civic.accelerate());

// 3.
Car.prototype.brake = function () {
  return (this.speed -= 5);
};

console.log(civic.brake());

// 4.
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

let count = 0;

while (count <= 5) {
  console.log(`${car1.make} Current Speed: ${car1.accelerate()}`);
  console.log(`${car1.make} Braking: ${car1.brake()}`);
  count++;
}

while (count <= 5) {
  console.log(`${car2.make} Current Speed: ${car2.accelerate()}`);
  console.log(`${car2.make} Braking: ${car2.brake()}`);
  count++;
}

/*

console.log(`${car1.make} Current Speed: ${car1.accelerate()}`);

console.log(`${car1.make} Current Speed: ${car1.accelerate()}`);

console.log(`${car1.make} Current Speed: ${car1.accelerate()}`);

console.log(`${car2.make} Current Speed: ${car2.accelerate()}`);

console.log(`${car1.make} Current Speed: ${car1.brake()}`);

console.log(`${car2.make} Current Speed: ${car2.accelerate()}`);

console.log(`${car2.make} Current Speed: ${car2.brake()}`);
*/
