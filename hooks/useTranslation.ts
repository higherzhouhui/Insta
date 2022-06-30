import {useContext} from 'react';

import {LanguageContext} from '@/context/LanguageProvider';

export const useTranslation = () => {
  const languageContext = useContext(LanguageContext);
  if (languageContext === undefined) {
    throw new Error('Language context is undefined');
  }
  return languageContext;
};
