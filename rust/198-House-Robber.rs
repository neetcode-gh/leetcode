// time complexity: O(n)
// space complexity: O(1)

impl Solution {
    pub fn rob(mut nums: Vec<i32>) -> i32 {
        if nums.len() == 1{
            return nums[0];
        }
        
        nums[1] = nums[0].max(nums[1]);
        
        for i in 2..nums.len(){
            nums[i] = nums[i-1].max(nums[i - 2] + nums[i]);
        }
        
        *nums.last().unwrap()
    }
}