impl Solution {
    pub fn sort_colors(nums: &mut Vec<i32>) {
        for i in 1..nums.len() {
            let mut j = i;
            while j > 0 && nums[j] < nums[j - 1] {
                nums.swap(j, j - 1);
                j = j - 1;
            }
        }
    }
}

/*
* Solution using counting sort
*/
impl Solution {
    pub fn sort_colors(nums: &mut Vec<i32>) {
        let mut count = [0; 3];
        for num in nums.iter() {
            count[*num as usize] += 1;
        }
        let mut i = 0;
        for (num, c) in count.iter().enumerate() {
            for _ in 0..*c {
                nums[i] = num as i32;
                i += 1;
            }
        }
    }
}
