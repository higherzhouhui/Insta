import React, {useState, ReactNode, useCallback} from 'react';

import {language_en_US, language_zh_CN} from '@/uikit';

export type Props = {
  children: ReactNode;
};

export type ContextValue = {
  lang: string;
  t: (key: string) => string;
  setLanguage: (language: string) => void;
};

export const LanguageContext = React.createContext<ContextValue>(
  {} as ContextValue
);

export const LanguageProvider: React.FC = ({children}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en_US');

  // 翻译
  const translate = useCallback(
    (key: string) => {
      let translateLanguage: any = language_en_US;
      switch (currentLanguage) {
        case 'zh_CN':
          translateLanguage = language_zh_CN;
          break;
        default:
          translateLanguage = language_en_US;
          break;
      }
      const translatedText = translateLanguage[key];
      return translatedText;
    },
    [currentLanguage]
  );

  // 设置语言
  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: currentLanguage,
        setLanguage,
        t: translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
