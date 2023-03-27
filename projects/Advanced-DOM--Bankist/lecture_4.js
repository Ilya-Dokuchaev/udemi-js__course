// DOM traversing

const h1 = document.querySelector('h1')

// Going down: child elem
console.log(h1.querySelectorAll('.highlight'))
/*0: span.highlight
 1: span.highlight
 length: 2
 [[Prototype]]:  NodeList
 */

console.log(h1.childNodes)
/*NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
 0: text
 1: comment
 2: text
 3: span.highlight
 4: text
 5: br
 6: text
 7: span.highlight
 8: text
 length: 9
 [[Prototype]]: NodeList*/
console.log(h1.children)
/*0: span.highlight
 1: br
 2: span.highlight
 length: 3
 [[Prototype]]: HTMLCollection
 */
//On that we can manipulate children elements
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color= 'orangered'

// Going up: Parent elements
console.log(h1.parentNode)// <div class= 'header__title'>...</div>
console.log(h1.parentElement)// <div class= 'header__title'>...</div>


// To get the closest

h1.closest('.header').style.background = 'var(--gradient-secondary)'

//querySelector() looks for children no matter how deep they are
// closest() looks for parents no matter how deep they are


// Sideways: siblings
console.log(h1.previousSibling)// Text{}
console.log(h1.nextSibling)// Text{...}

console.log(h1.previousElementSibling)//null
console.log(h1.nextElementSibling)// <h4>...</h4>

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el){
    if(el!==h1) {
        el.style.transform = 'scale(0.5)'
        el.style.background = 'var(--gradient-primary)'
    }
})