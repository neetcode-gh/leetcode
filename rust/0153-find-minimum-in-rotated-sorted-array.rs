impl Solution {
    pub fn find_min(nums: Vec<i32>) -> i32 {
        let length = nums.len();

        match length {
            1 => return nums[0],
            _ => (),
        }

        let (mut l, mut r) = (0, length - 1);

        while l < r {
            let m = (l + r) / 2;

            let left = nums[l];
            let mid = nums[m];
            let right = nums[r];

            if left <= mid && mid <= right {
                return left;
            } else if left >= mid && mid >= right {
                return right;
            } else if left > mid || mid < right {
                r = m;
            } else {
                l = m;
            }
        }
        -1
    }
}
