
import dict from './dict.js'; 

const filter = (input, option) => {

  // 如果option不是字符串，或option是空字符串，校验失败
  if (typeof option !== 'string' || !option) return false;

  // 如果用户未输入任何文字，则校验通过
  if (!input) return true;

  // 将option拆解为数组
  let list = option.split('');

  // 为每个字计算拼音
  // 这里arr是一个数组，其中的每一项是另一个数组
  // arr的第一维，描述的是每个汉字的拼音
  // arr的第二维，描述的是这个汉字的所有发音，如果是多音字，则长度大于1
  let arr = list.map(item => pinyin(item));

  for (let i = 0; i < arr.length; i++) {

    let subList = list.slice(i);
    let subArr = arr.slice(i);

    let result = check(input, subList, subArr);

    let inputWithoutPinyinSplit = input.replace(/'/g, '');
    if (inputWithoutPinyinSplit != input) {
      result = Math.max(result, check(inputWithoutPinyinSplit, subList, subArr));
    }

    if (result) {
      if (i === 0) return 2;
      return 1;
    }
  }

  return 0;
};

// 递归的匹配
// input是用户在文本框中输入的内容
// arr是数组，数组的每一项是另一个数组，“另一个数组”的每一项是一个拼音字符串
const check = (input, list, arr) => {
  if (!input.length) return true;
  if (input.length && !arr.length) return false;
  for (let i = 1; i <= input.length; i++) {
    let subInput = input.slice(0, i);
    if (match(subInput, list[0], arr[0]) === false) {
      return false;
    }
    let result = check(input.slice(i), list.slice(1), arr.slice(1));
    if (result) return true;
  }
  return false;
}

const match = (subInput, listItem, arrItem) => {
  if (subInput.toLowerCase() === listItem.toLowerCase()) return true;
  for (let item of arrItem) {
    if (item.indexOf(subInput) === 0) return true;
  }
  return false;
}

const pinyin = (str) => {
  const reg = /[\u4E00-\u9FA5]/;
  const match = str.match(reg);
  if (!match) return [str];
  const char = match[0];
  let retList = [];
  for (let key in dict) {
    if (dict[key].indexOf(char) >= 0) {
      retList.push(key);
    }
  }
  if (retList.length) return retList;
  return [str];
} 

module.exports = filter;