struct NumArray {
    prefix_sums: Vec<i32>,
}

impl NumArray {
    // Time O(n) - Space O(n)
    fn new(nums: Vec<i32>) -> Self {
        NumArray {
            prefix_sums: nums
                .iter()
                .scan(0, |state, &x| {
                    *state = *state + x;
                    Some(*state)
                })
                .collect(),
        }
    }

    // Time O(1)
    fn sum_range(&self, left: i32, right: i32) -> i32 {
        self.prefix_sums[right as usize]
            - if left > 0 {
                self.prefix_sums[left as usize - 1]
            } else {
                0
            }
    }
}
