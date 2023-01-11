use std::cmp::Ordering::{Equal, Less, Greater};

impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let (mut l, mut r) = (0, nums.len());

        while l < r {
            let m = l + (r - l) / 2;
            match target.cmp(&nums[m]) {
                Equal => return m as i32,
                Less => r = m,
                Greater => l = m + 1,
            }
        }

        -1
    }
}
