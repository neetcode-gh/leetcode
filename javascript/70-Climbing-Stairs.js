/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const memoized = climb();
  return memoized(n);
};

function climb() {
  let cache = {};

  return function climbStairs(n) {
    if (n in cache) {
      return cache[n];
    } else if (n >= 1 && n < 4) {
      return n;
    } else {
      cache[n] = climbStairs(n - 2) + climbStairs(n - 1);
      return cache[n];
    }
  };
}
