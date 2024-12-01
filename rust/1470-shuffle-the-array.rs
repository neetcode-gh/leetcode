impl Solution {
    pub fn shuffle(nums: Vec<i32>, n: i32) -> Vec<i32> {
        let mut nums = nums;

        for i in 0..n as usize {
            nums[i] = nums[i] << 10;
            nums[i] = nums[i] | nums[i + n as usize];
        }

        let mut j = 2 * n - 1;

        for i in (0..=n as usize - 1).rev() {
            let y = nums[i] & (2_i32.pow(10) - 1);
            let x = nums[i] >> 10;
            nums[j as usize] = y;
            nums[j as usize - 1] = x;
            j -= 2;
        }

        nums
    }
}
