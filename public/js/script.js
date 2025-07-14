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
const currentPageFullURL = currentPage + '.html';

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  const href = link.getAttribute('href');

  if (
    (href && href === currentPageFullURL) ||
    (href === 'index.html' && currentPage === '') ||
    (href === '/' && currentPage === '') ||
    (currentPage.startsWith(href) && href !== '')
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
      messageLabel.textContent = `Share a quick summary of any specific challenges you've been facing so we can best tailor your
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
const mainHeader = document.querySelector('.main-header');
const btnScrollTop = document.querySelector('.scroll-top');

if (btnScrollTop) {
  btnScrollTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const scrollTopObserverOptions = {
    root: null, // This means the viewport is the root
    rootMargin: '900px', // No extra margin around the root
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
  observer.observe(mainHeader);
}

///////////////////////////////////////
// SCROLL TO TOP BUTTON

document.querySelector('.mobile-nav')?.addEventListener('beforetoggle', function (e) {
  document.body.classList.toggle('no-scroll');
});

///////////////////////////////////////
// BRACELET FORM
const braceletAmountSelect = document.querySelector('#bracelet-amount-select');
const btnBracelet = document.querySelector('.btn-bracelet');

braceletAmountSelect?.addEventListener('change', function () {
  if (this.value === 'two') {
    btnBracelet?.setAttribute('href', 'https://buy.stripe.com/5kQ8wO20P1aaf3Kb3bfIs01');
  } else if (this.value === 'one') {
    btnBracelet?.setAttribute('href', 'https://buy.stripe.com/8x2aEWcFt7yy3l2fjrfIs00');
  }
});

///////////////////////////////////////
// GIFT CARD FORM
const recipientZip = document.querySelector('.form-group--recipient-zip');
const workshopRadios = document.querySelectorAll('input[name="workshop"]');

if (workshopRadios) {
  workshopRadios.forEach(radio => {
    radio.addEventListener('change', function (e) {
      if (e.target.checked && e.target.value === 'in-person') {
        recipientZip.classList.remove('hidden');
      } else if (e.target.checked && e.target.value === 'virtual') {
        recipientZip.classList.add('hidden');
      }
    });
  });
}
