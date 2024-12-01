impl Solution {
    fn backtrack(mut i: usize, result: &mut Vec<Vec<i32>>, nums: &Vec<i32>, subset: &mut Vec<i32>) {
        if i == nums.len() {
            result.push(subset.to_owned());
            return;
        }

        subset.push(nums[i]);
        Solution::backtrack(i + 1, result, nums, subset);
        subset.pop();

        while i + 1 < nums.len() && nums[i] == nums[i + 1] {
            i += 1;
        }
        Solution::backtrack(i + 1, result, nums, subset);
    }

    pub fn subsets_with_dup(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let (mut nums, mut result) = (nums, vec![]);
        nums.sort();

        Solution::backtrack(0_usize, &mut result, &mut nums, &mut vec![]);
        result
    }
}
