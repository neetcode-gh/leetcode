impl Solution {
    pub fn sorted_squares(nums: Vec<i32>) -> Vec<i32> {
        let mut sq: Vec<i32> = vec![0; nums.len()];
        let mut i = nums.len() as isize - 1;
        let mut l = 0;
        let mut r = nums.len() as isize - 1;
        
        while l <= r {
            if nums[l as usize].abs() > nums[r as usize].abs() {
                sq[i as usize] = nums[l as usize] * nums[l as usize];
                l += 1;
            } else {
                sq[i as usize] = nums[r as usize] * nums[r as usize];
                r -= 1;
            }
            i -= 1;
        }
        
        sq
    }
}

fn abs(x: i32) -> i32 {
    if x < 0 {
        x * -1
    } else {
        x
    }
}