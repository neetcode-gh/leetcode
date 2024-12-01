use std::collections::HashMap;

impl Solution {
    fn backtrack(i: usize, curr_str: String, result: &mut Vec<String>, digits: &String, d_c_map: &HashMap<char, &str>) {
        if curr_str.len() == digits.len() {
            result.push(curr_str);
            return;
        }
        
        let letters = d_c_map.get(&digits.chars().nth(i).unwrap()).unwrap().to_string();
        for ch in letters.chars() {
            let mut append_str = curr_str.clone();
            append_str.push(ch);
            Self::backtrack(i + 1, append_str, result, digits, d_c_map);
        }
    }

    pub fn letter_combinations(digits: String) -> Vec<String> {
        let mut result = vec![];
        let d_c_map = HashMap::from([
            ('2', "abc"),
            ('3', "def"),
            ('4', "ghi"),
            ('5', "jkl"),
            ('6', "mno"),
            ('7', "qprs"),
            ('8', "tuv"),
            ('9', "wxyz"),
        ]);

        if !digits.is_empty() {
            Solution::backtrack(0, "".to_string(), &mut result, &digits, &d_c_map);
        }

        result
    }
}
