class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        // remove duplicates numbers
        let numSet = Set(nums)
        var longestSequenceCount = 0
        // iterate through each number in the numSet
        // find the lowest number for a sequence, if num - 1 is not there in the numSet, it means num - 1 is the
        // lowest for that particular sequence
        for num in numSet where !numSet.contains(num - 1) {
            // num is lowest number for the probable longest consecutive sequence
            var visitingNum = num + 1
            var currentSequenceCount = 1
            // check if next number exists in the numSet, if so then increase the count
            while numSet.contains(visitingNum) {
                currentSequenceCount += 1
                visitingNum += 1
            }
            // set the maximum count
            longestSequenceCount = max(longestSequenceCount, currentSequenceCount)
        }
        return longestSequenceCount
    }
}
