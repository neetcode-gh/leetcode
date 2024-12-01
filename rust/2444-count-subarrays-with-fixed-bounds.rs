impl Solution {
    // Time O(n) - Space O(1)
    pub fn count_subarrays(nums: Vec<i32>, min_k: i32, max_k: i32) -> i64 {
        let (mut last_max, mut last_min, mut last_oob) = (-1, -1, -1);
        let mut res = 0;
        // An auxiliary variable used to cast the index once.
        let mut i;
        for (idx, num) in nums.iter().enumerate() {
            i = idx as i64;
            // Update the last seen values with the current value.
            if num < &min_k || num > &max_k {
                last_oob = i;
            }
            if num == &min_k {
                last_min = i;
            }
            if num == &max_k {
                last_max = i;
            }
            res += 0.max(last_max.min(last_min) - last_oob);
        }
        res
    }
}
