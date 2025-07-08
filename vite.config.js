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
        virtualForm: './virtual-workshop.html',
        homeForm: './in-person-workshop.html',
        scheduleCallForm: './schedule-call.html',
        followUpForm: './follow-up-session.html',
        fatherSupportForm: './father-support.html'
      }
    }
  }
};
