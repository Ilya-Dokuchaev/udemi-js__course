'use strict'
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//global variables
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const inputElArr = [inputDistance, inputCadence, inputDuration, inputElevation]

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)

    constructor(coords, distance, duration) {
        this.coords = coords // represented by an array of latitude and longitude [lat,lng]
        this.distance = distance // km/h
        this.duration = duration // in min
        this.calcSpeed()
        this.calcPace()
    }

    calcSpeed() {
        return this.speed = Number(Math.abs(this.distance / (this.duration / 60)).toPrecision(3))
    }

    calcPace() {
        return this.pace = Number(Math.abs(this.duration / this.distance).toPrecision(3))
    }
}

class Running extends Workout {
    type = 'running'

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence;
    }
}

class Cycling extends Workout {
    type = 'cycling'

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation;
    }
}

const run = new Running([0, 0], 2, 50, 1.2)

class App {
    #map;
    #markerEvent;
    #mapEvent;
    #workouts = []

    constructor() {
        // submitting the form and display the marker
        form.addEventListener('submit', this._newWorkout.bind(this))
        // changing the corresponding input fields depending on activity type
        inputType.addEventListener('change', this._toggleElevationField)
        this._getPosition()
    }

    _getPosition() {
        // To get the coords and map display
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
            // if the setting of not to show the location is on
            this._loadDefaultMap.bind(this),
            {enableHighAccuracy: true}
        )
    }

    _loadMap(position) {
        //The coords of user position
        const {latitude, longitude} = position.coords
        const coordsArray = [latitude, longitude]
        // Map centering at user position
        this.#map = L.map('map').setView(coordsArray, 16);
        // Loading map styles aka tiles and adding them to the map itself
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a' +
                ' href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
        // Marker of current user position
        L.marker(coordsArray)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
            }))
            .setPopupContent("You're somewhere here!")
            .openPopup()
        // Event handler of map clicks and form appearing
        this.#map.on('click', this._showForm.bind(this))

    }

    _loadDefaultMap() {
        alert('Could not get your position the service may not work correctly!')
        this.#map = L.map('map').setView([51.505, -0.09], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a' +
                ' href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        e.preventDefault()
        let workout;
        // Get data from form
        const type = inputType.value
        const distance = Number(inputDistance.value)
        const duration = Number(inputDuration.value)
        // getting the coords of click on map
        const {lat, lng} = this.#mapEvent.latlng
        // Check if the data is valid
        const validInputs = (...inputs) => inputs.every(el => Number.isFinite(el))
        const isPositive = (...inputs) => inputs.every(el => el > 0)

        // If workout is running create running
        if(type === 'running') {
            const cadence = Number(inputCadence.value)
            if(!validInputs(distance, duration, cadence) || !isPositive(distance, duration, cadence)) {
                return alert("You must put only the positive numbers to corresponding inputs")
            }
            workout = new Running([lat, lng], distance, duration, cadence)
        }

        // If it is a cycling create cycling
        if(type === 'cycling') {
            const elevation = Number(inputElevation.value)
            if(!validInputs(distance, duration, elevation) || !isPositive(distance, duration)) {
                return alert(`You must put only the positive numbers to corresponding inputs,\n except for the elevation it should be just a number`)
            }
            workout = new Cycling([lat, lng], distance, duration, elevation)
        }
        // Add new obj workout to workout array
        this.#workouts.push(workout)


        // Render marker on map and workout

        // display the marker
        this.#markerEvent = L.marker([lat, lng]).addTo(this.#map)
        this.#markerEvent.bindPopup(
            L.popup({
                maxWidth: 300,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            })
        )
            .setPopupContent(`
            Distance: ${workout.distance} km 
            Speed: ${workout.speed} km/h
            Duration: ${workout.duration} min
            `)
            .openPopup()

        //TODO remove form from workout list

        // clearing the input fields
        inputElArr.forEach(el => el.value = '')
    }
}

const app = new App()

