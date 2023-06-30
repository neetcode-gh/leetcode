impl Solution {
    pub fn largest_number(nums: Vec<i32>) -> String {
        let mut v: Vec<String> = nums.iter().map(|&num| num.to_string()).collect();
        v.sort_by(|a: &String, b: &String| (b.clone() + a).cmp(&(a.clone() + b)));
        if v[0] == "0" {
            String::from("0")
        } else {
            v.join("")
        }
    }
}