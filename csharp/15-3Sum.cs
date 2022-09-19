public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        List<IList<int>> res = new List<IList<int>>();
        int left, right;
        Array.Sort(nums);
        
        for(int i = 0; i < nums.Length; i++){
            if(i > 0 && nums[i] == nums[i-1]){
                continue;
            }
            
            left = i+1;
            right = nums.Length-1;
            
            while(left < right){
                if(nums[i] + nums[left] + nums[right] > 0){
                    right--;                    
                }else if(nums[i] + nums[left] + nums[right] < 0){
                    left++;
                }else {
                    res.Add(new List<int> {nums[i], nums[left], nums[right]});
                    left++;
                    while(nums[left] == nums[left-1] && left < right){
                        left++;
                    }
                }
            }
        }
        return res;
    }
}
