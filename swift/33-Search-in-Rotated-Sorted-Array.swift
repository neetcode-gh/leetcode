class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var lo = 0
        var hi = nums.count - 1

        while lo <= hi {
            let mid = lo + (hi-lo)/2
            if nums[mid] == target {
                return mid
            } else if nums[mid] <= nums[hi] {
                if target > nums[mid] && target <= nums[hi] {
                    lo = mid+1
                } else {
                    hi = mid-1
                }
            } else if nums[lo] <= nums[mid] {
                if target >= nums[lo] && target < nums[mid] {
                    hi = mid-1
                } else {
                    lo = mid+1
                }
            }
        }
        return -1
    }
}
