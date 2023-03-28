// GOOD LUCK 😀
// 1. Re-create challenge 1, but this time using an ES6 class;
class Car {
    constructor(make, speed) {
        this.make = make
        this.speed = speed
    }

    get speedUS() {
        return this.speed / 1.6 + ' mi/h'
    }

    set speedUS(speed) {
        return this.speed = speed * 1.6
    }

    accelerate() {
        this.speed += 10
        return `${this.make}'s speed is ${this.speed + 10} km/h`
    }

    brake() {
        this.speed -= 5
        return `${this.make}'s speed is ${this.speed - 5} km/h`
    }
}

// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// TODO
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
// TODO

// DATA CAR 1: 'Ford' going at 120 km/h
const ford = new Car('Ford', 120)
console.log(ford.speedUS)
console.log(ford.accelerate())
console.log(ford.brake())
console.log(ford.brake())
ford.speedUS = 50
console.log(ford.speed)
