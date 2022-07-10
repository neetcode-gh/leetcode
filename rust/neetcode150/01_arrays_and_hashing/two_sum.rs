#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
pub struct Solution;
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut result = Vec::with_capacity(2);
        for (idx, num) in nums.iter().enumerate() {
            let search = target - num;
            if nums[idx + 1..].contains(&search) || nums[..idx].contains(&search) {
                result.push(idx as i32);
            }
        }
        result
    }
}
