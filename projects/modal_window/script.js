'use strict';
//function that takes 6 args :

//whatElToListen - []type, can be done on multiple elements


//typeEvent - ''type to pass a 'click'/'keypress' whatever you need


//elementWhereChangeClassList = []type, pass an element where you want to change classList


//className - ''type, it does what it name is. Just pass a className that you want to add or remove


//behaviorType - ''type if it's === 'add', then className will be added to classList, otherwise it will be
// classList.remove, make sure that if you want to that Event will be connected to keypress, and you want to remove
// className add empty string as behaviorType


//keyPressed - ''type if the event is keypress connected, pass a key ex:'Escape','Enter" etc.


function changeClassOnEvent(whatElToListen, typeEvent, elementWhereChangeClassList, className, behaviorType, keyPressed) {
  function listenerForSingle(el) {
    el.addEventListener(typeEvent, (evt) => {
      if (evt.target === el) {
        behaviorType ==='add'?
        addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
      }
    });
  }
  function listenerForListNodes(el) {
    el.forEach((el) => el.addEventListener(typeEvent, (evt) => {
      el.blur();
      if (evt.target === el) {
        behaviorType ==='add'?
          addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
      }
    }));
  }
  function listenerForKeypress(el) {
    el.addEventListener(typeEvent, (evt) => {
      if (evt.key === keyPressed) {
        behaviorType ==='add'?
          addClassList(elementWhereChangeClassList, className):removeClassList(elementWhereChangeClassList,className)
      }
    });

  }
  function addClassList() {
    elementWhereChangeClassList.map((el) => el.classList.add(className));
  }
  function removeClassList() {
    elementWhereChangeClassList.map((el) => {
        el.classList.remove(className);

    });
  }
  return whatElToListen.map((el) => {
    typeEvent === 'keydown'|| typeEvent === 'keyup' ? listenerForKeypress(el) : null;
    el.hasOwnProperty(length) ? listenerForListNodes(el) : listenerForSingle(el);
  });
}

//declare elements you want to be affected and then pass them to corresponding arg

const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeBtnEl = document.querySelector('.close-modal');
const showModalEl = document.querySelectorAll('.show-modal');

changeClassOnEvent([showModalEl], 'click', [modalEl, overlayEl], 'hidden');
changeClassOnEvent([overlayEl, closeBtnEl], 'click', [modalEl, overlayEl], 'hidden','add');
changeClassOnEvent([document], 'keyup', [modalEl, overlayEl], 'hidden', 'add','Escape');

