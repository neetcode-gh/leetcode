function search(nums: number[], target: number): number {
  let left: number = 0
  let right: number = nums.length - 1

  while (left <= right) {
    let middleIdx: number = Math.floor((left + right) / 2)

    if (nums[middleIdx] > target) {
      right = middleIdx - 1
    } else if (nums[middleIdx] < target) {
      left = middleIdx + 1
    } else {
      return middleIdx
    }
  }

  return -1
}
