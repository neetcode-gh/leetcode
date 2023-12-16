impl Solution {
    pub fn jump(nums: Vec<i32>) -> i32 {
        let mut res = 0;
        let mut l = 0;
        let mut r = 0;

        while r < nums.len() - 1 {
            let mut max_jump = 0;
            for i in l..=r {
                max_jump = max_jump.max(i + nums[i] as usize);
            }

            l = r + 1;
            r = max_jump;
            res += 1;
        }

        return res;
    }
}
