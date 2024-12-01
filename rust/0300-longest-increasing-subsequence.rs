impl Solution {
    pub fn length_of_lis(nums: Vec<i32>) -> i32 {
        let mut tails = vec![];

    for &num in &nums {
        match tails.binary_search(&num) {
            Ok(_) => {},
            Err(i) => {
                if i == tails.len() {
                    tails.push(num);
                } else {
                    tails[i] = num;
                }
            }
        }
    }
    tails.len() as i32
    }
}