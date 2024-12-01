use std::collections::HashMap;
impl Solution {
    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        let (mut count, mut sum, mut map) = (0, 0, HashMap::with_capacity(nums.len() / 2));
        map.insert(0, 1);
        for num in nums {
            sum += num;
            count += map.get(&(sum - k)).copied().unwrap_or(0);
            map.entry(sum).and_modify(|e| *e = *e + 1).or_insert(1);
        }
        count
    }
}
