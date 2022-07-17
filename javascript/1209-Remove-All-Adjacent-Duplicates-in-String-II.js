/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
  const stack = [];

  for (const c of s) {
    // Construct stack
    if (stack.length !== 0 && stack[stack.length - 1][0] === c) {
      stack[stack.length - 1][1]++;
    } else {
      stack.push([c, 1]);
    }

    // Remove from stack
    if (stack[stack.length - 1][1] === k) {
      stack.pop();
    }
  }

  // Build output of remaining characters
  return stack.reduce((res, el) => (res += el[0].repeat(el[1])), '');
};
