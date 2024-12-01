impl Solution {
    pub fn gcd_of_strings(str1: String, str2: String) -> String {
        let (len1, len2) = (str1.len(), str2.len());

        for l in (1..=usize::min(len1, len2)).rev() {
            if Self::is_divisor(&str1, &str2, len1, len2, l) {
                return str1[..l].to_string();
            }
        }

        "".to_string()
    }

    pub fn is_divisor(str1: &String, str2: &String, len1: usize, len2: usize, l: usize) -> bool {
        if len1 % l != 0 || len2 % l != 0 {
            return false;
        }
        let (f1, f2) = (len1 / l, len2 / l);
        str1[..l].repeat(f1) == *str1 && str1[..l].repeat(f2) == *str2
    }
}