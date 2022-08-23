class Solution {
    public int longestConsecutive(int[] nums) {
    
        if(nums.length == 0){
            return 0;
        }

        int maxCount = 1;
        //create a set
        Set<Integer> set = new HashSet<>();
        for(int i = 0; i<nums.length; i++){
            set.add(nums[i]);
        }

        for(int i = 0; i< nums.length; i++){
            //1. check for the start of the sequence
            //2. if set doesnt have the left element, means its the start
            if(!set.contains(nums[i]-1)){
                int no = nums[i]+1;
                int count = 1;
                while(set.contains(no)){
                    count ++;
                    no+=1;
                }
                maxCount = Math.max(maxCount, count);
            }
        }
        return maxCount;
    }
}
