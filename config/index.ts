// 网站地址
let webUrl = 'http://localhost:10002';
// api
let apiUrl = 'http://pd1.test.chatnowmeta.com';

if (process.env.APP_ENV === 'development') {
  webUrl = 'http://localhost:10002';
  apiUrl = 'https://www.pd-1st.com';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = 'https://www.pd-1st.com';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = 'http://api.pd-1st.com';
}

export {webUrl, apiUrl};
