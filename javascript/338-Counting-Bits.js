/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  let output = [0];
  for (let i = 1; i < n + 1; i++) {
    output.push(output[i >> 1] + (i & 1));
  }
  return output;
};
