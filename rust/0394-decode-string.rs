impl Solution {
    pub fn decode_string(s: String) -> String {
        let mut stack = vec![];

        for ch in s.chars() {
            if ch != ']' {
                stack.push(ch.to_string());
            } else {
                let mut substr = String::new();
                while stack.last() != Some(&"[".to_string()) {
                    substr = stack.pop().unwrap().to_string() + &substr;
                }
                stack.pop();

                let mut multiplier = String::new();
                while !stack.is_empty() && stack.last().unwrap().parse::<i32>().is_ok() {
                    multiplier = stack.pop().unwrap().to_string() + &multiplier;
                }

                stack.push(substr.repeat(multiplier.parse::<usize>().unwrap()));
            }
        }
        stack.join("")
    }
}