use std::collections::HashMap;

impl Solution {
    pub fn check_subarray_sum(nums: Vec<i32>, k: i32) -> bool {
        let mut hashmap: HashMap<i32, i32> = HashMap::new();
        hashmap.insert(0, -1);
        let mut sum = 0;

        for (i, &num) in nums.iter().enumerate() {
            sum += num;
            if let Some(&prev_index) = hashmap.get(&(sum % k)) {
                if i as i32 - prev_index >= 2 {
                    return true;
                }
            } else {
                hashmap.insert(sum % k, i as i32);
            }
        }

        false
    }
}
