public class Solution {
    public int Search(int[] nums, int target) {
        int low = 0;
        int high = nums.Length - 1;
        
        while(low <= high) {
            var mid = (low + high) / 2;
            
            if(nums[mid] == target) {
                return mid;
            } else if(nums[low] <= nums[mid]) {
                if(target > nums[mid] ||  target < nums[low]) 
                    low = mid + 1;
                else high = mid - 1;
            } else {
                if(target < nums[mid] || target > nums[high]) 
                    high = mid - 1;
                else low = mid + 1;
            }
        }
        
        
        return -1;
    }
}