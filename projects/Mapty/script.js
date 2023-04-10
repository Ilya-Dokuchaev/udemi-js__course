'use strict'
//TODO ability to edit workouts
//TODO delete all workouts at once
//TODO sort by distance,type,duration
//TODO real alert and messages and input confirmation
//TODO show all workouts - zoom out of min,max,lng/lat
//TODO draw a shape of workout
//TODO more UI friendly

//global variables of HTML elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// to clear all inputs at once
const inputElArr = [inputDistance, inputCadence, inputDuration, inputElevation]

//TODO find a way to not make it spaghetti-code
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)
    type;

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
    #workouts = [];
    #mapZoom = 16

    constructor() {
        this._getPosition()
        this._getLocalStorage()
        //------------------------------------------------------------------------------------------
        //Event Listeners
        // submitting the form and display the marker
        form.addEventListener('submit', this._newWorkout.bind(this))
        // changing the corresponding input fields depending on activity type
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this))
        containerWorkouts.addEventListener('click', this._deleteSpecWork.bind(this))
        //TODO the delete option of specific workout dont forget to clear the whole locale
        // storage and setting it back again at least
    }

    _getPosition() {
        // To get the coords and map display
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), // if the setting of not to show the location is on
            this._loadDefaultMap.bind(this), {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 15000,
            })
    }

    _loadMap(position) {
        //The coords of user position
        const {latitude, longitude} = position.coords
        const coordsArray = [latitude, longitude]
        // Map centering at user position
        // Loading map styles aka tiles and adding them to the map itself
        this.#map = L.map('map').setView(coordsArray, this.#mapZoom);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a' + ' href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
        //render marker from local storage
        this.#workouts.forEach(el => this._renderWorkoutMarker(el))
        // Marker of current user position
        //TODO marker change
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
        //TODO the workaround of displaying temporary marker
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()
        //cancel available when form shows up
        document.addEventListener('keydown', (evt) => {
            if(evt.key === 'Escape') form.classList.add('hidden')
        })
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
        //setting the localStorage
        this._setLocalStorage()
    }

    _renderWorkoutOnList(workout) {
        //TODO make list scrollable obviously
        const html = `
            <div class="workout__item">
                <li class="workout workout--${workout.type}" data-id="${workout.id}">
                  <h2 class="workout__title">${workout.description}</h2>
                  <button class="btn btn__workout btn__workout--edit btn--small"><ion-icon name="pencil-outline"></ion-icon></button>
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
                </li>
                <button class="btn btn__workout btn__workout--close btn--small" data-id='${workout.id}'><ion-icon class="close-circle" name="close-circle-outline"></ion-icon></button>
            </div>
        `
        form.insertAdjacentHTML('afterend', html)
    }

    _renderWorkoutMarker(workout) {
        //TODO corresponding marker change
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

    _moveToPopUp(e) {
        const workoutEl = e.target.closest('.workout')
        if(!workoutEl) return;
        const workout = this.#workouts.find(el => el.id === workoutEl.dataset.id)
        console.log(workout)
        this.#map.setView(workout.coords, this.#mapZoom, {
            animation: true, pan: {
                duration: 1,
            }
        })
    }

    _deleteSpecWork(e) {
        const closeEl = e.target.closest('.btn__workout--close')
        if(!closeEl) return
        const workout = this.#workouts.findIndex(el => el.id === closeEl.dataset.id)
        this.#workouts.splice(workout, 1)
        this._renderWorkoutOnList()
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'))
        if(!data) return
        //fix the localStorage prototype chain
        this.#workouts = data.map(el => {
            return Object.assign(el.type === 'running' ? new Running() : new Cycling(), el)
        })
        this.#workouts.forEach(el => {
            this._renderWorkoutOnList(el)
        })
        console.log(this.#workouts)
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }
}

// TODO get a mobile version
const app = new App()

