impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        let (mut max_area, mut l, mut r) = (0, 0, height.len() - 1);

        while l < r {
            let area = ((r - l) as i32) * height[l].min(height[r]);
            max_area = area.max(max_area);

            if height[l] > height[r] {
                r -= 1;
            } else {
                l += 1;
            }
        }

        max_area
    }
}
