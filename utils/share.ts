/**
 * 分享到facebook
 * @param url 分享到facebook的页面url
 */
export const shareToFacebook = (url: string) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
};

/**
 * 分享到twitter
 * @param text 分享内容
 * @param url 分享的页面url
 * @param via 分享的主体
 */
export const shareToTwitter = (text: string, url: string, via: string = '') => {
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}&original_referer=${url}`
  );
};
