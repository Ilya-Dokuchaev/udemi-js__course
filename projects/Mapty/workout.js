class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)
    type;

    constructor(coordsPointsArr, distance, duration) {
        this.coordsPointsArr = coordsPointsArr // represented by an array of array latitude and
        // longitude
        // [lat,lng]
        this.distance = distance
        this.duration = duration// in min
        this.calcSpeed()
        this.calcPace()
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }

    calcSpeed() {
        return this.speed = Number(Math.abs(this.distance / (this.duration / 60)).toPrecision(3))
    }

    calcPace() {
        return this.pace = Number(Math.abs(this.duration / this.distance).toPrecision(3))
    }
}
export class Running extends Workout {
    type = 'running'

    constructor(coordsPointsArr, distance, duration, cadence) {
        super(coordsPointsArr, distance, duration)
        this.cadence = cadence;
        this._setDescription()
    }
}

export class Cycling extends Workout {
    type = 'cycling'

    constructor(coordsPointsArr, distance, duration, elevation) {
        super(coordsPointsArr, distance, duration)
        this.elevation = elevation;
        this._setDescription()
    }
}