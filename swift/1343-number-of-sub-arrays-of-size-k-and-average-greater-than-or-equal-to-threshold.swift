/**
 * Question Link: https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/
 */

 class Solution {
    func numOfSubarrays(_ arr: [Int], _ k: Int, _ threshold: Int) -> Int {
        var res = 0
        var curSum = Array(arr[0..<k - 1]).reduce(.zero, +)
        for l in 0..<(arr.count - k + 1) {
            curSum += arr[l + k - 1]
            if curSum / k >= threshold {
                res += 1
            }
            curSum -= arr[l]
        }
        return res
    }
}