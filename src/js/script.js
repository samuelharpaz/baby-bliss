///////////////////////////////////////
// KEEP COPYRIGHT UPDATED
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////
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

///////////////////////////////////////
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
// PRICING TABLE SELECT FUNCTIONALITY

const dropdownVirtual = document.querySelector('.pricing-select--virtual');
const dropdownHome = document.querySelector('.pricing-select--home');
const btnsStage = document.querySelectorAll('[data-stage]');
const classContainer = document.querySelector('.container-classes');
const btnsBook = document.querySelectorAll('.btn-book');

let selectedClass = sessionStorage.getItem('selectedClass');

if (dropdownVirtual && dropdownHome && selectedClass) {
  dropdownVirtual.value = selectedClass;
  dropdownHome.value = selectedClass;
}

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

if (btnsBook) {
  btnsBook.forEach(btn => {
    btn.addEventListener('click', function (e) {
      sessionStorage.setItem('selectedClass', dropdownVirtual.value);
    });
  });
}

///////////////////////////////////////
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

///////////////////////////////////////
// FORMS

const form = document.querySelector('.form');
const formVirtual = document.querySelector('.form-virtual');
const formHome = document.querySelector('.form-home');
const messageLabel = document.querySelector('label[for=message]');
const formGroupPregnancy = document.querySelector('#form-group-pregnancy');

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

const classSelect = document.querySelector('#class-select');

if (formVirtual || formHome) {
  classSelect.value = selectedClass;

  classSelect.addEventListener('change', function (e) {
    sessionStorage.setItem('selectedClass', classSelect.value);

    if (classSelect.value === 'prenatal') {
      messageLabel.textContent = `Additional comments:`;
      formGroupPregnancy.classList.remove('hidden');
    } else {
      messageLabel.textContent = `Share a quick summary of any issues/challenges you've been dealing with so we can help tailor your
                    solution:`;
      formGroupPregnancy.classList.add('hidden');
    }
  });

  if (selectedClass === 'prenatal') {
    messageLabel.textContent = `Additional comments:`;

    formGroupPregnancy.classList.remove('hidden');
  }
}

///////////////////////////////////////
// SCROLL TO TOP BUTTON
const sectionHero = document.querySelector('.section-hero');
const btnScrollTop = document.querySelector('.scroll-top');

btnScrollTop.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const scrollTopObserverOptions = {
  root: null, // This means the viewport is the root
  rootMargin: '200px', // No extra margin around the root
  threshold: 0 // Trigger when 0% of the target is visible
};

const scrollTopObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    // If the hero section is NOT intersecting (i.e., you've scrolled past it)
    if (!entry.isIntersecting) {
      btnScrollTop.classList.add('scroll-top-visible');
    } else {
      // If the hero section IS intersecting (i.e., you're back in it)
      btnScrollTop.classList.remove('scroll-top-visible');
    }
  });
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(scrollTopObserverCallback, scrollTopObserverOptions);

// Start observing the hero section
observer.observe(sectionHero);
