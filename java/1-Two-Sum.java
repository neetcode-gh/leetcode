class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> prevMap = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int diffNum = nums[i];
            int diff = target - nums[i];
            
            if (prevMap.containsKey(diffNum)) {
                return new int[]{prevMap.get(diffNum), i};
            }
            
            prevMap.put(diff, i);
        }
        
        return new int[]{};
    }
}
