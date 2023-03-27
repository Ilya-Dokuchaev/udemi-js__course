// The old way
const btnScrollTo = document.querySelector('.btn--scroll-to')
const sectionOne = document.querySelector('#section--1')

/*btnScrollTo.addEventListener('click', (e) => {
 e.preventDefault()
 // to get coordinates of needed rectangle ⬇
 const s1coords = sectionOne.getBoundingClientRect()
 console.log(s1coords)//DOMRect {x: 0, y: 708, width: 1261, height: 1438.078125, top: 708, …}
 console.log('current scroll', window.pageXOffset, pageYOffset)//current scroll 0 399
 console.log('height and width',
 document.documentElement.clientHeight,
 document.documentElement.clientWidth)// height and width 708 1261

 // To implement scrolling
 window.scrollTo({
 left:0,
 top:s1coords.top+window.pageYOffset,
 behavior:'smooth'
 })
 })*/
// The modern vay
btnScrollTo.addEventListener('click', (e) => {
    sectionOne.scrollIntoView({behavior: 'smooth'})
})
// THIS IS PART 2 from event delegation 
document.querySelector('.nav__links').addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
})