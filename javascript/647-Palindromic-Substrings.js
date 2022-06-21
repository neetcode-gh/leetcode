// Time: O(n^2) | Space: O(1)

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res += countPalindromic(s, i, i) + countPalindromic(s, i, i + 1);
  }

  return res;
};

/**
 *
 * @param {string} s
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
const countPalindromic = (s, l, r) => {
  let count = 0;

  while (l >= 0 && r <= s.length && s[l] === s[r]) {
    count += 1;
    l -= 1;
    r += 1;
  }

  return count;
};
