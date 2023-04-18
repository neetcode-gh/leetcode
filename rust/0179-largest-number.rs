use std::cmp::Ordering;

impl Solution {
    pub fn largest_number(nums: Vec<i32>) -> String {
        let mut ans = String::new();
        let mut nums = nums;
        let mut strs = nums.into_iter().map(|e| e.to_string()).collect::<Vec<String>>();
        strs.sort_by(|a, b| {
            let a_first = a.clone() + &*b;
            let b_first = b.clone() + &*a;
            b_first.cmp(&a_first)
        });
        for num in strs {
            if ans == "0" && num == "0" {continue}
            ans.push_str(&*num.to_string())
        }

        ans
    }
}