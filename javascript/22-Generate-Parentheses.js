/**
 * https://leetcode.com/problems/generate-parentheses/
 *
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const combinations = [];
  const currentCombination = [];

  function exploreParens(opensRemaining, closesAvailable) {
    if (currentCombination.length == n * 2) {
      combinations.push(currentCombination.join(''));
      return;
    }

    if (opensRemaining) {
      currentCombination.push('(');
      exploreParens(opensRemaining - 1, closesAvailable + 1);
      currentCombination.pop();
    }

    if (closesAvailable) {
      currentCombination.push(')');
      exploreParens(opensRemaining, closesAvailable - 1);
      currentCombination.pop();
    }
  }

  exploreParens(n, 0);

  return combinations;
};
