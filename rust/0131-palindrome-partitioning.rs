impl Solution {
    pub fn partition(s: String) -> Vec<Vec<String>> {
        let mut res: Vec<Vec<String>> = Vec::new();
        let mut part: Vec<String> = Vec::new();

        Self::dfs(&s, &mut res, &mut part, 0);
        res
    }

    pub fn dfs(s: &String, res: &mut Vec<Vec<String>>, part: &mut Vec<String>, i: usize) {
        if i >= s.len() {
            res.push(part.clone());
            return;
        }

        for j in i..s.len() {
            if Self::is_palindrome(s, i, j) {
                let substr: String = s[i..j + 1].to_string();
                part.push(substr);
                Self::dfs(s, res, part, j + 1);
                part.pop();
            }
        }
    }

    pub fn is_palindrome(s: &String, mut left: usize, mut right: usize) -> bool {
        let s = s.as_bytes();
        while left < right {
            if s[left] != s[right] {
                return false;
            }
            left += 1;
            right -= 1;
        }
        return true;
    }
}