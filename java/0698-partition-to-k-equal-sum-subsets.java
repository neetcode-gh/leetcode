class Solution {
    int target;
  
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for(int n : nums){
            sum += n;
        }
        if(sum%k != 0)
            return false;
        
        target = sum / k;
        boolean[] used = new boolean[nums.length];
        return backtrack(nums, 0, k, 0, used);
    }

    private boolean backtrack(int[] nums, int i, int k, int subsetSum, boolean[] used){
        if(k == 0)
            return true;
        if(subsetSum == target)
            return backtrack(nums, 0, k-1, 0, used);

        for(int j = i; j < nums.length; j++){
            if(j > 0 && !used[j-1] && nums[j] == nums[j-1])
                continue;
            if(used[j] || subsetSum + nums[j] > target)
                continue;
            
            used[j] = true;
            if(backtrack(nums, j+1, k, subsetSum + nums[j], used))
                return true;

            used[j] = false;        
        }
        return false;        
    }
}
