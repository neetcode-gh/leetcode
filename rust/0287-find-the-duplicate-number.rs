impl Solution {
    pub fn find_duplicate(nums: Vec<i32>) -> i32 {
       let (mut tortose, mut hoare) = (nums[0], nums[nums[0] as usize]);
       while tortose != hoare {
           tortose = nums[tortose as usize];
           hoare = nums[nums[hoare as usize] as usize];
       }

       tortose = 0;
       while tortose != hoare {
           tortose = nums[tortose as usize];
           hoare = nums[hoare as usize];
       }
       tortose
    }
}
