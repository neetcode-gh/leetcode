use std::collections::VecDeque;

impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut output = vec![];
        let mut deque: VecDeque<usize> = VecDeque::new();
        let n = nums.len();
        let (mut left, mut right) = (0, 0);

        while right < n {
            // pop smaller value from queue
            while let Some(&back) = deque.back() {
                if nums[back] < nums[right] {
                    deque.pop_back();
                } else {
                    break;
                }
            }

            deque.push_back(right);

            // remove left val from window
            if left > deque[0] {
                deque.pop_front();
            }

            if (right + 1) >= k {
                output.push(nums[deque[0]]);
                left += 1;
            }
            right += 1;
        }

        output
    }
}
