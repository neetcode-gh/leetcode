use std::cmp::Ordering::{Equal, Greater, Less};

impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let (mut l, mut r) = (0, numbers.len() - 1);
        while l < r {
            match (numbers[l] + numbers[r]).cmp(&target) {
                Less => l += 1,
                Greater => r -= 1,
                Equal => return vec![l as i32 + 1, r as i32 + 1],
            }
        }
        unreachable!("Test did not follow the constraints!")
    }
}
