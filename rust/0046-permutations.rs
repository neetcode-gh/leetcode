impl Solution {
    fn backtrack(first: usize, result: &mut Vec<Vec<i32>>, nums: &mut Vec<i32>) {
        if first == nums.len() {
            result.push(nums.to_owned());
            return;
        }

        for i in first..nums.len() {
            nums.swap(first, i);
            Solution::backtrack(first + 1, result, nums);
            nums.swap(first, i);
        }
    }

    pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
        let (mut result, mut nums) = (vec![], nums);
        Self::backtrack(0, &mut result, &mut nums);

        result
    }
}
