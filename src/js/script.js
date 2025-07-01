// KEEP COPYRIGHT UPDATED
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// MOBILE NAV
const mainHeader = document.querySelector('.main-header');
const btnMobileNavToggle = document.querySelector('.mobile-nav-btn');

btnMobileNavToggle.addEventListener('click', function (e) {
  if (this.getAttribute('aria-expanded') === 'false') {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }

  mainHeader.classList.toggle('nav-open');
  document.body.classList.toggle('no-scroll');
});

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
