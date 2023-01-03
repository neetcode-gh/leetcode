impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        if strs.len() == 0 {
            return "".to_string();
        }
        if strs.len() == 1 {
            return strs[0].clone();
        }
        if strs[0].len() == 0 {
            return "".to_string();
        }
        let mut common = String::new();
        let mut same = true;
        let mut i = 0;
        while same {
            let common_char = match strs[0].chars().nth(i) {
                Some(c) => {
                    common.push(c);
                    c
                }
                None => return common,
            };

            for s in &strs {
                if let Some(c) = s.chars().nth(i) {
                    if c != common_char {
                        same = false;
                        break;
                    }
                } else {
                    same = false;
                    break;
                }
            }
            i += 1;
        }
        if common.len() > 0 {
            common[..common.len() - 1].to_string()
        } else {
            common
        }
    }
}
