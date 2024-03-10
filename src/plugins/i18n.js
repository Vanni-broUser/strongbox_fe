import { createI18n } from 'vue-i18n';

import itLocale from '@/locales/it.json';
import zhLocale from '@/locales/zh.json';

const i18n = createI18n({
  locale: 'zh',
  messages: {
    it: itLocale,
    zh: zhLocale
  }
});

export default i18n;