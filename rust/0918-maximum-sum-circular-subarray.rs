impl Solution {
    pub fn max_subarray_sum_circular(nums: Vec<i32>) -> i32 {
        let (mut global_max, mut global_min) = (nums[0], nums[0]);
        let (mut current_max, mut current_min) = (0, 0);
        let mut total = 0;

        for num in nums {
            current_max = i32::max(num, current_max + num);
            current_min = i32::min(num, current_min + num);
            total += num;
            global_max = i32::max(global_max, current_max);
            global_min = i32::min(global_min, current_min);
        }

        if global_max > 0 {
            return i32::max(global_max, total - global_min);
        } else {
            return global_max;
        }
    }
}