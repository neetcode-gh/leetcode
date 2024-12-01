// Bucket Sort Solution
class Solution {
    func sortColors(_ nums: inout [Int]) {
        var counts = [0, 0, 0]
        for n in nums {
            counts[n] += 1
        }

        var i = 0
        for n in 0..<counts.count {
            for j in 0..<counts[n] {
                nums[i] = n
                i += 1
            }
        }
    }
}