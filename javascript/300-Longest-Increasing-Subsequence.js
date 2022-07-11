var lengthOfLIS = function (nums) {
  let arr = Array(nums.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        arr[i] = Math.max(arr[i], arr[j] + 1);
      }
    }
  }
  return Math.max(...arr);
};
