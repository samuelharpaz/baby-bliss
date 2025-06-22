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
