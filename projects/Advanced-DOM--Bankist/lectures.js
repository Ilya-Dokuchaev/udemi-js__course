//# Selecting Creating and Deleting HTML Elements
//--------# Selection
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)
// one el
document.getElementById('section--1')
const headerEl = document.querySelector('.header')
// NodeList collection
const allSections = document.querySelectorAll('.section')
console.log(allSections)
//HTMLCollection
const allButtons = document.getElementsByTagName('button')
console.log(allButtons)
//HTMLCollection
console.log(document.getElementsByClassName('btn'))


//-----------#Creating and inserting elements

// insertAdjacentHTML

const message = document.createElement('div')
// works the same as selecting : message now is just an object
message.classList.add('cookie-message')
message.innerHTML = `<span>We use cookies for improved functionality and analytics.</span>
<button class="btn btn--close-cookie">Got it!</button>`

headerEl.append(message)//won't work cause ⬇ will overwrite
// header.append(message)
// instead use
// header.append(message.cloneNode(true))
// also there's a few methods that do almost taxdxhe same thing

// header.before(message)
// header.after(message)

//-----------#Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
    message.remove()
})