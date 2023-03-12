// 网站地址
let webUrl = '//localhost:10002';
// api
let apiUrl = '//www.pixso.site';

if (process.env.APP_ENV === 'development') {
  webUrl = '//localhost:10002';
  apiUrl = '//www.pixso.site';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//www.pixso.site';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//www.pixso.site';
}

export {webUrl, apiUrl};
