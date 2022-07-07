class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> duplicates = new HashSet<>();
        for(int i = 0; i<nums.length; i++){
            if(duplicates.contains(nums[i])){
                return true;
            }
            duplicates.add(nums[i]);
        }
        return false;
    }
}
