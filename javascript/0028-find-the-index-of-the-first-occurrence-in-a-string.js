/**
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * KMP algorithm
 * Time O(m+n) | Space (n)
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  const pattern = Array(needle.length).fill(0);

  let i = 1;
  let j = 0;

  while (i < needle.length) {
    if (needle[i] === needle[j]) {
      pattern[i] = j + 1;
      i++;
      j++;
      continue;
    }
    if (needle[i] !== needle[j]) {
      if (j === 0) {
        pattern[i] = 0;
        i++;
        continue;
      }
      if (j !== 0 && needle[j] === needle[i]) {
        pattern[i] = 1 + pattern[j - 1];
        i++;
        continue;
      }
      j = pattern[j - 1];
    }
  }

  j = 0;
  i = 0;

  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    } else if (haystack[i] !== needle[j]) {
      if (j === 0) {
        i++;
      } else {
        j = pattern[j - 1];
      }
    }
    if (j === needle.length) return i - needle.length;
  }

  return -1;
}
