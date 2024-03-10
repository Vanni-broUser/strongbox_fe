import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3313B6',
          secondary: '#E33E10',
        }
      }
    }
  }
});
