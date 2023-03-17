impl Solution {
   pub fn sort_array(nums: Vec<i32>) -> Vec<i32> {
        if nums.len() <= 1 {
            return nums;
        }

        let mid = nums.len() / 2;
        let (left, right) = nums.split_at(mid);

        let left_sorted = Solution::sort_array(left.to_vec());
        let right_sorted = Solution::sort_array(right.to_vec());

        let mut sorted = Vec::with_capacity(nums.len());
        let mut i = 0;
        let mut j = 0;

        while i < left_sorted.len() && j < right_sorted.len() {
            if left_sorted[i] <= right_sorted[j] {
                sorted.push(left_sorted[i]);
                i += 1;
            } else {
                sorted.push(right_sorted[j]);
                j += 1;
            }
        }

        sorted.extend_from_slice(&left_sorted[i..]);
        sorted.extend_from_slice(&right_sorted[j..]);

        sorted
    }
}
