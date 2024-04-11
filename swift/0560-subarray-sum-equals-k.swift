/**
 * Question Link: https://leetcode.com/problems/subarray-sum-equals-k/
 */

 class Solution {
    func subarraySum(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        var curSum = 0
        var hashmap = [0: 1]
        for n in nums {
            curSum += n
            var diff = curSum - k
            res += hashmap[diff, default: 0]
            hashmap[curSum] = 1 + hashmap[curSum, default: 0]
        }
        return res
    }
}