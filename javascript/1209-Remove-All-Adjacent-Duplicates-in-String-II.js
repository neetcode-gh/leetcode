/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
  const stack = []; // [char, count];

  for (const c of s) {
    if (stack.length !== 0 && stack[stack.length - 1][0] === c) {
      stack[stack.length - 1][1]++;
    } else {
      stack.push([c, 1]);
    }

    if (stack[stack.length - 1][1] === k) {
      stack.pop();
    }
  }

  return stack.reduce((res, el) => (res += el[0].repeat(el[1])), '');
};
