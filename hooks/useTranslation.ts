// useTranslation.js
import {useCallback, useEffect, useState} from 'react';

import En from '@/locales/en'; // 英文语言包，也就是上面的en.jsx
import Zh from '@/locales/zh'; // 中文语言包，也就是上面的zh.jsx

const LanguageMap: any = {
  en: En,
  zh: Zh,
};

export const useTranslation = () => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const lang: string = localStorage.getItem('lang') || 'en';
    setLang(lang);
  }, []);
  const jsonFun = useCallback(
    (key, params = {}) => {
      // 获取当前的语言包里面key所对应的value值
      let value: any = LanguageMap[lang][key];
      /*
		如果传key进来，或者没有找到value，就直接返回key就好了，
		页面上就显示key，方便找到漏翻译的字段	
	  */
      if (!key || !value) return key;

      /*
		这里是为了能够让我们写的hook能支持传参，比如找到的value为'{name}
		今年{age}岁啦～'，这里的nameg和age都是为参数，也就是后面可以这种
		形式传进来:
		const { t } = useTranslation()
		<div>{ t('app.message',{name:"张三", age:18}) }</div>
		// 翻译后的结果就是
		<div>张三今年18岁啦～</div>
	  */
      Object.keys(params).forEach((item: any) => {
        value = value.replace(new RegExp(`{${item}}`, 'g'), params[item]);
      });
      return value;
    },
    [lang]
  );
  return {
    t: jsonFun,
  };
};
