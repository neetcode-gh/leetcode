function findKthLargest(nums, k) {
  k = nums.length - k;

  function quickSelect(l, r) {
    let pivot = nums[r];
    let p = l;

    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) {
        let temp = nums[p];
        nums[p] = nums[i];
        nums[i] = temp;
        p += 1;
      }
    }

    let temp = nums[p];
    nums[p] = nums[r];
    nums[r] = temp;

    if (p > k) {
      return quickSelect(l, p - 1);
    } else if (p < k) {
      return quickSelect(p + 1, r);
    } else {
      return nums[p];
    }
  }

  return quickSelect(0, nums.length - 1);
}
