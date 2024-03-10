import i18n from './i18n';
import router from './router';
import vuetify from './vuetify';


export function registerPlugins(app) {
  app.use(vuetify).use(router).use(i18n);
}

