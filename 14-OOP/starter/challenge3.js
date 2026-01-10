'use strict';

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

const ElectricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
  //   this.chargeBattery = function (chargeTo) {
  //     return (this.charge = chargeTo);
  //   };
};

ElectricCar.prototype = Object.create(Car.prototype);

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}`
  );
};

const tesla = new ElectricCar('Tesla', 120, 23);
tesla.accelerate();
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
