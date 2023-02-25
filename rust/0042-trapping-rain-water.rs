/**
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        if height.is_empty() {
            return 0;
        }
        let (mut left, mut right) = (0, height.len() - 1);
        let (mut left_max, mut right_max) = (height[left], height[right]);
        let mut result = 0;

        while left < right {
            if left_max < right_max {
                left += 1;
                left_max = left_max.max(height[left]);
                result += left_max - height[left];
            } else {
                right-= 1;
                right_max = right_max.max(height[right]);
                result += right_max - height[right];
            }
        }
        result
    }
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
impl Solution {
    pub fn trap(height: Vec<i32>) -> i32 {
        let mut max_left = vec![];
        let mut max_right = vec![];
        let mut min_left_right = vec![];

        let mut current = 0;
        for (_, val) in height.iter().enumerate() {
            max_left.push(current);
            current = current.max(*val);
        }
        let mut current = 0;
        for (_, val) in height.iter().enumerate().rev() {
            max_right.push(current);
            current = current.max(*val);
        }

        max_right.reverse();

        min_left_right = max_left
            .iter()
            .zip(max_right.iter())
            .map(|x| x.0.min(x.1))
            .collect();

        min_left_right
            .iter()
            .enumerate()
            .map(|x| {
                if *x.1 - height[x.0] > 0 {
                    return *x.1 - height[x.0];
                } else {
                    return 0;
                }
            })
            .sum()
    }
}

