'use strict'
//TODO ability to edit workouts
//TODO sort by distance,type,duration
//TODO real alert and messages and input confirmation
//TODO show all workouts - zoom out of min,max,lng/lat
//TODO more UI friendly

//global variables of HTML elements
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteALlEl = document.querySelector('.btn__delete')
// to clear all inputs at once
const inputElArr = [inputDistance, inputCadence, inputDuration, inputElevation]

//TODO find a way to not make it spaghetti-code
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)
    type;

    constructor(coords, distance, duration) {
        this.coords = coords // represented by an array of latitude and longitude [lat,lng]
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
    #markerEvents = [];
    #mapEvent;
    // noinspection JSMismatchedCollectionQueryUpdate
    #workouts = [];
    #mapZoom = 16
    #markersArr = [];
    #polyline;
    #polilynes = [];
    #distance = 0;

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
        deleteALlEl.addEventListener('click', this._deleteAllWork.bind(this))
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
        this.#workouts.forEach(el => {
            this._renderWorkoutMarker(el)
        })
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
        //the workaround of displaying temporary marker
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDuration.focus()
        this._showTemp()
        this._buildRoute()
        this._showRoute()
        //cancel available when form shows up
        form.addEventListener('keydown', (evt) => {
            if(evt.key === 'Escape') {
                form.classList.add('hidden')
                this._hideTemp()
                this._removeRoute()
                this._clearMarkersArr()
            }
        })
    }

    _showTemp() {
        this.#markerEvent = L.marker(this.#mapEvent.latlng).addTo(this.#map)
        this.#markersArr.push(this.#markerEvent)
    }

    _hideTemp() {
        this.#markersArr.map(el => el.remove())
    }

    _clearMarkersArr() {
        this.#markersArr.splice(0)
    }

    // draw a shape of workout
    _buildRoute() {
        const latlng = []
        this.#markersArr.forEach((_, i) => {
            const {lat, lng} = this.#markersArr[i]._latlng
            latlng.push([lat, lng])
        })
        this.#polyline = L.polyline(latlng, {color: 'red'});
        this.#polilynes.push(this.#polyline)
        if(latlng.length === 1) return
        const [[lat1, lon1], [lat2, lon2]] = latlng
        this.#distance = Number((this.#distance + this._calculateDistance(lat1, lon1, lat2, lon2)).toFixed(2))
        inputDistance.textContent = `${this.#distance} km`
    }

    _calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // Distance in km
        return R * c;

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }
    }

    _showRoute() {
        this.#polyline.addTo(this.#map)
    }

    _removeRoute() {
        this.#polilynes.forEach(el => el.removeFrom(this.#map))
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
        const duration = Number(inputDuration.value)
        // getting the coords of click on map
        const {lat, lng} = this.#markersArr[0]._latlng
        // Check if the data is valid
        const validInputs = (...inputs) => inputs.every(el => Number.isFinite(el))
        const isPositive = (...inputs) => inputs.every(el => el > 0)
        // If workout is running create running
        if(type === 'running') {
            const cadence = Number(inputCadence.value)
            if(!validInputs(duration, cadence) || !isPositive(duration, cadence)) {
                return alert("You must put only the positive numbers to corresponding inputs")
            }
            workout = new Running([lat, lng], this.#distance, duration, cadence)
        }
        // If it is a cycling create cycling
        if(type === 'cycling') {
            const elevation = Number(inputElevation.value)
            if(!validInputs(duration, elevation) || !isPositive(duration)) {
                return alert(`You must put only the positive numbers to corresponding inputs,\n except for the elevation it should be just a number`)
            }
            workout = new Cycling([lat, lng], this.#distance, duration, elevation)
        }
        // Add new obj workout to workout array
        this.#workouts.push(workout)
        // Render marker on map and workout
        // display the marker
        this._renderWorkoutMarker(workout)
        //Render workout on list
        this._renderWorkoutOnList(workout)
        this._clearMarkersArr()
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
        this.#markerEvent = L.marker(workout.coords)
        this.#markerEvent.addTo(this.#map)
        workout.markerCoords = this.#markerEvent._leaflet_id
        this.#markerEvents.push(this.#markerEvent)
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
        this.#map.setView(workout.coords, this.#mapZoom, {
            animation: true, pan: {
                duration: 1,
            }
        })
    }

    //The deleting option of specific workout
    _deleteSpecWork(e) {
        const closeEl = e.target.closest('.btn__workout--close')
        if(!closeEl) return
        const workout = this.#workouts.find(el => el.id === closeEl.dataset.id)
        const workoutEl = document.querySelector(`.workout[data-id='${workout.id}']`)
        this.#markerEvent = this.#markerEvents.find(el => el._leaflet_id === workout.markerCoords)
        this.#markerEvents.splice(this.#markerEvents.findIndex(el => el === this.#markerEvent), 1)
        workoutEl.remove()
        closeEl.remove()
        this._hideTemp()
        this.#markerEvent.remove()
        this.#workouts.splice(this.#workouts.findIndex(el => el.id === workout.id), 1)
        this._setLocalStorage()
    }

    // delete all workouts at once
    _deleteAllWork() {
        const allWorkouts = document.querySelectorAll('.workout')
        const allCloseEl = document.querySelectorAll('.btn__workout--close')
        allWorkouts.forEach(el => el.remove())
        allCloseEl.forEach(el => el.remove())
        this.#markerEvents.forEach(el => el.remove())
        this.#markerEvents = []
        this.#workouts = []
        this._setLocalStorage()
        this._hideTemp()
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
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }
}

// TODO get a mobile version
const app = new App()

