impl Solution {
    pub fn max_product(s: String) -> i32 {
        let s: Vec<char> = s.chars().collect();
        let mut s1 = vec![];
        let mut s2 = vec![];
        let mut res = 0;

        Solution::dfs(&s, &mut s1, &mut s2, &mut res, 0);

        res
    }

    fn dfs(s: &[char], s1: &mut Vec<char>, s2: &mut Vec<char>, res: &mut i32, index: usize) {
        // Base case
        if index == s.len() {
            if Solution::is_palindrome(s1) && Solution::is_palindrome(s2) {
                let new_max = s1.len() * s2.len();
                *res = std::cmp::max(*res, new_max as i32);
            }
            return;
        }

        // Option 0: Not in S1 nor S2
        Solution::dfs(s, s1, s2, res, index + 1);

        // Option 1: in S1
        s1.push(s[index]);
        Solution::dfs(s, s1, s2, res, index + 1);
        s1.pop();

        // Option 2: in S2
        s2.push(s[index]);
        Solution::dfs(s, s1, s2, res, index + 1);
        s2.pop();
    }

    fn is_palindrome(s: &[char]) -> bool {
        if s.len() <= 1 {
            return true;
        }

        let mut l = 0;
        let mut r = s.len() - 1;

        while l < r {
            if s[l] != s[r] {
                return false;
            }
            l += 1;
            r -= 1;
        }

        true
    }
}