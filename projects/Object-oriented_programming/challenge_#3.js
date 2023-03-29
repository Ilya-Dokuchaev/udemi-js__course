/*
 GOOD LUCK 😀
 */
const Car = function (make, speed) {
    this.make = make
    this.speed = speed
}
Car.prototype.accelerate = function () {
    return this.speed += 10
}
Car.prototype.brake = function () {
    return this.speed -= 5
}
// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
const EV = function (make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge
}
EV.prototype = Object.create(Car.prototype)
EV.prototype.constructor = EV
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo
}
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
EV.prototype.accelerate = function () {
    this.speed += 20
    this.charge -= 1
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`)
}
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉
const tesla = new EV('Tesla', 120, 23)
console.log(tesla)
tesla.accelerate()
tesla.brake()
console.log(tesla)
tesla.chargeBattery(99)
tesla.accelerate()
// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
