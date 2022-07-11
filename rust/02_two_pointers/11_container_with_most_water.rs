impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        let (mut l, mut r) = (0, height.len() - 1);
        
        let mut max = 0;
        
        while (l < r){
            let (lh, rh) = (height[l], height[r]);
            let h = lh.min(rh);
            
            let d = (r - l) as i32;
            let area = d * h;
            
            if area > max{
                max = area;
            }
            
            if rh< lh{
                while r > 0 && height[r] <= rh{
                    r-=1;
                }
            }else{
                while l < height.len() && height[l] <= lh{
                    l+=1;
                }
            }
        }
        
        max
    }
}