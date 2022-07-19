impl Solution {
    pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        nums.sort_unstable();
        
        let mut res = vec![];
        
        for i in 0..nums.len() - 1{
            let n1 = nums[i];
            
            if i > 0 && n1 == nums[i - 1]{
                continue;
            }
            
            let (mut l, mut r) = (i + 1, nums.len() - 1);
            
            while l < r{
                let n2 = nums[l];
                let n3 = nums[r];
                
                let sum = n1 + n2 + n3;
                
                if sum > 0{
                    r-=1;
                }else if sum < 0{
                     l+=1;
                }else{
                    res.push(vec![n1, n2, n3]);

                    while l < r && n2 == nums[l + 1]{
                        l+=1;
                    }
                    l+=1;
                    
                    while l < r && n3 == nums[r - 1]{
                        r-=1;
                    }
                    r-=1;
                }
            }
        }
        
        res
    }
}