impl Solution {
    fn dfs(candidates: &[i32], target: i32, result: &mut Vec<Vec<i32>>, curr: &mut Vec<i32>) {
        let sum: i32 = curr.iter().sum();
        if sum == target {
            result.push(curr.to_owned());
            return;
        } else if sum > target {
            return;
        }

        for (i, &c) in candidates.iter().enumerate() {
            curr.push(c);
            Self::dfs(&candidates[i..], target, result, curr);
            curr.pop();
        }
    }

    pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let (mut result, mut curr) = (vec![], vec![]);
        Self::dfs(&candidates, target, &mut result, &mut curr);
        
        result
    }
}
