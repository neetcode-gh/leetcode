impl Solution {
    pub fn roman_to_int(s: String) -> i32 {
        let s: Vec<char> = s.chars().collect();
        let mut res = 0;

        for i in 0..s.len() {
            if i + 1 < s.len() && Self::get_value(s[i]) < Self::get_value(s[i + 1]) {
                res -= Self::get_value(s[i]);
            } else {
                res += Self::get_value(s[i]);
            }
        }

        res
    }

    pub fn get_value(ch: char) -> i32 {
        match ch {
            'I' => 1,
            'V' => 5,
            'X' => 10,
            'L' => 50,
            'C' => 100,
            'D' => 500,
            'M' => 1000,
            _ => 0,
        }
    }

    pub fn roman_to_int_functional(s: String) -> i32 {
        s.chars().rfold(0, |acc, ch| {
            acc + match ch {
                'I' if acc >= 5 => -1,
                'I' => 1,
                'V' => 5,
                'X' if acc >= 50 => -10,
                'X' => 10,
                'L' => 50,
                'C' if acc >= 500 => -100,
                'C' => 100,
                'D' => 500,
                'M' => 1000,
                _ => 0,
            }
        })
    }
}
