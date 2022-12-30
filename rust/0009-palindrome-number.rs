impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        let numbers = x.to_string();
        let numbers = numbers.as_bytes();

        let (mut left, mut right) = (0, numbers.len() - 1);

        while left < right {
            if numbers[left] != numbers[right] {
                return false;
            }
            left += 1;
            right -= 1;
        }

        true
    }
}
