use std::collections::VecDeque;

impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut output = vec![];
        let mut q: VecDeque<usize> = VecDeque::new();
        
        let (mut l, mut r) = (0, 0);
        while r < nums.len() {
            while !q.is_empty() && nums[*q.iter().last().unwrap()] < nums[r] {
                q.pop_back();
            }
            q.push_back(r);

            if l > q[0] {
                q.pop_front();
            }

            if r + 1 >= k as usize {
                output.push(nums[q[0]]);
                l += 1;
            }

            r += 1;
        }

        output
    }
}
