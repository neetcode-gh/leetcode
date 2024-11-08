/*
 * @lc app=leetcode id=912 lang=rust
 *
 * [912] Sort an Array
 */
struct Solution;
// @lc code=start
impl Solution {
    pub fn sort_array(nums: Vec<i32>) -> Vec<i32> {
        if nums.len() > 1 {
            let (l, r) = nums.split_at(nums.len() / 2);
            let sorted_r = Self::sort_array(r.to_vec());
            let sorted_l = Self::sort_array(l.to_vec());
            
            let mut res: Vec<i32> = nums.into();
            let (mut i, mut j) = (0, 0);

            let mut k = 0;
            while i < sorted_l.len() && j < sorted_r.len() {
                if sorted_l[i] <= sorted_r[j] {
                    res[k] = sorted_l[i].clone();
                    i += 1;
                } else {
                    res[k] = sorted_r[j].clone();
                    j += 1;
                }
                k += 1;
            }
            while i < sorted_l.len() {
                res[k] = sorted_l[i].clone();
                i += 1;
                k += 1
            }
            while j < sorted_r.len() {
                res[k] = sorted_r[j].clone();
                j += 1;
                k += 1;
            }
            res
        } else {
            nums
        }
    }
}
// @lc code=end
fn main() {
    let v = vec![-2,3,-5];
    println!("{:?}", Solution::sort_array(v));
}
