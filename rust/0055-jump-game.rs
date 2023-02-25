pub fn can_jump(nums: Vec<i32>) -> bool {
    let mut goal = nums.len() - 1;

    for i in (0..goal).rev() {
        if i + nums[i] as usize >= goal {
            goal = i;
        }
    }

    goal == 0
}
