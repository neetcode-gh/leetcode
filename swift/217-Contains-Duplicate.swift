/**
 * Question Link: https://leetcode.com/problems/contains-duplicate/
 */

class ContainsDuplicate {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        guard nums.count == Set(nums).count else { return true }
        return false
    }
}
