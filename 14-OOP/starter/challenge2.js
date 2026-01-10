'use strict';

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    return (this.speed += 10);
  }

  brake() {
    return (this.speed -= 5);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    console.log(`set speed ${speed}`);
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);
// console.log(ford);

console.log(ford.speed);

console.log(`${ford.make} Current Speed: ${ford.accelerate()}`);

console.log(ford.speedUS);
ford.speedUS = 60;
console.log(ford.speed);

console.log(`${ford.make} Current Speed: ${ford.brake()}`);
