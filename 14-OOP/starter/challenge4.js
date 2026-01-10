'use strict';

// 1.

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    // console.log(`${this.make} accelerate at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    // console.log(`${this.make} brake at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    console.log(`set speed ${speed}`);
    this.speed = speed * 1.6;
  }

  getResult() {
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
}

class ElectricCar extends Car {
  // 2.
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    return this;
  }

  getResult() {
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }`
    );
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new ElectricCar('Rivian', 120, 23);

// 3.
// rivian.accelerate().chargeBattery(90).brake().accelerate().getResult();

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
