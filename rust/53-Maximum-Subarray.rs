impl Solution {
    pub fn max_sub_array(nums: Vec<i32>) -> i32 {
        let mut res = nums[0];
        let mut sum = 0;

        for n in nums {
            if sum < 0 {
                sum = 0;
            }

            sum += n;
            res = res.max(sum);
        }

        res
    }
}
