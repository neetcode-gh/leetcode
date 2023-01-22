use std::cmp::Ordering;

impl Solution {
    pub fn asteroid_collision(asteroids: Vec<i32>) -> Vec<i32> {
        let mut stack: Vec<i32> = vec![];

        for mut asteroid in asteroids {
            while !stack.is_empty() && asteroid < 0 && stack.last() > Some(&0) {
                let diff = asteroid + stack.last().unwrap();
                match diff.cmp(&0) {
                    Ordering::Less => {
                        stack.pop();
                    }
                    Ordering::Greater => asteroid = 0,
                    Ordering::Equal => {
                        asteroid = 0;
                        stack.pop();
                    }
                };
            }
            if asteroid != 0 {
                stack.push(asteroid);
            }
        }
        stack
    }
}