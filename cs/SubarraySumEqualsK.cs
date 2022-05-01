public class Solution {
    public int SubarraySum(int[] nums, int k) {
        Dictionary<int, int> prefixSums = new Dictionary<int, int>();
        int subarrayCount = 0;
        int currentSum = 0;
        int diff = 0;
        
        for(int i = 0; i < nums.Length; i++) {
            currentSum += nums[i];
            
            if(currentSum == k) {
                subarrayCount++;
            }
            
            diff = currentSum - k;
            
            if(prefixSums.ContainsKey(diff)) {
                subarrayCount += prefixSums[diff];
            }
            
            if(!prefixSums.ContainsKey(currentSum)) {
                prefixSums.Add(currentSum, 0);
            }
            
            prefixSums[currentSum]++;
        }
        
        return subarrayCount;
    }
}
