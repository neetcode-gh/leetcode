class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0
        var r = nums.count - 1
        while l <= r {
            let mid = (l + r) / 2
            guard nums[mid] != target else { return mid }
            l = nums[mid] < target ? mid + 1 : l
            r = nums[mid] > target ? mid - 1 : r
        }
        return -1
    }
}
