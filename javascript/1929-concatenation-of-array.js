//https://leetcode.com/problems/concatenation-of-array/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
  let res = [];
  for (let i = 0; i < nums.length * 2; i++) {
    res.push(nums[i % nums.length]);
  }
  return res;
};
