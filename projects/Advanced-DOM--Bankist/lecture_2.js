//# Styles Attributes and Classes

message.style.backgroundColor = '#37383d'// will set an inline style for message
message.style.width = '100%'// same as above
console.log('------')//divider
console.log(message.style.color)// will print an empty log
//because it's a computed style not inline
console.log(message.style.backgroundColor)//rgb(55, 56, 61)

// to get styles that are computed we use ⬇
console.log(getComputedStyle(message).color)//rgb(187, 187, 187)
console.log(getComputedStyle(message).height)//50px

// Then we can do some things with that values inside Javascript
message.style.height = Number.parseFloat/*we need that because its computed value is a string*/(
   getComputedStyle(message).height, 10
) + 30 + 'px'


//  # Changing the css variables

/*:root {
  --color-primary: #5ec576;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #4bbb7d;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03);
}*/
// *:root === documentElement

// document.documentElement.style.setProperty('--color-primary','orangered')
// this will change custom css variable all over the place


// # Attributes

// Standard attr
const logo = document.querySelector('.nav__logo')

console.log(logo.alt)//Bankist logo
console.log(logo.className)//nav__logo
// ⬇ Is an absolute ref
console.log(logo.src)//http://127.0.0.1:8080/img/logo.png
// this works only with standard HTML elements attributes
// Also we can set standard attr by just ⬇
logo.alt = "Something cool happened - it's logo"
console.log(logo.alt)//Something cool happened - it's logo

// Non-standard attr

// console.log(logo.designer)//undefined WON'T WORK
console.log(logo.getAttribute('designer'))//Jonas
// To set custom attr ⬇
logo.setAttribute('designer','Me, myself and I')
console.log(logo.getAttribute('designer'))//Me, myself and I

console.log(logo.src)// to get a relative ref : http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute('src'))//img/logo.png

// Data attr
// used to store data values inside client-side, always starts in HTML with data- keyword
// in JS file we call them in camelCase ⬇
/*data-version-number="3.0"*/
console.log(logo.dataset.versionNumber)//3.0

//Classes
logo.classList.add('c'/*we can pass multiple classes*/,'j')
logo.classList.remove('c'/*we can pass multiple classes*/,'j')
logo.classList.replace('c'/*second param is new className*/,'j')
logo.classList.toggle('c')
logo.classList.contains('c')



