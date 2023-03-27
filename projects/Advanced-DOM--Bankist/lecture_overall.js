// Lifecycle events in DOM

document.addEventListener('DOMContentLoaded', function (ev) {
    console.log('HTML parsed and DOM tree built!', ev)
})

// Since we load scripts before closing tag of body we actually don't need to wrap all the
// script into DONContentLoaded this event is fired since HTML is parsed

// to listen of all page loading 👇
window.addEventListener('load', (ev) => {
    console.log('Page fully loaded', ev)
})
/*The event of user close page is fired before the tab is closed
 This will get the pop-up of "Are you sure you want to leave the page? All unsaved changes will
 be lost"*/
window.addEventListener('beforeunload', (ev) => {
    //to get this in all browser support we use preventDefault()
    ev.preventDefault()
    console.log(ev)
    // to get things working we need to 👇
    ev.returnValue = ''
})
// The different ways to load the script in browser parser
// Two screenshots
// 📷
// 📷