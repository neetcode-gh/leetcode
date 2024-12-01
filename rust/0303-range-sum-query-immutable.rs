/*
 * @lc app=leetcode id=303 lang=rust
 *
 * [303] Range Sum Query - Immutable
 */

// @lc code=start
struct NumArray {
    prefix: Vec<i32>
}


/** 
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl NumArray {

    fn new(nums: Vec<i32>) -> Self {
        let mut prefix = vec![];
        let mut cur = 0;
        for n in nums {
            cur += n;
            prefix.push(cur);
        }
        Self { prefix }
    }
    
    fn sum_range(&self, left: i32, right: i32) -> i32 {
        let right_sum = self.prefix[right as usize];
        let left_sum = if left > 0 {
            self.prefix[(left - 1) as usize]
        } else {
            0
        };
        right_sum - left_sum
    }
}
/**
 * Your NumArray object will be instantiated and called as such:
 * let obj = NumArray::new(nums);
 * let ret_1: i32 = obj.sum_range(left, right);
 */
// @lc code=end
