use std::collections::HashMap;

impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut count: HashMap<i32, i32> = HashMap::new();
        let mut freq: Vec<Vec<i32>> = Vec::new();
        freq.resize(nums.len() + 1, Vec::new());

        for num in nums.into_iter() {
            *count.entry(num).or_default() += 1;
        }

        for (k, v) in count.into_iter() {
            freq[v as usize].push(k);
        }

        let mut ret = Vec::new();
        for v in freq.into_iter().rev() {
            for item in v {
                if ret.len() == k as usize {
                    return ret
                }
                ret.push(item);
            }
        }

        ret
    }
}
