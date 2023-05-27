import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en';
import zh from './zh';
const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

const getInitLng = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang');
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitLng(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
