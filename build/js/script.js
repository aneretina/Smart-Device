/* eslint-disable new-cap, no-undef */
'use strict';

var ESC_KEY = 27;

var overlay = document.querySelector('.overlay');
var modal = document.querySelector('.js__modal');
var modalOpen = document.querySelector('.js__modal--open');
var modalClose = document.querySelector('.js__modal--close');

var buttons = document.querySelectorAll('.js--button');
var lists = document.querySelectorAll('.js--list');

var nameField = modal.querySelector('#name-field');
var phoneField = modal.querySelector('#phone-field');
var messageField = modal.querySelector('#message-field');
var nameFeedback = document.querySelector('#name');
var phoneFeedback = document.querySelector('#phone');
var messageFeedback = document.querySelector('#message');

var feedbackForm = document.querySelector('.feedback-form');
var modalForm = document.querySelector('.form');
var scrollBtn = document.querySelector('.introduction__scroll');
var introBtn = document.querySelector('.introduction__btn');

buttons.forEach(function (it, index) {
  it.addEventListener('click', function () {
    it.classList.toggle('closed');
    lists[index].classList.toggle('closed');
  });
});

var onOverlayHandler = function () {
  if (modal.classList.contains('modal--open') && overlay.classList.contains('overlay--open')) {
    modal.classList.remove('modal--open');
    modal.classList.remove('modal__error');
    overlay.classList.remove('overlay--open');
  }
};

var onEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closeModal();
  }
};

if (modal) {
  var openModal = function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--open');
    overlay.classList.add('overlay--open');
    overlay.addEventListener('click', onOverlayHandler);
    document.addEventListener('keydown', onEscHandler);
    nameField.focus();
  };
}

var closeModal = function () {
  if (modal.classList.contains('modal--open') && overlay.classList.contains('overlay--open')) {
    modal.classList.remove('modal--open');
    modal.classList.remove('modal__error');
    overlay.classList.remove('overlay--open');
  }

  overlay.removeEventListener('click', onOverlayHandler);
  document.removeEventListener('keydown', onEscHandler);
};

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    localStorage.setItem('name-input', nameFeedback.value);
    localStorage.setItem('phone-input', phoneFeedback.value);
    localStorage.setItem('message-input', messageFeedback.value);
  });
}

if (modalForm) {
  modalForm.addEventListener('submit', function (event) {
    event.preventDefault();

    localStorage.setItem('name-field', nameField.value);
    localStorage.setItem('phone-field', phoneField.value);
    localStorage.setItem('message-field', messageField.value);
  });
}


IMask(phoneFeedback, {mask: '+{7}(000)000-00-00'});
IMask(phoneField, {mask: '+{7}(000)000-00-00'});


function scrollDown() {
  var windowCoords = document.documentElement.clientHeight;
  (function scroll() {
    if (window.pageYOffset < windowCoords) {
      window.scrollBy(0, 10);
      setTimeout(scroll, 0);
    }
    if (window.pageYOffset > windowCoords) {
      window.scrollTo(0, windowCoords);
    }
  })();
}

introBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  document.querySelector('.feedback').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});


if (modalOpen) {
  modalOpen.addEventListener('click', openModal);
}
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (scrollBtn) {
  scrollBtn.addEventListener('click', scrollDown);
}
