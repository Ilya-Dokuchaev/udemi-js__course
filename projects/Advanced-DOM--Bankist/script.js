'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')

const openModal = function (e) {
    e.preventDefault()

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})

const handleHover = function (e) {
    if(e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')

        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this
        })
        logo.style.opacity = this
    }
}


nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

const obsCallback = function (entries) {
    const [entry] = entries
    if(!entry.isIntersecting) nav.classList.add('sticky')
    else {
        nav.classList.remove('sticky')
    }
}

const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`
}

const observer = new IntersectionObserver(obsCallback, obsOptions)

observer.observe(header)
// Reveal sections
const allSectionsEl = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
    const [entry] = entries

    if(!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden')

    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.25,
})

allSectionsEl.forEach(el => {
    sectionObserver.observe(el)
    el.classList.add('section--hidden')
})

// Lazy load images
const imgTargets = document.querySelectorAll('img[data-src]')

const imgLoad = function (ent, observer) {
    const [entry] = ent
    if(!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src

    entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const imageObserver = new IntersectionObserver(imgLoad, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})
imgTargets.forEach(img => imageObserver.observe(img))


// Slider

const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotsContainer = document.querySelector('.dots')



let currentSlide = 0
const maxSlide = slides.length - 1
//creating dots

const createDots = function (){
    slides.forEach((_,i)=>{
        dotsContainer.insertAdjacentHTML('beforeend',
            `<button class ='dots__dot' data-slide ='${i}'></button>`
        )
    })
}
// Activate dots
const activateDots = function (slide){
    document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide = '${slide}']`).classList.add('dots__dot--active')
}
const goToSlide = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - slide) * 100}%)`
    })
}
//initial state
createDots()
goToSlide(0)
activateDots(0)
// nextSlide
const nextSlide = function () {
    if(currentSlide === maxSlide) {
        currentSlide = 0
    } else {
        currentSlide++
    }
    goToSlide(currentSlide)
    activateDots(currentSlide)
}
//prevSlide
const prevSlide = function () {
    if(currentSlide === 0) {
        currentSlide = maxSlide
    } else {
        currentSlide--
    }
    goToSlide(currentSlide)
    activateDots(currentSlide)
}
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click',prevSlide)

document.addEventListener('keydown',(e)=>{
    e.key==='ArrowLeft'&&prevSlide()
    e.key==='ArrowRight'&&nextSlide()
})

dotsContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('dots__dot')){
        const {slide}= e.target.dataset
        goToSlide(slide)
        activateDots(slide)
    }
})