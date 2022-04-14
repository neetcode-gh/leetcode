/**
 * Question Link: https://leetcode.com/problems/longest-consecutive-sequence
 */

class LongestConsecutiveSequence {
    func longestConsecutive(_ nums: [Int]) -> Int {
        let numSet = Set<Int>(nums)
        var longest = 0
        
        for num in nums {
            // check if its the start of a sequence
            if !numSet.contains(num - 1) {
                var length = 1
                while numSet.contains(num + length) {
                    length += 1
                }
                longest = max(longest, length)
            }
        }
        return longest
    }
}
