use std::iter::FromIterator;

impl Solution {
    pub fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let n = nums.len();

        Vec::from_iter((0..1 << n).map(|bitmask| {
            Vec::from_iter((0..n).filter_map(|i| match (bitmask >> i) & 1 != 0 {
                true => Some(nums[i]),
                false => None
            }))
        }))
    }
}
