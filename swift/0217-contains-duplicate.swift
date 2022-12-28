/**
 * Question Link: https://leetcode.com/problems/contains-duplicate/
 */

class ContainsDuplicate {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        var hashSet = Set<Int>()
        for n in nums {
            if hashSet.contains(n) {
                return true
            }
            hashSet.insert(n)
        }
        return false
    }
    
    func containsDuplicateByCountComparison(_ nums: [Int]) -> Bool {
        
        // a Set must contain unique items
        // so, if the count of `nums` is unequal to `nums` casted as a Set,
        // then, one or more items were removed,
        // meaning, there were one or more duplicates in `nums`
        if nums.count == Set(nums).count {
            return false
        } else {
            return true
        }
    }
}
