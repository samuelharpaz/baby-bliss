// KEEP COPYRIGHT UPDATED
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// SLIDER
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 32,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-unique',
    prevEl: '.swiper-button-prev-unique'
  },

  breakpoints: {
    1201: {
      slidesPerView: 3,
      spaceBetween: 96
    },

    737: {
      slidesPerView: 2,
      spaceBetween: 64
    },

    601: {
      slidesPerView: 2,
      spaceBetween: 32
    }
  }
});

// ACCORDION

const accordion = document.querySelector('.accordion');

accordion?.addEventListener('click', function (e) {
  const activePanel = e.target.closest('.accordion-panel');
  if (!activePanel) return;

  toggleAccordion(activePanel);
});

function toggleAccordion(panelToActivate) {
  const buttons = panelToActivate.parentElement.querySelectorAll('button');
  const contents = panelToActivate.parentElement.querySelectorAll('.accordion-content');

  const isClosed = panelToActivate.querySelector('button').getAttribute('aria-expanded') === 'false';

  buttons.forEach(button => {
    button.setAttribute('aria-expanded', false);
  });

  contents.forEach(content => {
    content.setAttribute('aria-hidden', true);
  });

  if (isClosed) {
    panelToActivate.querySelector('button').setAttribute('aria-expanded', true);
    panelToActivate.querySelector('.accordion-content').setAttribute('aria-hidden', false);
  }
}

///////////////////////////////////////
// pricing table select functionality

const dropdownVirtual = document.querySelector('.pricing-select--virtual');
const dropdownHome = document.querySelector('.pricing-select--home');
const btnsStage = document.querySelectorAll('[data-stage]');

const classContainer = document.querySelector('.container-classes');

classContainer?.addEventListener('click', function (e) {
  if (Array.from(btnsStage).includes(e.target)) {
    dropdownVirtual.value = e.target.dataset.stage;
    dropdownHome.value = e.target.dataset.stage;
  }
});

dropdownVirtual?.addEventListener('change', function () {
  dropdownHome.value = this.value;
});

dropdownHome?.addEventListener('change', function () {
  dropdownVirtual.value = this.value;
});

const inputTelephone = document.querySelector('#phone');

if (inputTelephone) {
  window.intlTelInput(inputTelephone, {
    loadUtils: () => import('https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js'),
    initialCountry: 'us'
  });
}

// HIGHLIGHT CURRENT PAGE
// const currentPage = window.location.pathname.split('/').pop();
const currentPage = window.location.pathname.split('/').pop();

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (
    href &&
    (href === currentPage ||
      (href === 'index.html' && currentPage === '') ||
      (currentPage.startsWith(href) && href !== ''))
  ) {
    link.classList.add('current');
  } else {
    link.classList.remove('current');
  }
});

// FORMS
window.onload = function () {
  // Reset the form fields when the page loads
  document.querySelector('form').reset();
};

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function (e) {
    const nameInput = document.querySelector('#name');
    const userSubjectInput = document.querySelector('#user-subject');
    const subjectInput = document.querySelector('#subject');

    if (userSubjectInput?.value.trim()) {
      subjectInput.value = `${nameInput.value.trim()}: ${userSubjectInput?.value.trim()}`;
    } else {
      subjectInput.value = `${subjectInput.value}: ${nameInput.value.trim()}`;
    }
  });
}
