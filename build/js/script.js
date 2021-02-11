'use strict';

(function () {

  var ESC_KEY = 27;

  var overlay = document.querySelector('.overlay');
  var modal = document.querySelector('.modal');
  var modalOpen = document.querySelector('.header__callback');
  var modalClose = document.querySelector('.modal__close-btn');
  var page = document.querySelector('html');

  var sections = document.querySelector('.footer-sections');
  var sectionsBtn = document.querySelector('.footer-sections__btn');
  var sectionsList = document.querySelector('.footer-sections__list');
  var contacts = document.querySelector('.footer-contacts');
  var contactsBtn = document.querySelector('.footer-contacts__button');
  var contactsList = document.querySelector('.footer-contacts__list');


  var nameField = modal.querySelector('#name-field');
  var phoneField = modal.querySelector('#phone-field');
  var messageField = modal.querySelector('#message-field');
  var nameFeedback = document.querySelector('#name');
  var phoneFeedback = document.querySelector('#phone');
  var messageFeedback = document.querySelector('#message');

  var feedbackForm = document.querySelector('.feedback__form');
  var modalForm = document.querySelector('.form');
  var scrollBtn = document.querySelector('.introduction__scroll');
  var introBtn = document.querySelector('.introduction__btn');


  if (sectionsBtn) {
    sections.addEventListener('click', function () {
      sectionsBtn.classList.remove('visually-hidden');
      contactsBtn.classList.remove('visually-hidden');
      sectionsList.classList.toggle('closed');
      sectionsBtn.classList.toggle('closed');

      if (!contactsList.classList.contains('closed')) {
        contactsList.classList.add('closed');
        contactsBtn.classList.add('closed');
      }
    });
  }


  if (contactsBtn) {
    contactsList.classList.add('closed');
    contactsBtn.classList.add('closed');
    contacts.addEventListener('click', function () {
      contactsBtn.classList.remove('visually-hidden');
      sectionsBtn.classList.remove('visually-hidden');
      contactsList.classList.toggle('closed');
      contactsBtn.classList.toggle('closed');

      if (!sectionsList.classList.contains('closed')) {
        sectionsList.classList.add('closed');
        sectionsBtn.classList.add('closed');
      }
    });
  }

  var onOverlayHandler = function () {
    if (modal.classList.contains('modal--open') && overlay.classList.contains('overlay--open')) {
      modal.classList.remove('modal--open');
      modal.classList.remove('modal__error');
      overlay.classList.remove('overlay--open');
      page.classList.remove('modal--overflow');
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
      page.classList.add('modal--overflow');
      nameField.focus();
    };
  }

  var closeModal = function () {
    if (modal.classList.contains('modal--open') && overlay.classList.contains('overlay--open')) {
      modal.classList.remove('modal--open');
      modal.classList.remove('modal__error');
      overlay.classList.remove('overlay--open');
      page.classList.remove('modal--overflow');
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
      feedbackForm.reset();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', function (event) {
      event.preventDefault();
      localStorage.setItem('name-field', nameField.value);
      localStorage.setItem('phone-field', phoneField.value);
      localStorage.setItem('message-field', messageField.value);
      closeModal();
    });
  }

  /* eslint-disable no-undef */
  /* eslint-disable new-cap */

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

})();
