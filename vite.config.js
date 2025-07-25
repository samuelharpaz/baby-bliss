// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials')
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about-me.html',
        workshops: './workshops.html',
        faves: './favorite-products.html',
        contact: './contact.html',
        workshopForm: './sleep-workshop.html',
        followUpForm: './follow-up-session.html',
        fatherSupportForm: './father-support.html',
        babyBlissBracelet: './baby-bliss-bracelet.html',
        giftCard: './gift-card.html',
        custom404: './404.html',
        submissionSuccess: './submission-success.html',
        disclaimer: './disclaimer.html',
        terms: './terms.html',
        privacy: './privacy.html'
      }
    }
  }
};
