/**
 * Cyclic Sort
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/first-missing-positive
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = (nums) => {
  cyclicSort(nums);

  return search(nums);
};

const cyclicSort = (nums, index = 0) => {
  while (index < nums.length) {
    const num = nums[index];
    const indexKey = (num - 1);
    const indexNum = nums[indexKey];

    if (canSwap(nums, num, indexNum)) {
      swap(nums, index, indexKey);
      continue;
    }

    index += 1;
  }
}

const search = (nums, index = 0) => {
  while (index < nums.length) {
    const num = nums[index];
    const indexKey = (index + 1);

    if (!isEqual(num, indexKey)) return indexKey;

    index += 1;
  }

  return (nums.length + 1);
}

const canSwap = (nums, num, indexNum) =>
  isPositive(num) &&
  isInBound(num, nums) &&
  !isEqual(num, indexNum);

const swap = (nums, index, indexKey) => 
  [nums[index], nums[indexKey]] = [nums[indexKey], nums[index]];

const isPositive = (num) => (0 < num);

const isInBound = (num, nums) => (num <= nums.length);

const isEqual = (num, indexNum) => (num === indexNum);


