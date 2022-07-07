function containsDuplicate(nums: number[]): boolean {
  let hash: { [key: number]: number } = {}
  for (let ele of nums) {
    if (ele in hash) return true
    else hash[ele] = 1
  }
  return false
}
