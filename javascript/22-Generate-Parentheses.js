/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  result = []
  compute("", 0, 0)
  return result;
  ////////// FUNCTION DEFINITION /////////////////
  function compute(str, o, c) {
    if (o > n || c > n || o < c) return;
    if (c == n && o == n) {
      result.push(str);
      return;
    }
    compute(str + "(", o + 1, c)
    compute(str + ")", o, c + 1)
  }
};