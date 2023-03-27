// Selecting elements
const  tabs  = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click',function (ev){
    const clicked = ev.target.closest('.operations__tab')
    //Guard clause
    if(!clicked)return
    // Remove active classes everywhere
    tabs.forEach((t)=>t.classList.remove('operations__tab--active'))
    tabsContent.forEach((c)=>c.classList.remove('operations__content--active'))
    // Activate tab
    clicked.classList.add('operations__tab--active')
    // Activate tab-content
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})