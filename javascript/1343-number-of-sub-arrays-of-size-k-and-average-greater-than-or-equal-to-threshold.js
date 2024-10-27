/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
  if (arr.length < k) return 0;
  let count = 0;
  let sum = 0;
  let L = 0;
  for (let R = 0; R < arr.length; R++) {
    sum += arr[R];
    if (R - L + 1 === k) {
      if (sum / k >= threshold)
        count += 1;
      sum -= arr[L];
      L += 1;
    }
  }
  return count;
};
