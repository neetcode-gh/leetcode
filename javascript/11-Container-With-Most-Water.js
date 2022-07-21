/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  let i = 0;
  let j = height.length - 1;

  while (i < j) {
    const curr = (j - i) * Math.min(height[i], height[j]);
    max = Math.max(curr, max);
    if (height[i] > height[j]) {
      j--;
    } else {
      i++;
    }
  }
  return max;
};
