/**
 * https://leetcode.com/problems/range-sum-query-immutable/
 * @param {number[]} nums
 */
class NumArray {
    constructor(nums) {
        this.arr = nums;
    }

    /** 
     * Time O(n) | Space O(1)
     * @param {number} left 
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        let total = 0;
        for (let i = left; i < right + 1; i++) {
            total += this.arr[i];
        }
        return total;
    }
}

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
