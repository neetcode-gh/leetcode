class Solution {
    public int minOperations(int[] nums) {
        int length = nums.length;
        Set<Integer> set = new HashSet<>();

        for(int num : nums)
            set.add(num);

        int[] newNums = new int[set.size()];
        int idx = 0;
        for(int num : set)
            newNums[idx++] = num; 

        Arrays.sort(newNums);
        int res = length;
        int r = 0;

        for(int l = 0; l < newNums.length; l++){
            while(r < newNums.length && newNums[r] < newNums[l] + length)
                r += 1;
            int window = r - l;  
            res = Math.min(res, length - window);  
        }
        return res;
    }
}
