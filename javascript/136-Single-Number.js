/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let xor_final = 0;
  for (num of nums) {
    xor_final = xor_final ^ num;
  }
  return xor_final;
};
