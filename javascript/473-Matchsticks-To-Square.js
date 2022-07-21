function check(arr) {
  let temp = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== temp) {
      return false;
    }
  }
  return true;
}

/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  let sides = new Array(4).fill(0),
    ans = false,
    size = 0;

  for (let i = 0; i < matchsticks.length; i++) {
    size += matchsticks[i];
  }
  let max_size = size / 4;
  if (max_size - Math.floor(max_size) !== 0) return false;

  matchsticks = matchsticks.sort((a, b) => b - a);

  function backtrack(i) {
    if (ans) return;
    if (i >= matchsticks.length) {
      if (check(sides)) {
        ans = true;
      }
      return;
    }
    for (let j = 0; j < 4; j++) {
      if (sides[j] + matchsticks[i] > max_size) {
        continue;
      }
      sides[j] += matchsticks[i];

      backtrack(i + 1);
      sides[j] -= matchsticks[i];
    }
  }
  backtrack(0);

  return ans;
};
