/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  let sCharacterSet = {};
  let result = 0;
  let l = 0;
  let maxLength = 0;

  for (let r = 0; r < s.length; r++) {
    if (sCharacterSet[s[r]] !== undefined) {
      sCharacterSet[s[r]] = 1 + sCharacterSet[s[r]];
    } else {
      sCharacterSet[s[r]] = 1;
    }

    maxLength = Math.max(maxLength, sCharacterSet[s[r]]);

    if (r - l + 1 - maxLength > k) {
      sCharacterSet[s[l]] -= 1;
      l += 1;
    }

    result = Math.max(result, r - l + 1);
  }

  return result;
};
