import filterByPinyin from '../src/index.js';

const str = '黑龙江';

const inputs = ['heilongjiang', '黑龙江', 'hlj', 'long', 'hj'];

inputs.forEach(input => {
  console.log('input:' + input + '  result:' + filterByPinyin(input, str));
})