'use strict';

const Person = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
};

// const calcAge = function (person) {
//   console.log(2037 - person.birthYear);
// };

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

Person.hey = function () {
  console.log('Hey there!');
};

Person.hey();

// Prototypes

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda);

console.log(jonas.hasOwnProperty('fullName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

///----------------------

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // get age() {
  //   return 2037 - this.birthYear;
  // }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods

  static hey() {
    console.log('Hey there!');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

jessica.greet();

///----------------------

// const walter = new PersonCl('walter', 1965);

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

PersonCl.hey();

/////////////----------------

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstname, birthYear) {
    this.firstname = firstname;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven.__proto__);
console.log(PersonProto.__proto__);

console.log(steven.__proto__ === PersonProto);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
console.log(sarah.__proto__);
sarah.calcAge();

/* Inheritance Between "Classes": Constructor Functions

// const Person = function (firstname, birthYear) {
//   this.firstname = firstname;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

const Student = function (firstname, birthYear, course) {
  Person.call(this, firstname, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstname} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

/* Inheritance Between "Classes": ES6 Classes

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first (super)!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const gabriella = new StudentCl('Gabriella Montez', 2007, 'Computer Science');
gabriella.introduce();
gabriella.calcAge();
*/

/* Inheritance Between "Classes": Object.create

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstname, birthYear, course) {
  PersonProto.init.call(this, firstname, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstname} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
*/

// Encapsulation: Private Class Fields and Methods

class Account {
  locale = navigator.language;
  bank = 'Bankist';
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this.movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.movements.push(250);
// acc1.movements.push(-140);
// acc1.deposit(250);
// acc1.withdraw(140);

acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements();

// acc1.requestLoan(1000);
// acc1.movements = [];
console.log(acc1);
// console.log(acc1.movements);
// acc1.#approveLoan(23);
