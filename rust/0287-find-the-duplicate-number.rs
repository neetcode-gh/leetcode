impl Solution {
    pub fn find_duplicate(nums: Vec<i32>) -> i32 {
        let (mut slow, mut fast) = (nums[0], nums[nums[0] as usize]);
        while slow != fast {
            slow = nums[slow as usize];
            fast = nums[nums[fast as usize] as usize];
        }
    
        slow = 0;
        while slow != fast {
            slow = nums[slow as usize];
            fast = nums[fast as usize];
        }
    
        slow
    }
}
