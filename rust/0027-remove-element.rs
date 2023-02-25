impl Solution {
    pub fn remove_element(nums: &mut Vec<i32>, val: i32) -> i32 {
        while let Some(index) = nums.iter().position(|v| *v == val) {
            nums.swap_remove(index);
        }
        nums.len() as i32
    }

    pub fn remove_element_2(nums: &mut Vec<i32>, val: i32) -> i32 {
        let mut k = 0;
        for i in 0..nums.len() {
            if nums[i] != val {
                nums[k] = nums[i];
                k += 1;
            }
        }
        k as i32
    }
}