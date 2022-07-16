impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let (mut l, mut r) = (0, numbers.len() - 1);
        
        while l < r{
            let sum = numbers[l] + numbers[r];
            
            if sum > target{
                r-=1;
            }else if sum < target{
                l+=1;
            }else{
                return vec![(l + 1) as i32, (r + 1) as i32];
            }
        }
        
        unreachable!()
    }
}