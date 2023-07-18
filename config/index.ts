// 网站地址
let webUrl = '//localhost:10005';
// api
let apiUrl = '//192.168.2.253:7001';

if (process.env.APP_ENV === 'development') {
  webUrl = '//localhost:10005';
  apiUrl = '//192.168.2.253:7001';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//192.168.2.253:7001';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//192.168.2.253:7001';
}

export {webUrl, apiUrl};
