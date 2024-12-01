impl Solution {
    pub fn remove_duplicates(s: String, k: i32) -> String {
        let mut stack: Vec<(char, usize)> = vec![];
        for ch in s.chars() {
            if !stack.is_empty() && stack.last().unwrap().0 == ch {
                let mut last = stack.pop().unwrap();
                last.1 += 1;
                stack.push(last);
            } else {
                stack.push((ch, 1));
            }
            if stack.last().unwrap().1 == k as usize {
                stack.pop();
            }
        }

        stack.iter().fold(String::new(), |acc, &(ch, count)| {
            acc + &ch.to_string().repeat(count)
        })
    }
}