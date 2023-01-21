impl Solution {
    pub fn restore_ip_addresses(s: String) -> Vec<String> {
        let mut res = vec![];

        if s.len() > 12 {
            return res;
        }

        Self::backtrack(&mut res, &s, 0, 0, "".to_string());

        res
    }

    pub fn backtrack(res: &mut Vec<String>, s: &String, i: usize, dots: i32, current_ip: String) {
        if dots == 4 && i == s.len() {
            let new_valid_ip = current_ip.get(..current_ip.len() - 1).unwrap().to_string();
            res.push(new_valid_ip);
            return;
        } else if dots > 4 {
            return;
        }

        for j in i..usize::min(i + 3, s.len()) {
            let mut val = 0;

            if let Some(v) = s.get(i..j + 1) {
                val = v.parse::<u32>().unwrap();
            }

            if val < 256 && (i == j || s.get(i..i + 1).unwrap() != "0") {
                let new_ip = format!("{}{}.", current_ip, val);
                Self::backtrack(res, s, j + 1, dots + 1, new_ip);
            }
        }
    }
}