class Solution {
   
    public int[] twoSum(int[] nums, int target) {
        int[] res = new int[2];
	
        Map<Integer, Integer> indexMap = new HashMap<>();

        for(int i = 0; i<nums.length; i++){
            indexMap.put(nums[i],i);
        }

        for(int j = 0; j< nums.length; j++){
            int newTarget = target-nums[j];
            if(indexMap.containsKey(newTarget) && indexMap.get(newTarget)!=j){
                res[0]= j;
                res[1]= indexMap.get(newTarget);

                return res;
            }
        }
	
	    return res;

    }
}
