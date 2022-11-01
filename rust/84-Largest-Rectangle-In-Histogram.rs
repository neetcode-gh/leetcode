impl Solution {
    pub fn largest_rectangle_area(mut heights: Vec<i32>) -> i32 {
        let mut res: i32 = 0;
        let mut stack: Vec<usize> = Vec::new();
        heights.push(0);
        heights.insert(0, 0);

        for (i, h) in heights.iter().enumerate() {
            while stack.len() > 0 && heights[*stack.iter().last().unwrap()] > *h {
                let j = stack.pop().unwrap();
                let width = (i - stack[stack.len() - 1] - 1) as i32;
                let size = width * heights[j];
                res = res.max(size);
            }
            stack.push(i);
        }

        return res;
    }
}
