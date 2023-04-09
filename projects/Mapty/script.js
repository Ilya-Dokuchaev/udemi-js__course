'use strict'

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

class Running extends Workout {
    type = 'running'

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence;
        this._setDescription()
    }
}

class Cycling extends Workout {
    type = 'cycling'

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation;
        this._setDescription()
    }
}

class App {
    #map;
    #markerEvent;
    #mapEvent;
    // noinspection JSMismatchedCollectionQueryUpdate
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
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), // if the setting of not to show the location is on
            this._loadDefaultMap.bind(this), {enableHighAccuracy: true})
    }

    _loadMap(position) {
        //The coords of user position
        const {latitude, longitude} = position.coords
        const coordsArray = [latitude, longitude]
        // Map centering at user position
        this.#map = L.map('map').setView(coordsArray, 16);
        // Loading map styles aka tiles and adding them to the map itself
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a' + ' href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
        // Marker of current user position
        L.marker(coordsArray)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false, closeOnClick: false,
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
            attribution: '&copy; <a' + ' href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
    }

    _hideForm() {
        form.style.display = 'none'
        form.classList.add('hidden')
        setTimeout(() => form.style.display = 'grid', 1000)
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
        this._renderWorkoutMarker(workout)
        //Render workout on list
        this._renderWorkoutOnList(workout)
        // clearing the input fields
        inputElArr.forEach(el => el.value = '')
        // remove form from workout list
        this._hideForm()
    }

    _renderWorkoutOnList(workout) {
        const html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡</span>
            <span class="workout__value">${workout.type === 'running' ? workout.pace : workout.speed}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'min/km' : 'km/h'}</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🦶' : '⛰'}</span>
            <span class="workout__value">${workout.type === 'running' ? workout.cadence : workout.elevation}</span>
            <span class="workout__unit">${workout.type === 'running' ? 'spm' : 'm'}</span>
          </div>
        </li>`
        form.insertAdjacentHTML('afterend', html)
    }

    _renderWorkoutMarker(workout) {
        this.#markerEvent = L.marker(workout.coords).addTo(this.#map)
        this.#markerEvent.bindPopup(L.popup({
            maxWidth: 300,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
            .setPopupContent(`
               ${workout.type === 'running' ? '🏃' : '🚴'}
               ${workout.description}
            `)
            .openPopup()

    }
}

const app = new App()

