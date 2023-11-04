impl Solution {
    pub fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
       let n = nums.len();
       (0..1<<n).map(|bitmask| {
            (0..n).filter_map(|i| match (bitmask >> i)&1 != 0 {
                true => Some(nums[i]),
                false => None
                }).collect()
       }).collect()
    }
}
