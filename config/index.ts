// 网站地址
let webUrl = 'http://localhost:10002';
// api
let apiUrl = 'http://www.pixso.site';

if (process.env.APP_ENV === 'development') {
  webUrl = 'http://localhost:10002';
  apiUrl = 'http://www.pixso.site';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = 'http://www.pixso.site';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = 'http://www.pixso.site';
}

export {webUrl, apiUrl};
