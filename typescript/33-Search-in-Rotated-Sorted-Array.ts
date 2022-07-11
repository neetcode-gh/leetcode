function search(nums: number[], target: number): number {
  let left: number = 0
  let right: number = nums.length - 1

  while (left <= right) {
    let midIdx: number = Math.floor((left + right) / 2)
    if (nums[midIdx] === target) return midIdx

    if (nums[left] <= nums[midIdx]) {
      if (nums[left] <= target && target <= nums[midIdx]) right = midIdx - 1
      else left = midIdx + 1
    } else {
      if (nums[midIdx] <= target && target <= nums[right]) left = midIdx + 1
      else right = midIdx - 1
    }
  }
  return -1
}
