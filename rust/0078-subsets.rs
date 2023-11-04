// Backtracking solution
impl Solution {
    pub fn subsets(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        let mut res = vec![];
        let mut curr = vec![];

        fn backtrack(nums: &Vec<i32>, current: &mut Vec<i32>, result: &mut Vec<Vec<i32>>, index: usize){
           result.push(current.clone()); 
           for i in index..nums.len(){
               current.push(nums[i]);
               backtrack(nums, current, result, i+1);
               current.pop();
           }
        }

        backtrack(&nums, &mut curr, &mut res, 0);
        res
    }
}

// Alternative solution without backtracking
impl Solution {
    pub fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
       let n = nums.len();
       (0..1<<n).map(|bitmask| {
            (0..n).filter_map(|i| match (bitmask >> i)&1 != 0 {
                true => Some(nums[i]),
                false => None
                }).collect()
       }).collect()
    }
}
