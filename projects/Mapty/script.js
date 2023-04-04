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


class App {
    #map;
    #markerEvent;
    #mapEvent;
    constructor() {
        // submitting the form and display the marker
        form.addEventListener('submit', this._newWorkout.bind(this))
        // changing the corresponding input fields depending on activity type
        inputType.addEventListener('change',this._toggleElevationField)
        this._getPosition()
    }

    _getPosition() {
        // To get the coords and map display
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
            // if the setting of not to show the location is on
            this._loadDefaultMap.bind(this)
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
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
        this.#map.setView([51.505, -0.09], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        // getting the coords of click on map
        const {lat, lng} = this.#mapEvent.latlng
        // display the marker
        this.#markerEvent = L.marker([lat, lng]).addTo(this.#map)
        form.classList.remove('hidden')
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        e.preventDefault()
        // clearing the input fields
        inputElArr.forEach(el => el.value = '')
        this.#markerEvent.bindPopup(
            L.popup({
                maxWidth: 300,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
            .setPopupContent('Workout')
            .openPopup()
    }
}

const app = new App()

