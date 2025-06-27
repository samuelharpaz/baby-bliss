// SLIDER
const swiper = new Swiper('.swiper', {
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

  slidesPerView: 3,
  spaceBetween: 96
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

const classWrapper = document.querySelector('.class-wrapper');

classWrapper?.addEventListener('click', function (e) {
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
