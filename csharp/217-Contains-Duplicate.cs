public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        HashSet<int> numContainer = new HashSet<int>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            if(!numContainer.Contains(nums[i]))
                numContainer.Add(nums[i]);
            else
                return true;
        }
        
        return false;
    }
}