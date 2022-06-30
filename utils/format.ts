/**
 * 处理px单位
 */
export const handleToPx = (value: any) => {
  const val = `${value}`;
  const isnum = /^\d+$/.test(val);
  if (isnum) {
    return `${value}px`;
  }
  return value;
};
// 金额千分位逗号隔开格式化
export const formatPrice = (value: any) => {
  if (!value) {
    return value;
  }
  return Number(value).toLocaleString();
};
