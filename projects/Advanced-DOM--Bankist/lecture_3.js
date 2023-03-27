// # Event listeners capturing and bubbling
// 📷

const randomNum = function (max,min){
    return Math.floor(Math.random()*(max-min)+min)
}
const randomColor = ()=>`rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`

document.querySelector('.nav__link').addEventListener('click',function (e){
    this.style.backgroundColor = randomColor()
    console.log('LINK',e.target)//LINK <a class = 'nav__link'></a>
})
document.querySelector('.nav__links').addEventListener('click',function (e){
    this.style.backgroundColor = randomColor()
    console.log('CONTAINER',e.target)// CONTAINER <a class = 'nav__link'></a>
    e.stopPropagation()
})
document.querySelector('.nav').addEventListener('click',function (e){
    this.style.backgroundColor = randomColor()
    console.log('NAV',e.target)// NAV <a class = 'nav__link'></a>
    console.log(e.currentTarget)// <nav class = 'nav'></nav>
})
// Depending on which element the event occurs the target will be the element itself on all
// bubbling☝
//To get the current target of event use e.currentTarget, EX: look at NAV☝


// To stop propagation use e.stopPropagation ☝ look at CONTAINER. NOTE: not a good idea!!

// to change the event bubbling to event capturing use the 3d param in EventListener⬇
// Now this element events are happening in capturing mode and will occur as the event travels
// forward DOM tree
document.querySelector('.nav').addEventListener('click',function (e){
    this.style.backgroundColor = randomColor()
    console.log('NAV',e.target)// NAV <a class = 'nav__link'></a>
    console.log(e.currentTarget)// <nav class = 'nav'></nav>
},true)