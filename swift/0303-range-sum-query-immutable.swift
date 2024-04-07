/**
 * Question Link: https://leetcode.com/problems/range-sum-query-immutable/
 */


class NumArray {
    var pref: [Int]

    init(_ nums: [Int]) {
        pref = []
        var total = 0
        for n in nums {
            total += n
            pref.append(total)
        }
    }
    
    func sumRange(_ left: Int, _ right: Int) -> Int {
        let prefRight = pref[right]
        let prefLeft = left > 0 ? pref[left - 1] : 0
        return (prefRight - prefLeft)
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * let obj = NumArray(nums)
 * let ret_1: Int = obj.sumRange(left, right)
 */